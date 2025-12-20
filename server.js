require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Debug logs
console.log("🔍 Environment check:");
console.log("GMAIL_USER:", process.env.GMAIL_USER || "NOT SET");
console.log("GMAIL_APP_PASSWORD length:", process.env.GMAIL_APP_PASSWORD?.length || 0);

// CORS
app.use(cors({
  origin: ['https://portfoliowebsite-xaix.onrender.com', 'http://localhost:3000']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    ok: true, 
    message: "Server running",
    emailConfigured: !!process.env.GMAIL_USER
  });
});

// Test email endpoint
app.post("/api/test-email", async (req, res) => {
  console.log("Test email attempt...");
  
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: "TEST EMAIL",
      text: "Test at " + new Date().toISOString()
    });
    
    console.log("✅ Test email sent!");
    res.json({ success: true, messageId: info.messageId });
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    res.json({ 
      success: false, 
      error: error.message,
      code: error.code 
    });
  }
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  console.log("Contact form received");
  
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
      subject: `Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    
    console.log("✅ Contact email sent!");
    res.json({ 
      ok: true, 
      message: "Message sent successfully!" 
    });
    
  } catch (error) {
    console.error("❌ Contact error:", error.message);
    res.status(500).json({ 
      ok: false, 
      error: "Failed to send email" 
    });
  }
});

// ==== CRITICAL FIX: REPLACE ALL SPA ROUTES WITH THIS ====
// DELETE all other app.get('*', ...) or app.get('/*', ...) lines!
// Use ONLY this one:

// Option A: Simple catch-all (try this first)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// OR Option B: If Option A fails, use this instead:
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// 
// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// 
// app.get("/contact", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// 
// app.get("/projects", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// 
// app.get("/skills", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 URL: https://portfoliowebsite-xaix.onrender.com`);
});
