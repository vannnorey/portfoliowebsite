require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiter for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many requests, try again later." },
});

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) console.error("[transporter.verify] error:", error);
  else console.log("[transporter.verify] SMTP ready");
});

// Serve frontend (Vite build) - MUST come before API routes
// IMPORTANT: Your logs show Vite creates "build" folder, not "dist"
app.use(express.static(path.join(__dirname, "build")));

// Contact POST endpoint
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ ok: false, error: "Missing required fields" });

    const html = `
      <h3>New contact form message</h3>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <hr/>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `;

    const mailOptions = {
      from: process.env.CONTACT_FROM || process.env.GMAIL_USER,
      to: process.env.CONTACT_TO || process.env.GMAIL_USER,
      subject: `Contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("[server] mail sent:", info);
    return res.json({ ok: true, info });
  } catch (err) {
    console.error("[server] error sending mail:", err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

// IMPORTANT: FIXED SPA fallback route - Use regex pattern to avoid path-to-regexp error
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Escape HTML to prevent XSS
function escapeHtml(unsafe = "") {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});