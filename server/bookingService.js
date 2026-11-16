/**
 * MMR Rise Booking & Calendar Integration Service
 * Manages 20-minute slot generation (Sat-Thu, 9 AM - 9 PM BST)
 * and Google Calendar / iCal / Email notification generation.
 */

// Generate 36 standard 20-minute slots between 09:00 AM and 09:00 PM
export const TIME_SLOTS_20MIN = [
  { id: '0900', start: '09:00 AM', end: '09:20 AM', label: '09:00 AM - 09:20 AM', period: 'morning', startHour: 9, startMin: 0, endHour: 9, endMin: 20 },
  { id: '0920', start: '09:20 AM', end: '09:40 AM', label: '09:20 AM - 09:40 AM', period: 'morning', startHour: 9, startMin: 20, endHour: 9, endMin: 40 },
  { id: '0940', start: '09:40 AM', end: '10:00 AM', label: '09:40 AM - 10:00 AM', period: 'morning', startHour: 9, startMin: 40, endHour: 10, endMin: 0 },
  { id: '1000', start: '10:00 AM', end: '10:20 AM', label: '10:00 AM - 10:20 AM', period: 'morning', startHour: 10, startMin: 0, endHour: 10, endMin: 20 },
  { id: '1020', start: '10:20 AM', end: '10:40 AM', label: '10:20 AM - 10:40 AM', period: 'morning', startHour: 10, startMin: 20, endHour: 10, endMin: 40 },
  { id: '1040', start: '10:40 AM', end: '11:00 AM', label: '10:40 AM - 11:00 AM', period: 'morning', startHour: 10, startMin: 40, endHour: 11, endMin: 0 },
  { id: '1100', start: '11:00 AM', end: '11:20 AM', label: '11:00 AM - 11:20 AM', period: 'morning', startHour: 11, startMin: 0, endHour: 11, endMin: 20 },
  { id: '1120', start: '11:20 AM', end: '11:40 AM', label: '11:20 AM - 11:40 AM', period: 'morning', startHour: 11, startMin: 20, endHour: 11, endMin: 40 },
  { id: '1140', start: '11:40 AM', end: '12:00 PM', label: '11:40 AM - 12:00 PM', period: 'morning', startHour: 11, startMin: 40, endHour: 12, endMin: 0 },
  { id: '1200', start: '12:00 PM', end: '12:20 PM', label: '12:00 PM - 12:20 PM', period: 'afternoon', startHour: 12, startMin: 0, endHour: 12, endMin: 20 },
  { id: '1220', start: '12:20 PM', end: '12:40 PM', label: '12:20 PM - 12:40 PM', period: 'afternoon', startHour: 12, startMin: 20, endHour: 12, endMin: 40 },
  { id: '1240', start: '12:40 PM', end: '01:00 PM', label: '12:40 PM - 01:00 PM', period: 'afternoon', startHour: 12, startMin: 40, endHour: 13, endMin: 0 },
  { id: '1300', start: '01:00 PM', end: '01:20 PM', label: '01:00 PM - 01:20 PM', period: 'afternoon', startHour: 13, startMin: 0, endHour: 13, endMin: 20 },
  { id: '1320', start: '01:20 PM', end: '01:40 PM', label: '01:20 PM - 01:40 PM', period: 'afternoon', startHour: 13, startMin: 20, endHour: 13, endMin: 40 },
  { id: '1340', start: '01:40 PM', end: '02:00 PM', label: '01:40 PM - 02:00 PM', period: 'afternoon', startHour: 13, startMin: 40, endHour: 14, endMin: 0 },
  { id: '1400', start: '02:00 PM', end: '02:20 PM', label: '02:00 PM - 02:20 PM', period: 'afternoon', startHour: 14, startMin: 0, endHour: 14, endMin: 20 },
  { id: '1420', start: '02:20 PM', end: '02:40 PM', label: '02:20 PM - 02:40 PM', period: 'afternoon', startHour: 14, startMin: 20, endHour: 14, endMin: 40 },
  { id: '1440', start: '02:40 PM', end: '03:00 PM', label: '02:40 PM - 03:00 PM', period: 'afternoon', startHour: 14, startMin: 40, endHour: 15, endMin: 0 },
  { id: '1500', start: '03:00 PM', end: '03:20 PM', label: '03:00 PM - 03:20 PM', period: 'afternoon', startHour: 15, startMin: 0, endHour: 15, endMin: 20 },
  { id: '1520', start: '03:20 PM', end: '03:40 PM', label: '03:20 PM - 03:40 PM', period: 'afternoon', startHour: 15, startMin: 20, endHour: 15, endMin: 40 },
  { id: '1540', start: '03:40 PM', end: '04:00 PM', label: '03:40 PM - 04:00 PM', period: 'afternoon', startHour: 15, startMin: 40, endHour: 16, endMin: 0 },
  { id: '1600', start: '04:00 PM', end: '04:20 PM', label: '04:00 PM - 04:20 PM', period: 'afternoon', startHour: 16, startMin: 0, endHour: 16, endMin: 20 },
  { id: '1620', start: '04:20 PM', end: '04:40 PM', label: '04:20 PM - 04:40 PM', period: 'afternoon', startHour: 16, startMin: 20, endHour: 16, endMin: 40 },
  { id: '1640', start: '04:40 PM', end: '05:00 PM', label: '04:40 PM - 05:00 PM', period: 'afternoon', startHour: 16, startMin: 40, endHour: 17, endMin: 0 },
  { id: '1700', start: '05:00 PM', end: '05:20 PM', label: '05:00 PM - 05:20 PM', period: 'evening', startHour: 17, startMin: 0, endHour: 17, endMin: 20 },
  { id: '1720', start: '05:20 PM', end: '05:40 PM', label: '05:20 PM - 05:40 PM', period: 'evening', startHour: 17, startMin: 20, endHour: 17, endMin: 40 },
  { id: '1740', start: '05:40 PM', end: '06:00 PM', label: '05:40 PM - 06:00 PM', period: 'evening', startHour: 17, startMin: 40, endHour: 18, endMin: 0 },
  { id: '1800', start: '06:00 PM', end: '06:20 PM', label: '06:00 PM - 06:20 PM', period: 'evening', startHour: 18, startMin: 0, endHour: 18, endMin: 20 },
  { id: '1820', start: '06:20 PM', end: '06:40 PM', label: '06:20 PM - 06:40 PM', period: 'evening', startHour: 18, startMin: 20, endHour: 18, endMin: 40 },
  { id: '1840', start: '06:40 PM', end: '07:00 PM', label: '06:40 PM - 07:00 PM', period: 'evening', startHour: 18, startMin: 40, endHour: 19, endMin: 0 },
  { id: '1900', start: '07:00 PM', end: '07:20 PM', label: '07:00 PM - 07:20 PM', period: 'evening', startHour: 19, startMin: 0, endHour: 19, endMin: 20 },
  { id: '1920', start: '07:20 PM', end: '07:40 PM', label: '07:20 PM - 07:40 PM', period: 'evening', startHour: 19, startMin: 20, endHour: 19, endMin: 40 },
  { id: '1940', start: '07:40 PM', end: '08:00 PM', label: '07:40 PM - 08:00 PM', period: 'evening', startHour: 19, startMin: 40, endHour: 20, endMin: 0 },
  { id: '2000', start: '08:00 PM', end: '08:20 PM', label: '08:00 PM - 08:20 PM', period: 'evening', startHour: 20, startMin: 0, endHour: 20, endMin: 20 },
  { id: '2020', start: '08:20 PM', end: '08:40 PM', label: '08:20 PM - 08:40 PM', period: 'evening', startHour: 20, startMin: 20, endHour: 20, endMin: 40 },
  { id: '2040', start: '08:40 PM', end: '09:00 PM', label: '08:40 PM - 09:00 PM', period: 'evening', startHour: 20, startMin: 40, endHour: 21, endMin: 0 }
];

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Checks if a YYYY-MM-DD date is a Friday.
 */
export function isFriday(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(Date.UTC(y, m - 1, d));
  return dateObj.getUTCDay() === 5; // 5 is Friday
}

/**
 * Returns weekday name for a YYYY-MM-DD date string.
 */
export function getWeekdayName(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(Date.UTC(y, m - 1, d));
  return DAY_NAMES[dateObj.getUTCDay()];
}

/**
 * Generates slots for a specific date, checking against existing bookings.
 */
export function getSlotsForDate(dateStr, existingBookings = []) {
  if (isFriday(dateStr)) {
    return {
      date: dateStr,
      weekday: 'Friday',
      isFriday: true,
      available: false,
      message: 'Fridays are non-working days. MMR Rise advisory operates Saturday through Thursday.',
      slots: []
    };
  }

  const weekday = getWeekdayName(dateStr);
  
  // Find bookings for this date that are not cancelled
  const bookedSlotsOnDate = new Set(
    existingBookings
      .filter(b => b.date === dateStr && b.status !== 'Cancelled')
      .map(b => b.timeSlot)
  );

  const slots = TIME_SLOTS_20MIN.map(slot => ({
    id: `${dateStr}_${slot.id}`,
    time: slot.label,
    start: slot.start,
    end: slot.end,
    period: slot.period,
    available: !bookedSlotsOnDate.has(slot.label),
    duration: '20 Minutes'
  }));

  return {
    date: dateStr,
    weekday,
    isFriday: false,
    available: true,
    totalSlots: slots.length,
    availableCount: slots.filter(s => s.available).length,
    slots
  };
}

/**
 * Helper to parse a date string and time label to UTC start and end ISO/Google strings.
 * Note: Time is in Bangladesh Standard Time (BST = UTC+6).
 */
export function getUtcStartAndEnd(dateStr, timeSlotLabel) {
  const [year, month, day] = dateStr.split('-').map(Number);
  
  // Find matching slot definition
  const slotDef = TIME_SLOTS_20MIN.find(s => s.label === timeSlotLabel) || TIME_SLOTS_20MIN[0];

  // BST is UTC+6. To convert BST to UTC, subtract 6 hours.
  // Start:
  const startDateUtc = new Date(Date.UTC(year, month - 1, day, slotDef.startHour - 6, slotDef.startMin, 0));
  // End:
  const endDateUtc = new Date(Date.UTC(year, month - 1, day, slotDef.endHour - 6, slotDef.endMin, 0));

  const formatGCal = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return {
    startUtc: startDateUtc,
    endUtc: endDateUtc,
    gcalDates: `${formatGCal(startDateUtc)}/${formatGCal(endDateUtc)}`
  };
}

/**
 * Generates an active, pre-filled Google Calendar event URL.
 */
export function generateGoogleCalendarUrl(booking) {
  const { date, timeSlot, clientName, clientEmail, clientPhone, organization, notes, mode, id } = booking;
  const { gcalDates } = getUtcStartAndEnd(date, timeSlot);

  const title = `MMR Rise Executive Consultation: ${clientName || 'Client'}`;
  
  const details = [
    `MMR Rise 20-Minute Executive Advisory Session`,
    `----------------------------------------`,
    `Client: ${clientName}`,
    `Email: ${clientEmail}`,
    `Phone: ${clientPhone || 'N/A'}`,
    `Organization: ${organization || 'Individual'}`,
    `Delivery Mode: ${mode || 'Virtual (Google Meet)'}`,
    `Discussion Agenda: ${notes || 'General Leadership & Executive Advisory'}`,
    `Booking Ref: ${id}`,
    ``,
    `Host: Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM`,
    `Official Website: https://mmrrise.com`,
    `Direct Email: mmrshohagbd@gmail.com`
  ].join('\n');

  const location = (mode && mode.includes('In-Person'))
    ? 'MMR Rise Executive Suite, Gulshan-2, Dhaka-1212, Bangladesh'
    : 'Google Meet / Virtual Conference';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: gcalDates,
    details: details,
    location: location,
    add: clientEmail || ''
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates valid iCalendar (.ics) format file content.
 */
export function generateIcsContent(booking) {
  const { date, timeSlot, clientName, clientEmail, organization, notes, mode, id } = booking;
  const { startUtc, endUtc } = getUtcStartAndEnd(date, timeSlot);

  const formatIcs = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const now = formatIcs(new Date());

  const location = (mode && mode.includes('In-Person'))
    ? 'MMR Rise Executive Suite, Gulshan-2, Dhaka-1212, Bangladesh'
    : 'Google Meet / Virtual Conference';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MMR Rise//Executive Advisory Platform//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${id}@mmrrise.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatIcs(startUtc)}`,
    `DTEND:${formatIcs(endUtc)}`,
    `SUMMARY:MMR Rise Executive Consultation - ${clientName}`,
    `DESCRIPTION:MMR Rise 20-Minute Executive Advisory Session with Mukhlesur Rahman.\\nClient: ${clientName}\\nEmail: ${clientEmail}\\nOrg: ${organization || 'Individual'}\\nAgenda: ${notes || 'Executive Advisory'}\\nRef: ${id}`,
    `LOCATION:${location}`,
    `STATUS:CONFIRMED`,
    `ORGANIZER;CN="Mukhlesur Rahman (MMR Rise)":mailto:mmrshohagbd@gmail.com`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN="${clientName}":mailto:${clientEmail}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}
