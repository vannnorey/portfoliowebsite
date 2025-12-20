require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

// Debug: Check environment
console.log("=== SERVER STARTING ===");
console.log("PORT:", PORT);
console.log("GMAIL_USER:", process.env.GMAIL_USER || "NOT SET");
console.log("GMAIL_APP_PASSWORD exists?:", !!process.env.GMAIL_APP_PASSWORD);
console.log("GMAIL_APP_PASSWORD length:", process.env.GMAIL_APP_PASSWORD?.length || 0);

// CORS
app.use(cors({
  origin: ['https://portfoliowebsite-xaix.onrender.com', 'http://localhost:3000']
}));

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "build")));

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  }
});

// Verify email connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Email connection error:", error.message);
  } else {
    console.log("✅ Email server ready");
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    ok: true, 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Test email endpoint
app.post("/api/test", async (req, res) => {
  console.log("Test email requested");
  
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: "TEST EMAIL",
      text: "Test sent at " + new Date().toISOString()
    });
    
    console.log("✅ Test email sent!");
    res.json({ success: true, messageId: info.messageId });
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      code: error.code 
    });
  }
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  console.log("Contact form submission");
  
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        ok: false, 
        error: "All fields required" 
      });
    }
    
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    
    console.log("✅ Contact email sent!");
    res.json({ 
      ok: true, 
      message: "Message sent successfully!",
      messageId: info.messageId 
    });
    
  } catch (error) {
    console.error("❌ Contact error:", error.message);
    res.status(500).json({ 
      ok: false, 
      error: "Failed to send email",
      details: error.message 
    });
  }
});

// ========== CRITICAL: FIXED SPA ROUTES ==========
// Handle React Router paths - NO WILDCARD ERRORS

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// About page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Contact page
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Projects page
app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Skills page
app.get("/skills", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Add more routes if your React app has them
app.get("/experience", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Fallback for any other route - BUT NOT USING '*'
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ================================================

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 URL: https://portfoliowebsite-xaix.onrender.com`);
  console.log(`🔗 Health: /api/health`);
  console.log(`📧 Test: POST /api/test`);
  console.log(`📨 Contact: POST /api/contact`);
});
