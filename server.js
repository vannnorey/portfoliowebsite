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

// Handle OPTIONS preflight requests for specific routes
app.options('/api/contact', cors(corsOptions));
app.options('/api/health', cors(corsOptions));
app.options('/api/test-email', cors(corsOptions));

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

// Test SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Failed:", error.message);
    console.log("📝 Check your GMAIL_APP_PASSWORD configuration in Render environment variables");
  } else {
    console.log("✅ SMTP Connection Verified");
    console.log("📧 Ready to send emails");
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'Contact Form API',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
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

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Sending to yourself
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `.trim(),
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Message:</strong></p>
  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${message.replace(/\n/g, '<br>')}
  </div>
  <hr style="margin: 20px 0;">
  <p style="color: #666; font-size: 12px;">
    Sent from portfolio contact form at ${new Date().toLocaleString()}
  </p>
</div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    
    return res.json({ 
      ok: true, 
      message: "Message sent successfully!" 
    });
    
  } catch (error) {
    console.error("❌ Email error:", error);
    
    let errorMessage = "Failed to send email";
    if (error.code === 'EAUTH') {
      errorMessage = "Email service configuration error";
    }
    
    return res.status(500).json({ 
      ok: false, 
      error: errorMessage 
    });
  }
});

// SPA fallback - MUST come after API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 CORS enabled for: https://portfoliowebsite-xaix.onrender.com`);
});
