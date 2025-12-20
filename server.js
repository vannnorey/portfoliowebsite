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
console.log("Using SendGrid:", !!process.env.SENDGRID_API_KEY);

// CORS
app.use(cors({
  origin: ['https://portfoliowebsite-xaix.onrender.com', 'http://localhost:3000']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

// ========== SENDGRID TRANSPORTER ==========
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: "apikey",  // LITERALLY the word "apikey"
    pass: process.env.SENDGRID_API_KEY  // Your API key from Render
  },
  connectionTimeout: 10000
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SendGrid Error:", error.message);
    console.error("Error code:", error.code);
    console.error("=== TROUBLESHOOTING ===");
    console.error("1. Check SENDGRID_API_KEY is set in Render");
    console.error("2. Verify sender email in SendGrid dashboard");
    console.error("3. API key: SG.yvBTfG0wQw6QKCjMg-Wj-A...");
  } else {
    console.log("✅ SendGrid Connection Verified!");
    console.log("📧 Ready to send emails!");
  }
});
// ==========================================

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    ok: true, 
    message: "Server is running",
    timestamp: new Date().toISOString(),
    service: "SendGrid"
  });
});

// Test SendGrid endpoint
app.post("/api/test-sendgrid", async (req, res) => {
  console.log("🧪 Testing SendGrid...");
  
  try {
    // Check if API key exists
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY not configured in Render");
    }
    
    const mailOptions = {
      from: '"Portfolio" <vannnorey088@gmail.com>',  // Your verified sender
      to: "vannnorey088@gmail.com",  // Send to yourself
      subject: "✅ SendGrid Test Successful!",
      text: `Test email sent at: ${new Date().toISOString()}\n\nYour portfolio contact form is now working with SendGrid!`,
      html: `
        <h2 style="color: #4CAF50;">✅ SendGrid Test Successful!</h2>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p>Your portfolio contact form is now working correctly with SendGrid!</p>
        <p>Emails will arrive in your Gmail inbox.</p>
        <hr>
        <p><small>Sent from your Render server using SendGrid</small></p>
      `
    };
    
    console.log("Sending test email via SendGrid...");
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ SENDGRID TEST SUCCESS!");
    console.log("Message ID:", info.messageId);
    console.log("Check your Gmail inbox NOW!");
    
    res.json({
      success: true,
      message: "Test email sent! Check your Gmail inbox.",
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error("❌ SendGrid test failed:", error.message);
    console.error("Error code:", error.code);
    
    let solution = "Unknown error";
    if (error.code === 'EAUTH') {
      solution = "Check SENDGRID_API_KEY in Render and sender verification";
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

// Contact form endpoint - WORKING with SendGrid
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
      from: '"Portfolio Contact" <vannnorey088@gmail.com>',  // Your verified sender
      to: "vannnorey088@gmail.com",  // Comes to YOUR Gmail
      replyTo: email,  // So you can reply directly to sender
      subject: `New Contact: ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}

---
Sent from your portfolio website at ${new Date().toLocaleString()}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #333;">📨 New Contact Form Message</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <p><strong>👤 From:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>📝 Message:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 12px;">
              ⏰ Sent: ${new Date().toLocaleString()}<br>
              🔗 From: Your Portfolio Website<br>
              ✉️ Reply to: ${email}
            </p>
          </div>
        </div>
      `
    };
    
    console.log("Sending contact email via SendGrid...");
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ CONTACT EMAIL SENT via SendGrid!");
    console.log("Message ID:", info.messageId);
    
    res.json({
      ok: true,
      message: "Thank you! Your message has been sent.",
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error("❌ SendGrid contact error:", error.message);
    
    let userMessage = "Sorry, we couldn't send your message. Please try again.";
    
    if (error.code === 'EAUTH') {
      userMessage = "Email service issue. Please try again later.";
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
  console.log(`📧 SendGrid Test: POST /api/test-sendgrid`);
  console.log(`📨 Contact form: POST /api/contact`);
});
