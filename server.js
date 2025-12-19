require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - CORS MUST come first
app.use(cors({
  origin: 'https://portfoliowebsite-xaix.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'], // Add OPTIONS for preflight
  allowedHeaders: ['Content-Type'] // Explicitly allow Content-Type
}));

app.use(express.json());

// Rate limiter for contact form - moved after CORS
const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Increased from 2 to 5 for testing
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Only count failed requests
  message: { ok: false, error: "Too many requests, try again later." },
});

// Handle OPTIONS preflight requests
app.options('/api/contact', cors());

// Nodemailer setup with better error handling
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  debug: true, // Enable debug logging
  logger: true
});

transporter.verify((error, success) => {
  if (error) {
    console.error("[SMTP VERIFY ERROR]:", error.message);
    console.error("[SMTP DETAILS]:", "GMAIL_USER exists?", !!process.env.GMAIL_USER);
  } else {
    console.log("[SMTP READY]: Server can send emails");
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, "build")));

// Contact POST endpoint with better logging
app.post("/api/contact", contactLimiter, async (req, res) => {
  console.log("[API] Contact form submitted:", { 
    name: req.body.name?.substring(0, 10) + '...', 
    email: req.body.email 
  });
  
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      console.log("[API] Validation failed: missing fields");
      return res.status(400).json({ 
        ok: false, 
        error: "Missing required fields",
        received: { name: !!name, email: !!email, message: !!message }
      });
    }

    const html = `
      <h3>New contact form message</h3>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <hr/>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `;

    const mailOptions = {
      from: process.env.CONTACT_FROM || process.env.GMAIL_USER,
      to: process.env.CONTACT_TO || process.env.GMAIL_USER,
      replyTo: email, // Add reply-to for better email handling
      subject: `Contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html,
    };

    console.log("[API] Attempting to send email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("[API] Email sent successfully:", info.messageId);
    
    return res.json({ 
      ok: true, 
      message: "Email sent successfully",
      messageId: info.messageId 
    });
    
  } catch (err) {
    console.error("[API ERROR DETAILS]:", err.message);
    console.error("[API ERROR STACK]:", err.stack);
    
    // Return specific error messages
    let errorMessage = "Failed to send email";
    if (err.code === 'EAUTH') {
      errorMessage = "Email authentication failed. Check Gmail credentials.";
    } else if (err.code === 'EENVELOPE') {
      errorMessage = "Email address error. Please check the email format.";
    }
    
    return res.status(500).json({ 
      ok: false, 
      error: errorMessage,
      code: err.code || 'UNKNOWN'
    });
  }
});

// SPA fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

function escapeHtml(unsafe = "") {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`CORS configured for: https://portfoliowebsite-xaix.onrender.com`);
  console.log(`Environment check - GMAIL_USER: ${process.env.GMAIL_USER ? 'SET' : 'NOT SET'}`);
});