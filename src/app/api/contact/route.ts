import { NextRequest, NextResponse } from "next/server";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ValidationError {
  field: string;
  message: string;
}

/* ─────────────────────────────────────────────
   Validation
───────────────────────────────────────────── */
function validate(data: Partial<ContactPayload>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters." });
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address." });
  }
  if (!data.subject || data.subject.trim().length < 4) {
    errors.push({ field: "subject", message: "Subject must be at least 4 characters." });
  }
  if (!data.message || data.message.trim().length < 20) {
    errors.push({ field: "message", message: "Message must be at least 20 characters." });
  }

  return errors;
}

/* ─────────────────────────────────────────────
   Email HTML template
───────────────────────────────────────────── */
function buildEmailHtml(payload: ContactPayload): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background:#050508;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#050508;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:600px;background:#0D0D1A;border-radius:16px;
                      border:1px solid #1A1A2E;overflow:hidden;">

          <!-- Header bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#8B5CF6,#22D3EE);"></td>
          </tr>

          <!-- Logo row -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background:linear-gradient(135deg,#8B5CF6,#6D28D9);
                             border-radius:10px;width:44px;height:44px;text-align:center;
                             vertical-align:middle;">
                    <span style="font-size:20px;color:#fff;font-weight:800;
                                 font-family:'Segoe UI',Arial,sans-serif;line-height:44px;">KP</span>
                  </td>
                  <td style="padding-left:14px;">
                    <div style="font-size:18px;font-weight:700;color:#F0F0FF;">Kusum Pareek</div>
                    <div style="font-size:12px;color:#8888AA;font-family:monospace;">Portfolio Contact Form</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:24px 40px 8px;">
              <h1 style="margin:0;font-size:24px;font-weight:800;color:#F0F0FF;line-height:1.2;">
                New message from your portfolio ✉️
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:#8888AA;">
                Received · ${new Date().toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #1A1A2E;"/></td></tr>

          <!-- Fields -->
          <tr>
            <td style="padding:24px 40px;">
              ${[
                ["👤 From",    payload.name],
                ["📧 Email",   `<a href="mailto:${payload.email}" style="color:#8B5CF6;">${payload.email}</a>`],
                ["📌 Subject", payload.subject],
              ].map(([label, value]) => `
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:16px;">
                  <tr>
                    <td style="font-size:11px;font-weight:600;color:#8888AA;
                               font-family:monospace;letter-spacing:0.1em;
                               text-transform:uppercase;padding-bottom:4px;">${label}</td>
                  </tr>
                  <tr>
                    <td style="font-size:14px;color:#F0F0FF;background:#151528;
                               border:1px solid #1A1A2E;border-radius:8px;
                               padding:10px 14px;">${value}</td>
                  </tr>
                </table>
              `).join("")}

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="font-size:11px;font-weight:600;color:#8888AA;
                             font-family:monospace;letter-spacing:0.1em;
                             text-transform:uppercase;padding-bottom:4px;">💬 Message</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#CCCCDD;line-height:1.75;
                             background:#151528;border:1px solid #1A1A2E;
                             border-radius:8px;padding:14px 16px;
                             white-space:pre-wrap;">${payload.message.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 32px;">
              <a href="mailto:${payload.email}?subject=Re: ${encodeURIComponent(payload.subject)}"
                 style="display:inline-block;background:linear-gradient(135deg,#8B5CF6,#6D28D9);
                        color:#fff;font-size:14px;font-weight:700;text-decoration:none;
                        border-radius:10px;padding:12px 24px;">
                Reply to ${payload.name} →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #1A1A2E;background:#080810;">
              <p style="margin:0;font-size:11px;color:#3A3A58;font-family:monospace;">
                Sent via kusumpareek.dev · portfolio contact form
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ─────────────────────────────────────────────
   Auto-reply HTML for sender
───────────────────────────────────────────── */
function buildAutoReplyHtml(name: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#050508;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#050508;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:600px;background:#0D0D1A;border-radius:16px;
                      border:1px solid #1A1A2E;overflow:hidden;">
          <tr><td style="height:4px;background:linear-gradient(90deg,#8B5CF6,#22D3EE);"></td></tr>
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#F0F0FF;">
                Thanks, ${name}! 🎉
              </h1>
              <p style="margin:0 0 20px;font-size:15px;color:#8888AA;line-height:1.7;">
                I've received your message and will get back to you within <strong style="color:#8B5CF6;">24–48 hours</strong>.
              </p>
              <p style="margin:0 0 28px;font-size:14px;color:#8888AA;line-height:1.7;">
                In the meantime, feel free to explore my work on GitHub or connect with me on LinkedIn.
              </p>
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="https://github.com/KusumPareek99"
                       style="display:inline-block;background:#151528;border:1px solid #1A1A2E;
                              color:#8B5CF6;font-size:13px;font-weight:600;text-decoration:none;
                              border-radius:8px;padding:10px 18px;">GitHub →</a>
                  </td>
                  <td>
                    <a href="https://linkedin.com/in/kusumpareek"
                       style="display:inline-block;background:#151528;border:1px solid #1A1A2E;
                              color:#22D3EE;font-size:13px;font-weight:600;text-decoration:none;
                              border-radius:8px;padding:10px 18px;">LinkedIn →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #1A1A2E;background:#080810;">
              <p style="margin:0;font-size:11px;color:#3A3A58;font-family:monospace;">
                Kusum Pareek · Software Developer · Pune, India
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ─────────────────────────────────────────────
   POST handler
───────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Partial<ContactPayload>;

    // 1. Validate
    const errors = validate(body);
    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    const payload = body as ContactPayload;

    // 2. Send via Resend (only if API key is configured)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL       = process.env.CONTACT_EMAIL || "kusumpareek7620@gmail.com";

    if (RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);

      // Send notification to Kusum
      await resend.emails.send({
        from:    "Portfolio Contact <onboarding@resend.dev>",
        to:      TO_EMAIL,
        subject: `[Portfolio] ${payload.subject} — from ${payload.name}`,
        html:    buildEmailHtml(payload),
        replyTo: payload.email,
      });

      // Send auto-reply to sender
      await resend.emails.send({
        from:    "Kusum Pareek <onboarding@resend.dev>",
        to:      payload.email,
        subject: `Got your message, ${payload.name}! ✉️`,
        html:    buildAutoReplyHtml(payload.name),
      });
    } else {
      // Dev mode: just log
      console.log("[Contact API] Dev mode — no RESEND_API_KEY set");
      console.log("[Contact API] Payload:", JSON.stringify(payload, null, 2));
      // Simulate a small delay
      await new Promise(r => setTimeout(r, 600));
    }

    return NextResponse.json({
      success: true,
      message: "Message sent! I'll reply within 24–48 hours.",
    });

  } catch (err: unknown) {
    console.error("[Contact API] Error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again or email me directly." },
      { status: 500 }
    );
  }
}

/* ─────────────────────────────────────────────
   Rate-limit helper (basic; use Upstash Redis
   for production rate limiting)
───────────────────────────────────────────── */
export const runtime = "nodejs"; // or "edge" if using Resend on edge
export const dynamic = "force-dynamic";