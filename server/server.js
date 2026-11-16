import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getSlotsForDate,
  generateGoogleCalendarUrl,
  generateIcsContent,
  isFriday,
  getWeekdayName,
  TIME_SLOTS_20MIN
} from './bookingService.js';
import { sendBookingEmails, sendContactNotification } from './emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

// Automatically load .env if available
try {
  const rootEnv = path.resolve(__dirname, '..', '.env');
  if (fs.existsSync(rootEnv)) {
    process.loadEnvFile(rootEnv);
  } else if (fs.existsSync(path.resolve(__dirname, '.env'))) {
    process.loadEnvFile(path.resolve(__dirname, '.env'));
  }
} catch (e) {
  // Ignore if no .env
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Helper to read JSON file safely
const readJson = (filename) => {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
};

// Helper to write JSON file safely (handles serverless read-only filesystems gracefully)
const writeJson = (filename, data) => {
  try {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn(`Write to ${filename} skipped on read-only serverless filesystem:`, err.message);
  }
};

// 1. Health check & Root
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'MMR Rise API', timestamp: new Date().toISOString() });
});

// 2. Profile & About MMR
app.get('/api/profile', (req, res) => {
  const profile = readJson('profile.json');
  res.json(profile);
});

// 3. Consulting Services
app.get('/api/services', (req, res) => {
  const services = readJson('services.json');
  res.json(services);
});

app.get('/api/services/:id', (req, res) => {
  const services = readJson('services.json');
  const service = services.find(s => s.id === req.params.id);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  res.json(service);
});

// 4. Courses (Online & Offline)
app.get('/api/courses', (req, res) => {
  const courses = readJson('courses.json');
  res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const courses = readJson('courses.json');
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

app.post('/api/courses/enroll', (req, res) => {
  const { courseId, studentName, email, phone, organization, preferredFormat, notes } = req.body;
  if (!courseId || !studentName || !email || !phone) {
    return res.status(400).json({ error: 'Missing required enrollment details (courseId, studentName, email, phone)' });
  }

  const courses = readJson('courses.json');
  const course = courses.find(c => c.id === courseId);
  if (!course) return res.status(404).json({ error: 'Course not found' });

  const enrollmentsFile = 'enrollments.json';
  const enrollments = readJson(enrollmentsFile) || [];
  const newEnrollment = {
    id: `ENR-${Date.now()}`,
    courseId,
    courseTitle: course.title,
    studentName,
    email,
    phone,
    organization: organization || 'Individual',
    preferredFormat: preferredFormat || course.deliveryMode,
    amount: course.price,
    currency: course.currency,
    status: 'Pending Confirmation',
    createdAt: new Date().toISOString()
  };

  enrollments.push(newEnrollment);
  writeJson(enrollmentsFile, enrollments);

  res.status(201).json({
    message: 'Enrollment request received successfully! Our team will contact you with batch details and payment verification.',
    enrollment: newEnrollment
  });
});

// 5. Booking Slots & 20-Minute Executive Advisory Scheduling
// GET slots for a specific date (Saturday - Thursday, 9 AM - 9 PM BST)
app.get('/api/bookings/slots', (req, res) => {
  let dateStr = req.query.date;
  if (!dateStr) {
    // Default to today or next Saturday if today is Friday
    const now = new Date();
    // Offset for Bangladesh Standard Time (UTC+6)
    const bstTime = new Date(now.getTime() + (6 * 60 + now.getTimezoneOffset()) * 60000);
    dateStr = bstTime.toISOString().split('T')[0];
  }

  const bookings = readJson('bookings.json') || [];
  const result = getSlotsForDate(dateStr, bookings);
  res.json(result);
});

// Legacy / Convenience endpoint with package list
app.get('/api/bookings/available-slots', (req, res) => {
  const dateStr = req.query.date || new Date().toISOString().split('T')[0];
  const bookings = readJson('bookings.json') || [];
  const slotData = getSlotsForDate(dateStr, bookings);

  const packages = [
    {
      id: 'pkg-20min-advisory',
      name: '20-Minute Strategic Consultation',
      duration: '20 Minutes',
      price: 5000,
      currency: 'BDT',
      badge: '20-Min Slot',
      description: 'Focused, high-impact 1-on-1 strategic session with Mukhlesur Rahman on leadership decisions, PMO bottlenecks, or corporate challenges.'
    },
    {
      id: 'pkg-discovery',
      name: 'Discovery Conversation',
      duration: '45 - 60 Minutes',
      price: 8000,
      currency: 'BDT',
      badge: 'Step 01: Discovery',
      description: 'Comprehensive initial conversation to understand the leader, team dynamics, and business context, then agree on scope, outcomes, and measures of success.'
    },
    {
      id: 'pkg-executive',
      name: '1-on-1 Executive Coaching Session',
      duration: '60 - 90 Minutes',
      price: 15000,
      currency: 'BDT',
      badge: 'ICF Executive Coaching',
      description: 'Confidential 1:1 structured engagement with Mukhlesur Rahman on leadership presence, decision-making, stakeholder influence, and leading the leadership team.'
    }
  ];

  res.json({
    date: slotData.date,
    weekday: slotData.weekday,
    isFriday: slotData.isFriday,
    slots: slotData.slots,
    packages
  });
});

app.post('/api/bookings', async (req, res) => {
  const {
    packageId,
    packageName,
    clientName,
    clientEmail,
    clientPhone,
    organization,
    date,
    timeSlot,
    mode,
    paymentMethod,
    notes,
    topicOfInterest,
    fee
  } = req.body;

  if (!clientName || !clientEmail || !clientPhone || !date || !timeSlot) {
    return res.status(400).json({ error: 'Missing mandatory booking fields (clientName, clientEmail, clientPhone, date, timeSlot)' });
  }

  // 1. Strict Day Rule: Saturday to Thursday only. Friday is NOT available.
  if (isFriday(date)) {
    return res.status(400).json({
      error: 'Fridays are non-working days. MMR Rise advisory operates Saturday through Thursday from 9:00 AM to 9:00 PM.'
    });
  }

  const bookings = readJson('bookings.json') || [];

  // 2. Prevent Double Booking
  const conflict = bookings.find(b => b.date === date && b.timeSlot === timeSlot && b.status !== 'Cancelled');
  if (conflict) {
    return res.status(409).json({
      error: `The ${timeSlot} slot on ${date} (${getWeekdayName(date)}) has already been booked. Please select another slot.`
    });
  }

  const newBooking = {
    id: `BK-${Date.now()}`,
    packageId: packageId || 'pkg-20min-advisory',
    packageName: packageName || '20-Minute Strategic Consultation',
    clientName: clientName.trim(),
    clientEmail: clientEmail.trim(),
    clientPhone: clientPhone.trim(),
    organization: organization ? organization.trim() : 'Individual / Confidential',
    date,
    weekday: getWeekdayName(date),
    timeSlot,
    duration: '20 Minutes',
    mode: mode || 'Virtual (Google Meet / Zoom)',
    fee: fee || 5000,
    currency: 'BDT',
    paymentMethod: paymentMethod || 'bKash Merchant Pay',
    paymentStatus: 'Pending Verification',
    status: 'Confirmed', // Confirmed slot, ready for calendar
    notes: notes || topicOfInterest || '',
    createdAt: new Date().toISOString()
  };

  // 3. Generate instant Google Calendar link & iCal download link
  newBooking.googleCalendarUrl = generateGoogleCalendarUrl(newBooking);
  newBooking.calendarIcsUrl = `/api/bookings/${newBooking.id}/calendar.ics`;

  bookings.unshift(newBooking);
  writeJson('bookings.json', bookings);

  // 4. Trigger Email Notification to Site Owner (with Google Calendar & Confirm button) and Client
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  sendBookingEmails(newBooking, baseUrl).catch(err => {
    console.error('[Email Notification Error]:', err.message);
  });

  res.status(201).json({
    message: 'Your 20-minute consultation has been scheduled successfully! An email notification has been dispatched with Google Calendar integration.',
    booking: newBooking
  });
});

// Download .ics iCalendar invite file
app.get('/api/bookings/:id/calendar.ics', (req, res) => {
  const bookings = readJson('bookings.json') || [];
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).send('Booking not found');

  const ics = generateIcsContent(booking);
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="MMR-Rise-${booking.id}.ics"`);
  res.send(ics);
});

// Direct redirect to Google Calendar
app.get('/api/bookings/:id/gcal', (req, res) => {
  const bookings = readJson('bookings.json') || [];
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).send('Booking not found');

  const gcalUrl = generateGoogleCalendarUrl(booking);
  res.redirect(gcalUrl);
});

// Site Owner 1-Click Confirmation Landing Page
app.get('/api/bookings/confirm/:id', (req, res) => {
  const bookings = readJson('bookings.json') || [];
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).send('Booking not found');

  booking.status = 'Confirmed';
  booking.hostConfirmedAt = new Date().toISOString();
  writeJson('bookings.json', bookings);

  const gcalUrl = generateGoogleCalendarUrl(booking);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Booking Confirmed | MMR Rise Executive Advisory</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #060e1c; color: #ffffff; margin: 0; padding: 32px 16px; display: flex; align-items: center; justify-content: center; min-height: 90vh; }
        .card { max-width: 580px; width: 100%; background: #0a1931; border: 1px solid #1f74b9; border-radius: 24px; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); text-align: center; }
        .badge { display: inline-block; background: rgba(244, 149, 29, 0.2); color: #f4951d; border: 1px solid rgba(244, 149, 29, 0.4); padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        h1 { margin: 16px 0 8px; font-size: 24px; color: #ffffff; }
        p.subtitle { color: #94a3b8; font-size: 14px; margin-bottom: 24px; }
        .box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px; text-align: left; font-size: 13px; line-height: 1.8; margin-bottom: 24px; }
        .box strong { color: #f4951d; }
        .actions { display: flex; flex-direction: column; gap: 12px; }
        .btn-gcal { background: #1a73e8; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 12px; font-weight: 700; font-size: 14px; display: block; box-shadow: 0 4px 12px rgba(26,115,232,0.4); }
        .btn-ics { background: rgba(255,255,255,0.08); color: #e2e8f0; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-size: 13px; display: block; border: 1px solid rgba(255,255,255,0.15); }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge">Session Confirmed & Approved</span>
        <h1>Executive Consultation Confirmed</h1>
        <p class="subtitle">The 20-minute session has been confirmed in the MMR Rise system.</p>
        
        <div class="box">
          <div>Client: <strong>${booking.clientName}</strong></div>
          <div>Date: <strong>${booking.date} (${booking.weekday || 'Sat-Thu'})</strong></div>
          <div>Time: <strong>${booking.timeSlot}</strong> (20 Minutes)</div>
          <div>Email: <strong>${booking.clientEmail}</strong> &bull; Phone: <strong>${booking.clientPhone}</strong></div>
          <div>Mode: <strong>${booking.mode}</strong></div>
          <div>Agenda: <em>${booking.notes || 'General Executive Advisory'}</em></div>
          <div>Booking ID: <code>${booking.id}</code></div>
        </div>

        <div class="actions">
          <a href="${gcalUrl}" target="_blank" class="btn-gcal">
            📅 Add to Your Google Calendar
          </a>
          <a href="/api/bookings/${booking.id}/calendar.ics" class="btn-ics">
            📥 Download .ICS Calendar Invite
          </a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// View recorded email logs
app.get('/api/bookings/emails', (req, res) => {
  const emailLogs = readJson('email-logs.json') || [];
  res.json(emailLogs);
});

app.get('/api/bookings', (req, res) => {
  const bookings = readJson('bookings.json') || [];
  res.json(bookings);
});

// 6. Speaking Engagements
app.get('/api/speaking', (req, res) => {
  const speaking = readJson('speaking.json');
  res.json(speaking);
});

app.post('/api/speaking/request', (req, res) => {
  const { organizerName, email, phone, organization, eventName, eventDate, location, topic, expectedAttendees, notes } = req.body;
  if (!organizerName || !email || !eventName || !eventDate) {
    return res.status(400).json({ error: 'Missing required speaking request information' });
  }

  const requestsFile = 'speaking_requests.json';
  const requests = readJson(requestsFile) || [];
  const newRequest = {
    id: `SPK-${Date.now()}`,
    organizerName,
    email,
    phone,
    organization,
    eventName,
    eventDate,
    location: location || 'Dhaka / Virtual',
    topic: topic || 'Custom Keynote Topic',
    expectedAttendees: expectedAttendees || '100+',
    notes: notes || '',
    status: 'In Review',
    createdAt: new Date().toISOString()
  };

  requests.unshift(newRequest);
  writeJson(requestsFile, requests);

  res.status(201).json({
    message: 'Speaking engagement inquiry submitted! MMR Rise speaker management will reach out within 24 hours.',
    request: newRequest
  });
});

// 7. Media & Press
app.get('/api/media', (req, res) => {
  const media = readJson('media.json');
  res.json(media);
});

// 8. FAQs
app.get('/api/faqs', (req, res) => {
  const faqs = readJson('faqs.json');
  res.json(faqs);
});

// 9. Contact Inquiries
app.get('/api/contacts', (req, res) => {
  const contacts = readJson('contacts.json') || [];
  res.json(contacts);
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, serviceInterest, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const contacts = readJson('contacts.json') || [];
  const newContact = {
    id: `MSG-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    subject: subject || 'General Consultation Inquiry',
    serviceInterest: serviceInterest || 'General',
    message,
    status: 'Unread',
    createdAt: new Date().toISOString()
  };

  contacts.unshift(newContact);
  writeJson('contacts.json', contacts);

  // Dispatch email notification to site owner asynchronously
  sendContactNotification(newContact).catch(err => {
    console.error('[Contact Email] Error sending inquiry notification:', err.message);
  });

  res.status(201).json({
    message: 'Thank you for reaching out to MMR Rise. Mukhlesur Rahman’s executive office has received your message and will get back to you shortly.',
    contact: newContact
  });
});

// Serve Angular Frontend Production Build if present
const clientDist = path.join(__dirname, '../client/dist/client/browser');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Only start listener if run directly (not as a Vercel serverless function)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`MMR Rise Fullstack Server is running smoothly on http://localhost:${PORT}`);
  });
}

export default app;
