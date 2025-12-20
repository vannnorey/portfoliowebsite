require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Debug: Check environment with NEW variable names
console.log("=== SERVER STARTING ===");
console.log("PORT:", PORT);
console.log("EMAIL_USER:", process.env.EMAIL_USER || "NOT SET");
console.log("EMAIL_PASS exists?:", !!process.env.EMAIL_PASS);
console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length || 0);

// CORS
app.use(cors({
  origin: ['https://portfoliowebsite-xaix.onrender.com', 'http://localhost:3000']
}));

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "build")));

// Email transporter with NEW variable names
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,      // Changed from GMAIL_USER
    pass: process.env.EMAIL_PASS,      // Changed from GMAIL_APP_PASSWORD
  },
  connectionTimeout: 10000,  // 10 seconds
  socketTimeout: 10000,      // 10 seconds
  greetingTimeout: 10000,    // 10 seconds
  tls: {
    rejectUnauthorized: false
  }
});

// Verify email connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email connection error:", error.message);
    console.error("Error code:", error.code);
  } else {
    console.log("✅ Email server ready");
    console.log("📧 Using:", process.env.EMAIL_USER);
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    ok: true, 
    message: "Server is running",
    timestamp: new Date().toISOString(),
    emailConfigured: !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS
  });
});

// Debug endpoint to check Gmail connection
app.post("/api/debug", async (req, res) => {
  console.log("🔧 Debug endpoint called");
  
  // Check credentials with NEW names
  console.log("Credentials check:");
  console.log("- EMAIL_USER:", process.env.EMAIL_USER || "NOT SET");
  console.log("- EMAIL_PASS length:", process.env.EMAIL_PASS?.length || 0);
  
  try {
    // Test SMTP connection
    console.log("Testing SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection successful!");
    
    // Try to send a simple email
    console.log("Attempting to send email...");
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,    // Changed
      to: process.env.EMAIL_USER,      // Changed
      subject: "DEBUG TEST",
      text: "Test at " + new Date().toISOString()
    });
    
    console.log("✅ Email sent! Message ID:", info.messageId);
    res.json({ 
      success: true, 
      message: "Email sent successfully!",
      messageId: info.messageId 
    });
    
  } catch (error) {
    console.error("❌ Debug error:");
    console.error("- Code:", error.code);
    console.error("- Message:", error.message);
    console.error("- Command:", error.command);
    
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code,
      solution: "Check Gmail App Password and 2-Step Verification"
    });
  }
});

// Test email endpoint
app.post("/api/test", async (req, res) => {
  console.log("Test email requested");
  
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,    // Changed
      to: process.env.EMAIL_USER,      // Changed
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
      from: process.env.EMAIL_USER,    // Changed
      to: process.env.EMAIL_USER,      // Changed
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
    console.error("Error code:", error.code);
    
    res.status(500).json({ 
      ok: false, 
      error: "Failed to send email",
      details: error.message 
    });
  }
});

// ========== FIXED SPA ROUTES ==========
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

// Add more routes if needed
app.get("/experience", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Fallback for any other route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// =======================================

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 URL: https://portfoliowebsite-xaix.onrender.com`);
  console.log(`🔗 Health: /api/health`);
  console.log(`📧 Debug: POST /api/debug`);
  console.log(`📨 Contact: POST /api/contact`);
});
