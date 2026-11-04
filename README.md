# MMR Rise — Official Web Platform
### Mukhlasur Rahaman | Executive Coach, Corporate Trainer & Management Consultant

A fullstack web application built with **Angular (v18)** and **Node.js (Express)** for **Mukhlasur Rahaman** and his advisory firm **MMR Rise**. Designed with high-end executive aesthetics (Deep Navy, Royal Gold, Crisp Typography) and built-in lead generation, paid booking scheduling, and course sales.

---

## 📌 Features & Pages Implemented

### 1. Services Delivered (Content & Delivery Details)
1. **Strategic Consulting** — Diagnostics, market positioning, business model innovation & revenue optimization.
2. **Organizational Transformation** — Cultural realignment, organizational health index, agile change management.
3. **Project Management Consultancy** — PMO setup, PMP/Agile delivery frameworks, crisis recovery.
4. **Organizational Coaching** — Team dynamics, trust benchmarks, OKR cascades, conflict resolution.
5. **Executive Coaching** — Confidential 1-on-1 C-Suite retainers, 360 leadership assessments, strategic sounding board.
6. **Frequently Asked Questions (FAQ)** — Categorized accordion covering retainers, confidentiality, timelines, and formats.

### 2. Website Pages & Modules
- **Home Page (`/`)**: Executive Hero section, Credibility Stats (18+ Years, 500+ Leaders, 65+ Orgs), Core Services overview, Featured Courses, Keynote spotlight, and direct CTA.
- **About Mukhlasur Rahaman (`/about-mmr`)**: Detailed executive biography, 18+ years journey, PMP & Agile credentials, 4-pillar coaching philosophy, and leadership quotes.
- **About MMR Rise (`/about-rise`)**: Advisory firm vision, mission, and the proprietary **R.I.S.E.** transformation framework.
- **Consulting Services (`/services`)**: Full service delivery information, deliverables checklist, engagement durations, target audiences, and inquiry buttons.
- **Course Sales (`/courses`)**: Both Online Virtual and Offline (Dhaka) academy bootcamps, price cards in BDT, curriculum highlights, and interactive seat enrollment modal.
- **Speaking Engagements (`/speaking`)**: Keynote speech topics, themes, formats, and corporate summit invitation booking form.
- **Media & Thought Leadership (`/media`)**: Video speeches, podcast interviews, publications, and workshop series gallery.
- **Paid Booking Page (`/booking`)**: Interactive booking calendar with tier selection (Discovery Call, Executive Deep-Dive, Corporate Audit), live timeslot picker, and payment simulation (bKash / Card / Bank).
- **Contact Form & Office Info (`/contact`)**: Direct executive office inquiry form connected to Node.js backend, Gulshan-2 office coordinates, plus full FAQ section.

---

## 🚀 How to Run the Application

### Option A: Run Fullstack Server (Instant Production Mode)
The server serves both the **REST API** and the compiled **Angular Frontend**:
```powershell
cd "d:\Antigravity\MMR Website"
npm start
```
👉 Open your browser at: **`http://localhost:5000`**

---

### Option B: Run in Development Mode (Live Reloading)
Open two terminal windows:

**Terminal 1 (Backend API):**
```powershell
cd "d:\Antigravity\MMR Website\server"
node --watch server.js
```
*API runs at `http://localhost:5000`*

**Terminal 2 (Angular Client):**
```powershell
cd "d:\Antigravity\MMR Website\client"
npm start
```
*Angular Dev Server runs at `http://localhost:4200`*

---

## 📂 Project Structure
```text
MMR Website/
├── client/                      # Angular 18 Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Header, Footer
│   │   │   ├── pages/          # Home, About MMR, About Rise, Services, Courses, Speaking, Media, Booking, Contact
│   │   │   ├── services/       # ApiService (HttpClient connection to Node.js)
│   │   │   ├── app.routes.ts   # Route definitions
│   │   │   └── app.config.ts   # Client configuration
│   │   └── styles.css          # Tailwind CSS & Typography
│   └── tailwind.config.js      # Executive Navy & Gold Theme
├── server/                      # Node.js + Express Backend
│   ├── data/                   # Persistent JSON Store (services, courses, bookings, contacts, faqs, media)
│   ├── server.js               # RESTful API Endpoints & Static Server
│   └── package.json
└── package.json                 # Root convenience scripts
```

