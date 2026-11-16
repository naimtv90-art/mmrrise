import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateGoogleCalendarUrl, generateIcsContent } from './bookingService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const EMAIL_LOGS_FILE = path.join(DATA_DIR, 'email-logs.json');

const SITE_OWNER_EMAIL = process.env.SITE_OWNER_EMAIL || 'mmrshohagbd@gmail.com';
const OWNER_NAME = 'Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM';

/**
 * Creates Nodemailer transporter if credentials are provided in env,
 * otherwise returns null for safe simulation & logging.
 */
function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
}

/**
 * Logs sent emails to persistent JSON file for record-keeping.
 */
function logEmail(emailRecord) {
  try {
    let logs = [];
    if (fs.existsSync(EMAIL_LOGS_FILE)) {
      logs = JSON.parse(fs.readFileSync(EMAIL_LOGS_FILE, 'utf-8'));
    }
    logs.unshift(emailRecord);
    // Keep last 100 logs
    if (logs.length > 100) logs = logs.slice(0, 100);
    fs.writeFileSync(EMAIL_LOGS_FILE, JSON.stringify(logs, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write to email-logs.json:', err.message);
  }
}

/**
 * Sends both owner notification and client confirmation for a new booking.
 */
export async function sendBookingEmails(booking, baseUrl = 'http://localhost:3000') {
  const gcalUrl = generateGoogleCalendarUrl(booking);
  const icsDownloadUrl = `${baseUrl}/api/bookings/${booking.id}/calendar.ics`;
  const confirmUrl = `${baseUrl}/api/bookings/confirm/${booking.id}`;

  const transporter = createTransporter();

  // 1. Email to Site Owner (Mukhlesur Rahman)
  const ownerSubject = `🗓️ [New Booking] 20-Min Session: ${booking.clientName} on ${booking.date} (${booking.timeSlot})`;
  const ownerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fb; color: #0a1931; margin: 0; padding: 24px; }
        .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(10, 25, 49, 0.06); }
        .header { background: #0a1931; color: #ffffff; padding: 28px; text-align: center; }
        .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #f4951d; }
        .header p { margin: 0; font-size: 13px; color: #cbd5e1; }
        .body { padding: 28px; }
        .slot-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #f4951d; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
        .slot-time { font-size: 18px; font-weight: 700; color: #1f74b9; }
        .slot-date { font-size: 14px; color: #475569; margin-top: 4px; }
        .details-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
        .details-table td { padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
        .details-table td.label { width: 38%; color: #64748b; font-weight: 600; }
        .details-table td.val { color: #0f172a; font-weight: 500; }
        .actions { margin-top: 28px; text-align: center; }
        .btn-gcal { display: inline-block; background: #1a73e8; color: #ffffff !important; padding: 13px 24px; border-radius: 10px; font-weight: 700; font-size: 13px; text-decoration: none; margin: 6px; box-shadow: 0 2px 6px rgba(26, 115, 232, 0.3); }
        .btn-confirm { display: inline-block; background: #f4951d; color: #060e1c !important; padding: 13px 24px; border-radius: 10px; font-weight: 700; font-size: 13px; text-decoration: none; margin: 6px; }
        .btn-ics { display: inline-block; background: #f1f5f9; color: #334155 !important; padding: 13px 20px; border-radius: 10px; font-weight: 600; font-size: 13px; text-decoration: none; margin: 6px; }
        .footer { padding: 20px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>MMR RISE &bull; NEW BOOKING ALERT</h1>
          <p>A client has scheduled a 20-minute executive consultation.</p>
        </div>
        <div class="body">
          <div class="slot-box">
            <div class="slot-time">⏰ ${booking.timeSlot}</div>
            <div class="slot-date">📅 ${booking.date} (${booking.weekday || 'Saturday - Thursday Working Day'}) &bull; 20-Minute Advisory</div>
          </div>

          <table class="details-table">
            <tr>
              <td class="label">Client Name:</td>
              <td class="val"><strong>${booking.clientName}</strong></td>
            </tr>
            <tr>
              <td class="label">Official Email:</td>
              <td class="val"><a href="mailto:${booking.clientEmail}">${booking.clientEmail}</a></td>
            </tr>
            <tr>
              <td class="label">Phone / WhatsApp:</td>
              <td class="val"><a href="tel:${booking.clientPhone}">${booking.clientPhone}</a></td>
            </tr>
            <tr>
              <td class="label">Organization / Firm:</td>
              <td class="val">${booking.organization || 'Individual'}</td>
            </tr>
            <tr>
              <td class="label">Delivery Modality:</td>
              <td class="val">${booking.mode}</td>
            </tr>
            <tr>
              <td class="label">Agenda / Topic:</td>
              <td class="val">${booking.notes || 'Executive Advisory / General Consultation'}</td>
            </tr>
            <tr>
              <td class="label">Booking Ref ID:</td>
              <td class="val"><code>${booking.id}</code></td>
            </tr>
          </table>

          <div class="actions">
            <a href="${gcalUrl}" target="_blank" class="btn-gcal">
              📅 Add to My Google Calendar
            </a>
            <a href="${confirmUrl}" target="_blank" class="btn-confirm">
              ✔ Confirm & Approve Session
            </a>
            <br>
            <a href="${icsDownloadUrl}" class="btn-ics">
              📥 Download .ICS Calendar Invite
            </a>
          </div>
        </div>
        <div class="footer">
          MMR Rise Platform &bull; Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM &bull; Dhaka, Bangladesh
        </div>
      </div>
    </body>
    </html>
  `;

  // 2. Email to Client
  const clientSubject = `Booking Scheduled: 20-Minute Executive Advisory with Mukhlesur Rahman (${booking.date})`;
  const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fb; color: #0a1931; margin: 0; padding: 24px; }
        .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(10, 25, 49, 0.06); }
        .header { background: #0a1931; color: #ffffff; padding: 28px; text-align: center; }
        .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #f4951d; }
        .header p { margin: 0; font-size: 13px; color: #cbd5e1; }
        .body { padding: 28px; }
        .slot-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #1f74b9; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
        .slot-time { font-size: 18px; font-weight: 700; color: #0a1931; }
        .slot-date { font-size: 14px; color: #475569; margin-top: 4px; }
        .details-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
        .details-table td { padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
        .details-table td.label { width: 38%; color: #64748b; font-weight: 600; }
        .details-table td.val { color: #0f172a; font-weight: 500; }
        .actions { margin-top: 28px; text-align: center; }
        .btn-gcal { display: inline-block; background: #1a73e8; color: #ffffff !important; padding: 13px 24px; border-radius: 10px; font-weight: 700; font-size: 13px; text-decoration: none; margin: 6px; }
        .btn-ics { display: inline-block; background: #f1f5f9; color: #334155 !important; padding: 13px 20px; border-radius: 10px; font-weight: 600; font-size: 13px; text-decoration: none; margin: 6px; }
        .footer { padding: 20px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>MMR RISE &bull; CONSULTATION CONFIRMATION</h1>
          <p>Your 20-minute executive session has been registered.</p>
        </div>
        <div class="body">
          <p style="font-size: 14px; line-height: 1.6; margin-top: 0;">
            Dear <strong>${booking.clientName}</strong>,<br><br>
            Thank you for scheduling a strategic consultation with <strong>${OWNER_NAME}</strong>. We have registered your 20-minute session coordinates below:
          </p>

          <div class="slot-box">
            <div class="slot-time">⏰ ${booking.timeSlot}</div>
            <div class="slot-date">📅 ${booking.date} (${booking.weekday || 'Saturday - Thursday'})</div>
          </div>

          <table class="details-table">
            <tr>
              <td class="label">Host:</td>
              <td class="val"><strong>${OWNER_NAME}</strong></td>
            </tr>
            <tr>
              <td class="label">Delivery Modality:</td>
              <td class="val">${booking.mode}</td>
            </tr>
            <tr>
              <td class="label">Booking Ref ID:</td>
              <td class="val"><code>${booking.id}</code></td>
            </tr>
            <tr>
              <td class="label">Discussion Agenda:</td>
              <td class="val">${booking.notes || 'Executive Advisory'}</td>
            </tr>
          </table>

          <div class="actions">
            <a href="${gcalUrl}" target="_blank" class="btn-gcal">
              📅 Add to Google Calendar
            </a>
            <a href="${icsDownloadUrl}" class="btn-ics">
              📥 Download .ICS Calendar File
            </a>
          </div>

          <p style="font-size: 12px; color: #64748b; margin-top: 24px; line-height: 1.6;">
            A calendar link will be verified before the scheduled time. If you need to make changes or have urgent inquiries, please reply to this email or reach us at <a href="mailto:mmrshohagbd@gmail.com">mmrshohagbd@gmail.com</a>.
          </p>
        </div>
        <div class="footer">
          &copy; 2026 MMR Rise &bull; Organizations grow best when people grow with them. &bull; Dhaka, Bangladesh
        </div>
      </div>
    </body>
    </html>
  `;

  const results = {
    ownerEmailSent: false,
    clientEmailSent: false,
    googleCalendarUrl: gcalUrl,
    icsUrl: icsDownloadUrl,
    simulated: false
  };

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"MMR Rise Platform" <${process.env.SMTP_USER}>`,
        to: SITE_OWNER_EMAIL,
        subject: ownerSubject,
        html: ownerHtml
      });
      results.ownerEmailSent = true;

      await transporter.sendMail({
        from: `"Mukhlesur Rahman (MMR Rise)" <${process.env.SMTP_USER}>`,
        to: booking.clientEmail,
        subject: clientSubject,
        html: clientHtml
      });
      results.clientEmailSent = true;
      console.log(`[Email Service] Sent live booking emails for ${booking.id} to ${SITE_OWNER_EMAIL} and ${booking.clientEmail}`);
    } catch (err) {
      console.error('[Email Service] Error sending live email:', err.message);
      results.simulated = true;
      results.error = err.message;
    }
  } else {
    // Graceful simulation & logging when SMTP credentials are not yet configured in env
    results.simulated = true;
    console.log(`[Email Service] SMTP not configured. Simulated booking email for ${booking.id}:`);
    console.log(` -> Owner Email: ${SITE_OWNER_EMAIL} (Subject: ${ownerSubject})`);
    console.log(` -> Client Email: ${booking.clientEmail} (Subject: ${clientSubject})`);
    console.log(` -> Direct Google Calendar Link: ${gcalUrl}`);
    console.log(` -> 1-Click Owner Confirm Link: ${confirmUrl}`);
  }

  // Record email log
  logEmail({
    bookingId: booking.id,
    timestamp: new Date().toISOString(),
    ownerRecipient: SITE_OWNER_EMAIL,
    clientRecipient: booking.clientEmail,
    ownerSubject,
    clientSubject,
    gcalUrl,
    confirmUrl,
    simulated: results.simulated,
    status: results.simulated ? 'Simulated & Recorded' : 'Dispatched'
  });

  return results;
}
