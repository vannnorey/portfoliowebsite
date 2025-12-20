require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// ================== DEBUG: CHECK ENVIRONMENT ==================
console.log("🔍 ============ ENVIRONMENT DEBUG START ============");
console.log("PORT:", PORT);
console.log("NODE_ENV:", process.env.NODE_ENV || "development");
console.log("GMAIL_USER:", process.env.GMAIL_USER || "❌ NOT SET!");
console.log("GMAIL_APP_PASSWORD exists?:", !!process.env.GMAIL_APP_PASSWORD);
console.log("GMAIL_APP_PASSWORD length:", process.env.GMAIL_APP_PASSWORD ? process.env.GMAIL_APP_PASSWORD.length : 0);
console.log("GMAIL_APP_PASSWORD first 3 chars:", process.env.GMAIL_APP_PASSWORD ? process.env.GMAIL_APP_PASSWORD.substring(0, 3) + "..." : "N/A");
console.log("Current directory:", __dirname);
console.log("Has build folder?", require("fs").existsSync(path.join(__dirname, "build")));
console.log("🔍 ============ ENVIRONMENT DEBUG END ============");
// ==============================================================

// CORS setup
app.use(cors({
  origin: ['https://portfoliowebsite-xaix.onrender.com', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Serve static files from build directory
app.use(express.static(path.join(__dirname, "build")));

// ================== NODEMAILER WITH FULL DEBUG ==================
console.log("📧 ============ NODEMAILER SETUP START ============");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  debug: true, // Will show SMTP conversation
  logger: true, // Will log to console
  tls: {
    rejectUnauthorized: false // For development
  }
});

// Verify connection with detailed logging
transporter.verify((error, success) => {
  console.log("📧 ============ SMTP VERIFICATION START ============");
  if (error) {
    console.error("❌ SMTP VERIFICATION FAILED!");
    console.error("Error name:", error.name);
    console.error("Error code:", error.code);
    console.error("Error command:", error.command);
    console.error("Error message:", error.message);
    console.error("Full error:", JSON.stringify(error, null, 2));
    
    // Common error solutions
    if (error.code === 'EAUTH') {
      console.error("🔐 SOLUTION: Check Gmail App Password and 2-Step Verification");
      console.error("1. Go to: https://myaccount.google.com/apppasswords");
      console.error("2. Generate NEW 16-char password for 'Mail'");
      console.error("3. NO SPACES in password!");
    }
  } else {
    console.log("✅ SMTP VERIFICATION SUCCESS!");
    console.log("Ready to send emails from:", process.env.GMAIL_USER);
  }
  console.log("📧 ============ SMTP VERIFICATION END ============");
});
// ===============================================================

// Health check
app.get("/api/health", (req, res) => {
  console.log("🏥 Health check called");
  res.json({
    ok: true,
    service: "Portfolio API",
    status: "running",
    timestamp: new Date().toISOString(),
    emailConfigured: !!process.env.GMAIL_USER && !!process.env.GMAIL_APP_PASSWORD,
    emailUser: process.env.GMAIL_USER || "not set"
  });
});

// Test endpoint - SIMPLE EMAIL
app.post("/api/test-email", async (req, res) => {
  console.log("🧪 ============ TEST EMAIL START ============");
  console.log("Test request received at:", new Date().toISOString());
  
  try {
    // Check credentials first
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("❌ Missing credentials!");
      return res.status(500).json({
        success: false,
        error: "Gmail credentials not configured"
      });
    }
    
    console.log("Attempting to send test email...");
    console.log("From/To:", process.env.GMAIL_USER);
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: "TEST EMAIL from Portfolio",
      text: "This is a test email sent at " + new Date().toISOString(),
      html: "<p>This is a test email</p>"
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ TEST EMAIL SUCCESS!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
    
    res.json({
      success: true,
      message: "Test email sent successfully!",
      messageId: info.messageId,
      response: info.response
    });
    
  } catch (error) {
    console.error("❌ TEST EMAIL FAILED!");
    console.error("Error name:", error.name);
    console.error("Error code:", error.code);
    console.error("Error command:", error.command);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    // Detailed error analysis
    if (error.code === 'EAUTH') {
      console.error("🔐 AUTHENTICATION ERROR DETECTED!");
      console.error("1. Check 2-Step Verification is ENABLED");
      console.error("2. Check App Password is 16 chars, NO SPACES");
      console.error("3. Regenerate password at: https://myaccount.google.com/apppasswords");
    } else if (error.code === 'EENVELOPE') {
      console.error("📧 ENVELOPE ERROR - Check email addresses");
    } else if (error.code === 'ECONNECTION') {
      console.error("🌐 CONNECTION ERROR - Network issue");
    }
    
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code,
      command: error.command,
      solution: error.code === 'EAUTH' ? "Check Gmail App Password and 2-Step Verification" : "Unknown error"
    });
  }
  
  console.log("🧪 ============ TEST EMAIL END ============");
});

// Contact endpoint
app.post("/api/contact", async (req, res) => {
  console.log("📨 ============ CONTACT FORM START ============");
  console.log("Request received at:", new Date().toISOString());
  console.log("Request body:", JSON.stringify(req.body, null, 2));
  
  try {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      console.error("❌ Validation failed - missing fields");
      return res.status(400).json({
        ok: false,
        error: "All fields are required"
      });
    }
    
    console.log("✅ Validation passed");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message length:", message.length);
    
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
        <hr>
        <p><small>Sent from portfolio at ${new Date().toLocaleString()}</small></p>
      `
    };
    
    console.log("📤 Attempting to send email...");
    console.log("Mail options:", JSON.stringify({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    }, null, 2));
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ EMAIL SENT SUCCESSFULLY!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    
    res.json({
      ok: true,
      message: "Message sent successfully!",
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error("❌ CONTACT FORM EMAIL FAILED!");
    console.error("=== ERROR DETAILS ===");
    console.error("Error name:", error.name);
    console.error("Error code:", error.code || "NO CODE");
    console.error("Error command:", error.command || "NO COMMAND");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("=== END ERROR ===");
    
    // User-friendly error
    let userError = "Failed to send email. Please try again.";
    let errorCode = error.code || "UNKNOWN";
    
    if (error.code === 'EAUTH') {
      userError = "Email service configuration error. Please check server settings.";
      console.error("🔐 SOLUTION: Regenerate Gmail App Password (16 chars, no spaces)");
    }
    
    res.status(500).json({
      ok: false,
      error: userError,
      code: errorCode
    });
  }
  
  console.log("📨 ============ CONTACT FORM END ============");
});

// ================== FIX: WORKING SPA ROUTE ==================
// REPLACE LINE 254 WITH THIS (Choose ONE option):

// OPTION 1: Simple route handler (Recommended)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// OPTION 2: Multiple explicit routes (if you have React Router)
app.get(["/", "/about", "/contact", "/projects", "/skills"], (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// OPTION 3: Regex pattern (Advanced)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// OPTION 4: Manual catch-all (Simple fix)
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return next();
  }
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// ============================================================

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ============ SERVER STARTED ============`);
  console.log(`Port: ${PORT}`);
  console.log(`URL: https://portfoliowebsite-xaix.onrender.com`);
  console.log(`Health: /api/health`);
  console.log(`Test Email: POST /api/test-email`);
  console.log(`Contact Form: POST /api/contact`);
  console.log(`=========================================`);
});
