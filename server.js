// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3001;

// near top of server.js (after require statements)
const rateLimit = require("express-rate-limit");

// limit to 6 requests per minute per IP (adjust as you like)
const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many requests, try again later." }, 
});

// apply to contact endpoint only
app.use("/api/contact", contactLimiter);


app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Create nodemailer transporter using Gmail + App Password (uses env vars)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// verify transporter AFTER creation so we get an immediate auth check
transporter.verify(function(error, success) {
  if (error) {
    console.error("[transporter.verify] error:", error);
  } else {
    console.log("[transporter.verify] SMTP ready");
  }
});

// Health check
app.get("/", (req, res) => {
  res.json({ ok: true, msg: "Mail server running" });
});

// Contact POST endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const body = req.body || {};
    console.log("[server] POST /api/contact body:", body);

    const { name, email, message } = body;
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

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

function escapeHtml(unsafe = "") {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.listen(PORT, () => {
  console.log(`Mail server listening on http://localhost:${PORT}`);
});
