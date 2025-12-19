// app/api/contact/route.ts
export const runtime = "nodejs";

import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";


async function jsonResponse(obj: any, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// create transporter once (reads env variables)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function GET(req: Request) {
  return jsonResponse({ ok: true, method: "GET" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    console.log("[api/contact] POST body:", body);

    const { name, email, message } = body ?? {};
    if (!name || !email || !message) {
      return jsonResponse({ ok: false, error: "Missing required fields" }, 400);
    }

    // Build email content
    const html = `
      <h3>New contact form message</h3>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <hr />
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
    console.log("[api/contact] mail sent", info);

    return jsonResponse({ ok: true, info }, 200);
  } catch (err: any) {
    console.error("[api/contact] error:", err);
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

function escapeHtml(unsafe: string) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
