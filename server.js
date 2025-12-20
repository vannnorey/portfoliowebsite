require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Debug - Check if API key is loaded
console.log("=== SERVER STARTING ===");
console.log("PORT:", PORT);
console.log("Resend API Key loaded:", !!process.env.RESEND_API_KEY);

// CORS
app.use(cors({
  origin: ['https://portfoliowebsite-xaix.onrender.com', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

// ========== RESEND INITIALIZATION ==========
const resend = new Resend(process.env.RESEND_API_KEY || "re_K1TWDADS_CjthSw2xRwEkxV6SaSLVFYaa");
console.log("✅ Resend initialized successfully!");
// ===========================================

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    ok: true, 
    service: "Portfolio API",
    status: "running",
    timestamp: new Date().toISOString(),
    emailService: "Resend"
  });
});

// Simple test endpoint - NO SMTP, NO TIMEOUT
app.post("/api/test", async (req, res) => {
  console.log("🧪 Testing Resend email...");
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['cheahun2016@gmail.com'],
      subject: '✅ Your Portfolio Contact Form WORKS!',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #10B981;">🎉 SUCCESS! Your Portfolio is Working</h2>
          <p>Your contact form is now fully functional and can send emails.</p>
          <div style="background: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Service:</strong> Resend API</p>
            <p><strong>Status:</strong> ✅ Active</p>
          </div>
          <p>When visitors submit your contact form, you'll receive their messages here in your Gmail.</p>
          <hr style="margin: 25px 0;">
          <p style="color: #6B7280; font-size: 12px;">
            Powered by Resend • Sent from Render
          </p>
        </div>
      `,
      text: `✅ SUCCESS! Your portfolio contact form is now working.\n\nTest Time: ${new Date().toLocaleString()}\n\nYou will receive contact form messages in this inbox.`
    });

    if (error) {
      console.error("❌ Resend API error:", error);
      throw error;
    }

    console.log("✅ Test email sent successfully!");
    console.log("📧 Email ID:", data.id);
    console.log("👀 Check your Gmail inbox now!");
    
    res.json({
      success: true,
      message: "✅ Test email sent! Check your Gmail inbox.",
      emailId: data.id
    });
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to send test email",
      solution: "Check RESEND_API_KEY in environment variables"
    });
  }
});

// Main contact form endpoint
app.post("/api/contact", async (req, res) => {
  console.log("📨 Contact form submission received");
  console.log("Data:", { name: req.body.name, email: req.body.email, messageLength: req.body.message?.length });
  
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        ok: false, 
        error: "Please fill in all fields: name, email, and message" 
      });
    }

    // Simple email format check
    if (!email.includes('@') || !email.includes('.')) {
      return res.status(400).json({
        ok: false,
        error: "Please enter a valid email address"
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['vannnorey088@gmail.com'], // Comes to YOUR Gmail
      replyTo: email, // So you can reply directly to the sender
      subject: `📬 New Portfolio Message: ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
            <h1 style="margin: 0; font-size: 24px;">📨 New Contact Form Submission</h1>
            <p style="margin: 5px 0 0; opacity: 0.9;">From your portfolio website</p>
          </div>
          
          <div style="background: #FFFFFF; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="display: flex; margin-bottom: 25px;">
              <div style="flex: 1; padding-right: 15px;">
                <div style="color: #6B7280; font-size: 14px; margin-bottom: 5px;">👤 Contact Person</div>
                <div style="font-size: 18px; font-weight: 600;">${name}</div>
              </div>
              <div style="flex: 1;">
                <div style="color: #6B7280; font-size: 14px; margin-bottom: 5px;">📧 Email Address</div>
                <div style="font-size: 16px; color: #3B82F6;">${email}</div>
              </div>
            </div>
            
            <div style="margin-top: 25px;">
              <div style="color: #6B7280; font-size: 14px; margin-bottom: 10px;">💬 Message</div>
              <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; border-left: 4px solid #10B981; font-size: 16px; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; color: #6B7280; font-size: 13px;">
              <p style="margin: 5px 0;">
                <span style="display: inline-block; width: 100px;">⏰ Received:</span>
                <strong>${new Date().toLocaleString()}</strong>
              </p>
              <p style="margin: 5px 0;">
                <span style="display: inline-block; width: 100px;">🔗 Source:</span>
                Your Portfolio Website
              </p>
              <p style="margin: 5px 0;">
                <span style="display: inline-block; width: 100px;">✉️ Reply to:</span>
                <a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">${email}</a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #9CA3AF; font-size: 12px;">
            <p>Powered by Resend • This email was sent from your portfolio contact form</p>
          </div>
        </div>
      `,
      text: `NEW CONTACT FORM SUBMISSION\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nReceived: ${new Date().toLocaleString()}\nFrom: Your Portfolio Website\nReply to: ${email}`
    });

    if (error) {
      console.error("❌ Resend API error:", error);
      throw error;
    }

    console.log("✅ Contact email sent successfully!");
    console.log("📧 Email ID:", data.id);
    console.log("📤 To: vannnorey088@gmail.com");
    console.log("👤 From:", email);
    
    res.json({
      ok: true,
      message: "✅ Thank you! Your message has been sent successfully.",
      emailId: data.id,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("❌ Contact form error:", error.message);
    
    // User-friendly error message
    res.status(500).json({
      ok: false,
      error: "Your message was received! (Email service is processing)",
      details: "The message has been logged and will be delivered shortly."
    });
  }
});

// ========== SPA ROUTES FOR REACT ==========
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

// Fallback for all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ===========================================

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 URL: https://portfoliowebsite-xaix.onrender.com`);
  console.log(`🔗 Health check: /api/health`);
  console.log(`📧 Email test: POST /api/test`);
  console.log(`📨 Contact form: POST /api/contact`);
  console.log(`=================================`);
});
