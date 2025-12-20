require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiter for contact form
const rateLimit = require("express-rate-limit");
const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Increased for production
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many requests, try again later." },
});

// CORS for production (your Render URL) + localhost for development
app.use(cors({
  origin: ['https://portfoliowebsite-xaix.onrender.com', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, "build")));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  debug: true, // Enable for debugging
  logger: true
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Failed:", error.message);
    console.error("Error details:", error);
  } else {
    console.log("✅ SMTP Ready to send emails");
    console.log("📧 Using Gmail account:", process.env.GMAIL_USER);
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Portfolio API",
    status: "running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Contact POST endpoint with rate limiting
app.post("/api/contact", contactLimiter, async (req, res) => {
  console.log("📨 Contact form submitted at:", new Date().toISOString());
  
  try {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        ok: false,
        error: "Please fill in all fields: name, email, and message"
      });
    }

    // Simple email validation
    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({
        ok: false,
        error: "Please enter a valid email address"
      });
    }

    // Create email
    const html = `
      <h3>New contact form message</h3>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <hr/>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Sends to yourself
      replyTo: email,
      subject: `Portfolio Contact: ${name} (${email})`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html,
    };

    console.log("📤 Attempting to send email...");
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ Email sent successfully! Message ID:", info.messageId);
    
    return res.json({
      ok: true,
      message: "Your message has been sent successfully!",
      messageId: info.messageId
    });
    
  } catch (err) {
    console.error("❌ Email sending error:", err.message);
    console.error("Error code:", err.code);
    
    // User-friendly error messages
    let errorMessage = "Failed to send email. Please try again.";
    
    if (err.code === "EAUTH") {
      errorMessage = "Email service configuration error.";
    } else if (err.code === "EENVELOPE") {
      errorMessage = "Invalid email address format.";
    }
    
    return res.status(500).json({
      ok: false,
      error: errorMessage,
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
});

// SPA fallback - serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Utility function
function escapeHtml(unsafe = "") {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Production URL: https://portfoliowebsite-xaix.onrender.com`);
  console.log(`🔗 Health check: /api/health`);
  console.log(`📧 Contact endpoint: POST /api/contact`);
});
