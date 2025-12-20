require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - CORS configuration
app.use(cors({
  origin: ['https://portfoliowebsite-xaix.onrender.com', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Handle preflight requests
app.options('*', cors());

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

// SMTP Configuration with more options
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    requireTLS: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false // For development/testing
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
    debug: true,
    logger: true
  });
};

// Test SMTP connection on startup
const testSMTPConnection = async () => {
  const transporter = createTransporter();
  try {
    await transporter.verify();
    console.log('✅ SMTP Connection Verified');
    console.log(`📧 Sender: ${process.env.GMAIL_USER}`);
    return transporter;
  } catch (error) {
    console.error('❌ SMTP Connection Failed:', error.message);
    console.log('📝 Debug Info:');
    console.log('- GMAIL_USER:', process.env.GMAIL_USER ? 'Set' : 'Not Set');
    console.log('- GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not Set');
    console.log('⚠️  Make sure:');
    console.log('1. 2-Step Verification is ENABLED on Google Account');
    console.log('2. App Password is generated for "Mail"');
    console.log('3. Password has no spaces (16 characters)');
    return null;
  }
};

let transporter = null;

// Initialize transporter
testSMTPConnection().then(t => {
  transporter = t;
  if (!transporter) {
    console.log('⚠️  Emails will not work until SMTP is configured correctly');
  }
});

// Contact endpoint
app.post("/api/contact", contactLimiter, async (req, res) => {
  console.log("📨 Contact form submission received");
  console.log("📊 Request body:", {
    name: req.body.name,
    email: req.body.email,
    messageLength: req.body.message?.length
  });

  // Validate required fields
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    console.log("❌ Validation failed - missing fields");
    return res.status(400).json({
      ok: false,
      error: "All fields are required: name, email, message",
      received: {
        name: !!name,
        email: !!email,
        message: !!message
      }
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      ok: false,
      error: "Please enter a valid email address"
    });
  }

  // Check if transporter is ready
  if (!transporter) {
    console.error("❌ SMTP not initialized");
    return res.status(500).json({
      ok: false,
      error: "Email service is temporarily unavailable. Please try again later."
    });
  }

  try {
    const mailOptions = {
      from: {
        name: process.env.CONTACT_FROM_NAME || "Portfolio Contact",
        address: process.env.GMAIL_USER
      },
      to: process.env.CONTACT_TO || process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Contact Form: ${name} (${email})`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f4f4f4; padding: 20px; border-radius: 5px; }
    .content { padding: 20px; background: #fff; border: 1px solid #ddd; border-radius: 5px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .message { white-space: pre-wrap; padding: 15px; background: #f9f9f9; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📨 New Contact Form Submission</h2>
      <p>From your portfolio website</p>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">👤 Name:</span>
        <span>${escapeHtml(name)}</span>
      </div>
      <div class="field">
        <span class="label">📧 Email:</span>
        <span>${escapeHtml(email)}</span>
      </div>
      <div class="field">
        <span class="label">💬 Message:</span>
        <div class="message">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
      </div>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>Sent from portfolio contact form at ${new Date().toLocaleString()}</p>
        <p>Reply to: ${escapeHtml(email)}</p>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    };

    console.log("📤 Attempting to send email...");
    
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ Email sent successfully!");
    console.log("📧 Message ID:", info.messageId);
    console.log("👤 To:", mailOptions.to);
    
    return res.json({
      ok: true,
      message: "Your message has been sent successfully!",
      messageId: info.messageId
    });

  } catch (error) {
    console.error("❌ Email sending failed:", error);
    
    // Detailed error handling
    let errorMessage = "Failed to send email. Please try again.";
    let statusCode = 500;
    
    if (error.code === 'EAUTH') {
      errorMessage = "Email authentication failed. Please check server configuration.";
      console.error("🔐 AUTH ERROR: Check Gmail credentials and App Password");
    } else if (error.code === 'EENVELOPE') {
      errorMessage = "Invalid email address. Please check the email format.";
      statusCode = 400;
    } else if (error.code === 'ECONNECTION') {
      errorMessage = "Connection to email service failed. Please try again later.";
    }
    
    return res.status(statusCode).json({
      ok: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'Contact Form API',
    timestamp: new Date().toISOString(),
    smtp: transporter ? 'Connected' : 'Not Connected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test email endpoint (for debugging)
app.post('/api/test-email', async (req, res) => {
  if (!transporter) {
    return res.status(500).json({
      ok: false,
      error: "SMTP not configured"
    });
  }
  
  try {
    const testMail = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: 'Test Email from Portfolio Server',
      text: 'This is a test email sent at ' + new Date().toISOString()
    };
    
    const info = await transporter.sendMail(testMail);
    res.json({
      ok: true,
      message: 'Test email sent',
      messageId: info.messageId
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
      code: error.code
    });
  }
});

// Catch-all for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 Email User: ${process.env.GMAIL_USER || 'Not set'}`);
  console.log(`🔗 CORS Origin: https://portfoliowebsite-xaix.onrender.com`);
});
