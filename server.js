require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Debug
console.log("=== SERVER STARTING ===");
console.log("PORT:", PORT);
console.log("EMAIL_USER:", process.env.EMAIL_USER || "NOT SET");
console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length || 0);

// CORS
app.use(cors({
  origin: ['https://portfoliowebsite-xaix.onrender.com', 'http://localhost:3000']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

// ========== FIXED GMAIL TRANSPORTER ==========
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,  // CHANGED: Use port 465 instead of 587
  secure: true,  // CHANGED: true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Critical timeout settings
  connectionTimeout: 30000,  // 30 seconds
  socketTimeout: 30000,
  greetingTimeout: 30000,
  // Enable debug
  debug: true,
  logger: true,
  // TLS settings
  tls: {
    rejectUnauthorized: false
  }
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Error:", error.message);
    console.error("Error code:", error.code);
    console.error("=== TROUBLESHOOTING ===");
    console.error("1. Check EMAIL_PASS is 16 chars, NO SPACES");
    console.error("2. Enable 2-Step Verification on Google");
    console.error("3. Regenerate App Password at: https://myaccount.google.com/apppasswords");
  } else {
    console.log("✅ SMTP Connection Verified!");
    console.log("📧 Ready to send emails from:", process.env.EMAIL_USER);
  }
});
// =============================================

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    ok: true, 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Test endpoint - Simple
app.post("/api/test-gmail", async (req, res) => {
  console.log("🧪 Testing Gmail...");
  
  try {
    // Check if credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials not configured");
    }
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: "✅ Gmail Test Successful!",
      text: `Test email sent at: ${new Date().toISOString()}\n\nYour portfolio contact form is now working!`,
      html: `
        <h2>✅ Gmail Test Successful!</h2>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p>Your portfolio contact form is now working correctly!</p>
        <hr>
        <p><small>Sent from your Render server</small></p>
      `
    };
    
    console.log("Sending test email...");
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ GMAIL TEST SUCCESS!");
    console.log("Message ID:", info.messageId);
    
    res.json({
      success: true,
      message: "Test email sent! Check your Gmail inbox.",
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error("❌ Gmail test failed:", error.message);
    console.error("Error code:", error.code);
    
    let solution = "Unknown error";
    if (error.code === 'EAUTH') {
      solution = "Wrong password. Regenerate App Password.";
    } else if (error.code === 'ETIMEDOUT') {
      solution = "Network timeout. Try again in 1 minute.";
    }
    
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code,
      solution: solution
    });
  }
});

// Contact form endpoint - WORKING
app.post("/api/contact", async (req, res) => {
  console.log("📨 Contact form received");
  
  try {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        ok: false, 
        error: "Please fill in all fields" 
      });
    }
    
    // Email validation
    if (!email.includes('@') || !email.includes('.')) {
      return res.status(400).json({
        ok: false,
        error: "Please enter a valid email address"
      });
    }
    
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email, // So you can reply directly to sender
      subject: `New Contact: ${name} (${email})`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
---
Sent from your portfolio website at ${new Date().toLocaleString()}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #333;">📨 New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>💬 Message:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #4CAF50;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Sent from your portfolio website at ${new Date().toLocaleString()}<br>
            Reply to: ${email}
          </p>
        </div>
      `
    };
    
    console.log("Sending contact email...");
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ CONTACT EMAIL SENT!");
    console.log("Message ID:", info.messageId);
    
    res.json({
      ok: true,
      message: "Thank you! Your message has been sent.",
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error("❌ Contact email failed:", error.message);
    
    let userMessage = "Sorry, we couldn't send your message. Please try again.";
    
    if (error.code === 'EAUTH') {
      userMessage = "Email service issue. Please contact me directly at vannnorey088@gmail.com";
    }
    
    res.status(500).json({
      ok: false,
      error: userMessage
    });
  }
});

// SPA Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/skills", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/experience", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 URL: https://portfoliowebsite-xaix.onrender.com`);
  console.log(`📧 Test Gmail: POST /api/test-gmail`);
  console.log(`📨 Contact form: POST /api/contact`);
});
