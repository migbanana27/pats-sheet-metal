import nodemailer, { type Transporter } from "nodemailer";
import fs from "fs";
import path from "path";
import { SHOP } from "@/lib/site-data";
import {
  quoteEmailHtml,
  quoteEmailText,
  quoteEmailSubject,
  type QuoteEmailData,
} from "@/lib/email-template";

const EMAILS_DIR = path.join(process.cwd(), "download", "quote-emails");

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
}

let cachedTransport: Transporter | null = null;

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  // Need at least host + user + pass to send.
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT) || 587;
  const secure =
    (process.env.SMTP_SECURE ?? "").toLowerCase() === "true" || port === 465;
  const from = process.env.SMTP_FROM?.trim() || user;
  const to = process.env.MAIL_TO?.trim() || SHOP.email;
  return { host, port, secure, user, pass, from, to };
}

function getTransport(): Transporter | null {
  const cfg = getSmtpConfig();
  if (!cfg) return null;
  if (!cachedTransport) {
    cachedTransport = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: { user: cfg.user, pass: cfg.pass },
    });
  }
  return cachedTransport;
}

export interface SendResult {
  sent: boolean;
  reason?: "not-configured" | "send-failed";
  error?: string;
  auditPath?: string;
  recipient?: string;
}

/**
 * Send a nicely-structured quote email to the shop owner.
 *
 * Behavior:
 *  - Always writes a local HTML audit copy to /download/quote-emails/ (so
 *    there's a record even if SMTP isn't configured yet).
 *  - If SMTP env vars are set, sends via nodemailer; reply-to is the customer's
 *    email so the owner can hit "reply" to respond directly.
 *  - NEVER throws — failures are returned in the result so the quote
 *    submission itself always succeeds (the DB record is the source of truth).
 */
export async function sendQuoteEmail(q: QuoteEmailData): Promise<SendResult> {
  const html = quoteEmailHtml(q);
  const text = quoteEmailText(q);
  const subject = quoteEmailSubject(q);

  // 1. Always write a local audit copy.
  let auditPath: string | undefined;
  try {
    fs.mkdirSync(EMAILS_DIR, { recursive: true });
    const safeStamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-");
    auditPath = path.join(EMAILS_DIR, `${safeStamp}-${q.id}.html`);
    fs.writeFileSync(auditPath, html);
  } catch (e) {
    console.error("[email] failed to write audit copy:", e);
  }

  // 2. Try to send via SMTP.
  const cfg = getSmtpConfig();
  if (!cfg) {
    console.warn(
      "[email] SMTP not configured (SMTP_HOST/SMTP_USER/SMTP_PASS missing). " +
        "Quote saved to DB + audit copy written to " +
        (auditPath ?? "(failed)") +
        ". Set SMTP env vars to enable email delivery.",
    );
    return {
      sent: false,
      reason: "not-configured",
      auditPath,
    };
  }

  const transport = getTransport();
  if (!transport) {
    return { sent: false, reason: "send-failed", error: "no transport", auditPath };
  }

  try {
    await transport.sendMail({
      from: `Pat's Sheet Metal Website <${cfg.from}>`,
      to: cfg.to,
      replyTo: `${q.name} <${q.email}>`,
      subject,
      text,
      html,
      // Attach the blueprint if one was uploaded.
      attachments: q.fileName
        ? [
            {
              filename: q.fileName,
              path: path.join(
                process.cwd(),
                "download",
                "quotes",
                q.fileName,
              ),
            },
          ]
        : [],
    });
    console.log(
      `[email] quote email sent to ${cfg.to} for ${q.name} (${q.projectType})`,
    );
    return { sent: true, recipient: cfg.to, auditPath };
  } catch (e) {
    console.error("[email] send failed:", e);
    return {
      sent: false,
      reason: "send-failed",
      error: e instanceof Error ? e.message : String(e),
      auditPath,
    };
  }
}
