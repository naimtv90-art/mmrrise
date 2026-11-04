import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

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

// 5. Booking Slots & Paid Consultation Booking
app.get('/api/bookings/available-slots', (req, res) => {
  const slots = [
    { id: 'slot-1', date: '2026-11-15', time: '10:00 AM - 11:30 AM', available: true },
    { id: 'slot-2', date: '2026-11-15', time: '03:00 PM - 04:30 PM', available: true },
    { id: 'slot-3', date: '2026-11-16', time: '11:00 AM - 12:30 PM', available: true },
    { id: 'slot-4', date: '2026-11-18', time: '02:00 PM - 03:30 PM', available: true },
    { id: 'slot-5', date: '2026-11-20', time: '10:00 AM - 11:30 AM', available: false }, // booked
    { id: 'slot-6', date: '2026-11-22', time: '04:00 PM - 05:30 PM', available: true },
    { id: 'slot-7', date: '2026-11-25', time: '11:00 AM - 12:30 PM', available: true }
  ];

  const packages = [
    {
      id: 'pkg-discovery',
      name: 'Strategy Discovery Call',
      duration: '30 Minutes',
      price: 5000,
      currency: 'BDT',
      badge: 'Introductory',
      description: 'Focused 1-on-1 assessment to diagnose your key organizational or leadership friction points and outline next strategic moves.'
    },
    {
      id: 'pkg-executive',
      name: 'Executive Leadership Strategy Deep-Dive',
      duration: '90 Minutes',
      price: 15000,
      currency: 'BDT',
      badge: 'Most Popular',
      description: 'Comprehensive 1-on-1 advisory with Mukhlasur Rahaman on executive presence, C-suite navigation, or acute project crisis.'
    },
    {
      id: 'pkg-corporate-audit',
      name: 'Corporate Transformation & PMO Readiness Audit',
      duration: 'Half-Day (3 Hours)',
      price: 45000,
      currency: 'BDT',
      badge: 'Enterprise Advisory',
      description: 'Executive-level operational architecture review for your enterprise leadership team or project management office.'
    }
  ];

  res.json({ slots, packages });
});

app.post('/api/bookings', (req, res) => {
  const { packageId, packageName, clientName, clientEmail, clientPhone, organization, date, timeSlot, mode, paymentMethod, notes, fee } = req.body;
  if (!clientName || !clientEmail || !clientPhone || !date || !timeSlot) {
    return res.status(400).json({ error: 'Missing mandatory booking fields' });
  }

  const bookings = readJson('bookings.json') || [];
  const newBooking = {
    id: `BK-${Date.now()}`,
    packageId: packageId || 'custom',
    packageName: packageName || 'Executive Consultation',
    clientName,
    clientEmail,
    clientPhone,
    organization: organization || 'Individual / Confidential',
    date,
    timeSlot,
    mode: mode || 'Virtual (Google Meet / Zoom)',
    fee: fee || 15000,
    currency: 'BDT',
    paymentMethod: paymentMethod || 'bKash / Card / Direct Bank Transfer',
    paymentStatus: 'Verification Pending / Paid Demo',
    status: 'Confirmed',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);
  writeJson('bookings.json', bookings);

  res.status(201).json({
    message: 'Your booking has been scheduled successfully! A calendar invitation and confirmation receipt have been generated.',
    booking: newBooking
  });
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

  res.status(201).json({
    message: 'Thank you for reaching out to MMR Rise. Mukhlasur Rahaman’s executive office has received your message and will get back to you shortly.',
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
