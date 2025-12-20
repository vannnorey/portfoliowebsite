require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup
app.use(cors({
  origin: ['https://portfoliowebsite-xaix.onrender.com', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

// Serve static files from build directory
app.use(express.static(path.join(__dirname, "build")));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  debug: true,
  logger: true
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Failed:", error.message);
  } else {
    console.log("✅ SMTP Ready");
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Portfolio API",
    status: "running",
    timestamp: new Date().toISOString()
  });
});

// Contact endpoint
app.post("/api/contact", async (req, res) => {
  console.log("📨 Contact form received");
  
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        ok: false,
        error: "All fields are required"
      });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New Contact</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    
    res.json({
      ok: true,
      message: "Message sent successfully!"
    });
    
  } catch (error) {
    console.error("❌ Email error:", error.message);
    res.status(500).json({
      ok: false,
      error: "Failed to send email"
    });
  }
});

// === FIX: Use a REGEX pattern instead of '/*' ===
// This is the working solution
app.get(/^((?!api).)*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// OR use this alternative (also works):
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 URL: https://portfoliowebsite-xaix.onrender.com`);
});
