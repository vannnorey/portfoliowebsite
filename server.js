require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - CORS configuration
const corsOptions = {
  origin: ['https://portfoliowebsite-xaix.onrender.com', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Handle OPTIONS preflight requests
app.options('/api/contact', cors(corsOptions));
app.options('/api/health', cors(corsOptions));

// Rate limiter
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { 
    ok: false, 
    error: "Too many requests, please try again later." 
  },
});

// Serve static files from build directory
app.use(express.static(path.join(__dirname, "build")));

// SMTP Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  debug: true,
  logger: true
});

// Test SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Failed:", error.message);
  } else {
    console.log("✅ SMTP Connection Verified");
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'Contact Form API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Contact POST endpoint
app.post("/api/contact", contactLimiter, async (req, res) => {
  console.log("📨 Contact form submitted");
  
  try {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        ok: false, 
        error: "All fields are required" 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        error: "Please enter a valid email address"
      });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    
    return res.json({ 
      ok: true, 
      message: "Message sent successfully!" 
    });
    
  } catch (error) {
    console.error("❌ Email error:", error.message);
    
    let errorMessage = "Failed to send email. Please try again.";
    if (error.code === 'EAUTH') {
      errorMessage = "Email service configuration error. Please check server settings.";
    }
    
    return res.status(500).json({ 
      ok: false, 
      error: errorMessage 
    });
  }
});

// IMPORTANT: SPA fallback - This must be the LAST route
// Use regex pattern instead of '*'
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 CORS enabled for: https://portfoliowebsite-xaix.onrender.com`);
  console.log(`📧 Email user: ${process.env.GMAIL_USER || 'Not set'}`);
});
