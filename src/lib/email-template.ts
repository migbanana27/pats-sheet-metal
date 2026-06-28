// Nicely-structured HTML + plain-text email templates for quote requests.
// Sent to the shop owner so they can quickly read & act on each lead.

import { SHOP } from "@/lib/site-data";

export interface QuoteEmailData {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectType: string;
  need: string | null;
  details: string;
  fileName: string | null;
  submittedAt: Date;
}

const SERVICE_LABELS: Record<string, string> = {
  HVAC: "HVAC & Ductwork",
  "Custom Fab": "Custom Fabrication",
  Architectural: "Architectural Metal",
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fmtDate(d: Date): string {
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
  });
}

/** Branded, easy-to-scan HTML email for the shop owner. Inline styles for
 *  email-client compatibility. */
export function quoteEmailHtml(q: QuoteEmailData): string {
  const serviceLabel = SERVICE_LABELS[q.projectType] ?? q.projectType;
  const replyUrl = `mailto:${encodeURIComponent(q.email)}?subject=${encodeURIComponent(
    `Re: Your ${serviceLabel} quote request — Pat's Sheet Metal`,
  )}`;

  const row = (label: string, value: string, opts?: { strong?: boolean }) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee;width:170px;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.04em;">
        ${esc(label)}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #eee;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#333;line-height:1.5;">
        ${opts?.strong ? `<strong>${esc(value)}</strong>` : esc(value)}
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e0e0e0;">

        <!-- Brand header -->
        <tr>
          <td style="background:#000000;padding:24px 28px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;">
                  <span style="display:inline-block;background:#FF5E00;color:#000000;font-family:Arial,Helvetica,sans-serif;font-weight:bold;font-size:13px;padding:4px 10px;letter-spacing:0.08em;">PAT'S</span>
                  <span style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;color:#ffffff;letter-spacing:0.04em;margin-left:8px;">SHEET METAL</span>
                </td>
                <td align="right" style="vertical-align:middle;">
                  <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;color:#FF5E00;text-transform:uppercase;letter-spacing:0.18em;">New Quote Request</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Orange accent bar -->
        <tr><td style="background:#FF5E00;height:4px;line-height:4px;font-size:4px;">&nbsp;</td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px;">
            <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:#000000;">
              New quote request just came in
            </p>
            <p style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#666;">
              Submitted ${esc(fmtDate(q.submittedAt))} · Reference #${esc(q.id.slice(-8).toUpperCase())}
            </p>

            <!-- Quick reply CTA -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="background:#000000;border:1px solid #FF5E00;padding:14px 18px;">
                  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;color:#FF5E00;text-transform:uppercase;letter-spacing:0.14em;">Reply to customer</p>
                  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;">
                    <a href="${esc(replyUrl)}" style="color:#ffffff;text-decoration:none;font-weight:bold;">${esc(q.email)}</a>
                    <span style="color:#999;font-size:13px;"> &nbsp;·&nbsp; ${esc(q.phone)}</span>
                  </p>
                </td>
              </tr>
            </table>

            <!-- Details table -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${row("Customer", q.name, { strong: true })}
              ${row("Phone", q.phone)}
              ${row("Email", q.email)}
              ${row("Service", serviceLabel, { strong: true })}
              ${row("What They Need", q.need || "—")}
              ${row("Project Details", q.details)}
              ${row(
                "Blueprint",
                q.fileName ? `Attached: ${q.fileName}` : "None attached",
              )}
            </table>

            ${
              q.fileName
                ? `<p style="margin:18px 0 0;padding:12px 14px;background:#fff7f0;border-left:3px solid #FF5E00;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#7a3a00;line-height:1.5;">
                     A copy of the blueprint file was saved to the server with this request. Check the quote record (ref #${esc(
                       q.id.slice(-8).toUpperCase(),
                     )}) to access it.
                  </p>`
                : ""
            }
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a1a1a;padding:20px 28px;">
            <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#999;">
              <strong style="color:#FF5E00;">Pat's Sheet Metal</strong> · Forged in Austin. Built to Outlast.
            </p>
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666;line-height:1.5;">
              ${esc(SHOP.address)} · ${esc(SHOP.phone)} · ${esc(SHOP.hours)}<br>
              This is an automated message — a customer just submitted the quote form on your website.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Plain-text fallback for email clients that don't render HTML. */
export function quoteEmailText(q: QuoteEmailData): string {
  const serviceLabel = SERVICE_LABELS[q.projectType] ?? q.projectType;
  return `PAT'S SHEET METAL — NEW QUOTE REQUEST
========================================

A new quote request was just submitted on your website.

Reference: #${q.id.slice(-8).toUpperCase()}
Submitted: ${fmtDate(q.submittedAt)}

CUSTOMER
  Name:    ${q.name}
  Phone:   ${q.phone}
  Email:   ${q.email}

SERVICE: ${serviceLabel}

WHAT THEY NEED:
  ${q.need || "—"}

PROJECT DETAILS:
  ${q.details}

BLUEPRINT:
  ${q.fileName ? `Attached: ${q.fileName}` : "None attached"}

----------------------------------------
Reply directly: ${q.email}
Shop: ${SHOP.phone} · ${SHOP.hours}
${SHOP.address}

This is an automated message — a customer just submitted the quote form on your website.
Pat's Sheet Metal · Forged in Austin. Built to Outlast.
`;
}

/** Subject line for the email. */
export function quoteEmailSubject(q: QuoteEmailData): string {
  const serviceLabel = SERVICE_LABELS[q.projectType] ?? q.projectType;
  return `New Quote: ${serviceLabel} — ${q.name}`;
}
