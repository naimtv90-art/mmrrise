import { ServiceItem, CourseItem, BookingPackage, BookingSlot, SpeakingTopic, MediaItem, FaqItem } from './api.service';

export const FALLBACK_PROFILE = {
  name: "Mukhlasur Rahaman",
  brand: "MMR Rise",
  title: "Executive Coach, Corporate Trainer & Management Consultant",
  tagline: "Empowering Leaders. Transforming Cultures. Accelerating Execution.",
  experienceYears: 18,
  stats: {
    leadersCoached: "500+",
    organizationsTransformed: "65+",
    trainingHours: "12,000+",
    clientSatisfactionRate: "99.4%"
  },
  bioShort: "Mukhlasur Rahaman is a seasoned executive coach, enterprise consultant, and corporate trainer dedicated to guiding founders, CXOs, and ambitious organizations toward sustainable leadership mastery and operational excellence.",
  bioFull: "With over 18 years of cross-industry leadership and consulting experience, Mukhlasur Rahaman (MMR) has been at the forefront of organizational transformation, strategic governance, and leadership acceleration. Through his advisory firm MMR Rise, he bridges the gap between vision and execution. Whether mentoring C-suite executives in high-stakes negotiations, restructuring complex PMOs, or coaching high-performance teams, Mukhlasur brings deep strategic clarity, empathy, and uncompromising accountability to every room he enters.",
  credentials: [
    "Certified Executive Leadership Coach",
    "Certified Enterprise Agile & Scrum Consultant",
    "Project Management Professional (PMP) Accredited Advisor",
    "Senior Organizational Development & Transformation Specialist",
    "Keynote Speaker at 100+ National & Regional Industry Summits"
  ],
  contact: {
    email: "contact@mmrrise.com",
    phone: "+880 1711 000000",
    location: "Gulshan-2, Dhaka, Bangladesh",
    linkedin: "https://linkedin.com/in/mukhlasur-rahaman",
    hours: "Sunday - Thursday: 9:00 AM - 6:00 PM (BST)"
  }
};

export const FALLBACK_SERVICES: ServiceItem[] = [
  {
    id: "consulting",
    title: "Strategic Consulting",
    subtitle: "High-Impact Enterprise & Business Strategy Advisory",
    badge: "Strategy & Growth",
    icon: "briefcase",
    description: "Comprehensive corporate advisory to diagnose operational bottlenecks, formulate resilient business strategies, and drive sustainable market expansion for growth-oriented enterprises.",
    deliverables: [
      "Enterprise Capability & Readiness Assessment",
      "Market Positioning & Competitive Landscape Strategy",
      "Business Model Innovation & Revenue Optimization",
      "Quarterly Strategic Milestone Review & Governance"
    ],
    duration: "3 - 12 Months Engagement",
    targetAudience: "Enterprises, Mid-Market Companies, Fast-Growing Startups",
    deliverableFormat: "Hybrid (On-site diagnostic + Executive Boardrooms)"
  },
  {
    id: "organizational-transformation",
    title: "Organizational Transformation",
    subtitle: "Cultural, Structural & Agile Agility Transformation",
    badge: "Culture & Systems",
    icon: "refresh-cw",
    description: "Guiding enterprises through profound operational shifts, cultural realignment, and leadership readiness to stay resilient in rapidly evolving disruptive industries.",
    deliverables: [
      "Culture Gap Audit & Organizational Health Index",
      "Cross-Functional Team Restructuring & Change Management",
      "Agile & High-Performance Operating System Integration",
      "Change Champion Enablement & Leadership Alignment"
    ],
    duration: "6 - 18 Months",
    targetAudience: "Corporations transitioning to modern management models",
    deliverableFormat: "Deep-Dive Workshops, Change Roadmaps & Shadowing"
  },
  {
    id: "project-management-consultancy",
    title: "Project Management Consultancy",
    subtitle: "Global Standards, PMO Setup & Delivery Governance",
    badge: "Execution & Delivery",
    icon: "check-square",
    description: "Transforming chaotic project delivery into predictable, on-time, within-budget success through proven PMO methodologies (PMP, Agile, Scrum, Lean PM).",
    deliverables: [
      "Enterprise PMO (Project Management Office) Architecture & Setup",
      "Project Risk, Governance & Quality Control Frameworks",
      "Portfolio Prioritization & Resource Capacity Planning",
      "Hands-on Rescue for At-Risk Mission-Critical Projects"
    ],
    duration: "Project-based or Retainer Advisory",
    targetAudience: "PMOs, Engineering, IT, Infrastructure & Large Project Teams",
    deliverableFormat: "On-site PMO Implementation, Sprints & Tool Dashboards"
  },
  {
    id: "organizational-coaching",
    title: "Organizational Coaching",
    subtitle: "High-Performance Team Dynamics & Execution Alignment",
    badge: "Team Alignment",
    icon: "users",
    description: "Break silos, cultivate fierce psychological safety, and institute accountability habits that turn fractured departments into autonomous, results-driven teams.",
    deliverables: [
      "Departmental OKR & KPI Cascading Frameworks",
      "Psychological Safety & High-Trust Team Interventions",
      "Executive Team Conflict Resolution & Alignment Retreats",
      "Continuous Performance Feedback Architecture"
    ],
    duration: "Quarterly Cohorts or Retainers",
    targetAudience: "Department Heads, Team Leads, Cross-Functional Units",
    deliverableFormat: "Facilitated Cohort Coaching, Offsites & Follow-ups"
  },
  {
    id: "executive-coaching",
    title: "Executive 1-on-1 Coaching",
    subtitle: "Confidential Sounding Board for Founders, CXOs & MDs",
    badge: "Confidential Advisory",
    icon: "user-check",
    description: "A private, confidential sparring partner for senior executive leaders tackling high-stakes dilemmas, boardroom dynamics, emotional resilience, and personal leadership evolution.",
    deliverables: [
      "Confidential Bi-Weekly 1-on-1 Strategic Coaching Sessions",
      "360-Degree Executive Stakeholder Perception Audit",
      "Strategic Decision Matrix & Communication Mastery",
      "Executive Energy, Poise & Stress Governance"
    ],
    duration: "6 Months or 12 Months Executive Retainer",
    targetAudience: "CEOs, Founders, Managing Directors, C-Suite Leaders",
    deliverableFormat: "1-on-1 Virtual or Executive Suite Sessions + Direct Access"
  }
];

export const FALLBACK_COURSES: CourseItem[] = [
  {
    id: "pm-mastery-bootcamp",
    title: "Mastering Agile & Enterprise Project Management",
    category: "Project Management",
    deliveryMode: "Hybrid (Online + In-Person Workshops)",
    level: "Intermediate to Advanced",
    duration: "8 Weeks (32 Hours)",
    price: 25000,
    currency: "BDT",
    originalPrice: 35000,
    rating: 4.9,
    reviewCount: 142,
    instructor: "Mukhlasur Rahaman",
    shortDescription: "Master end-to-end modern project delivery, Agile/Scrum lifecycles, PMO methodologies, and real-world project crisis recovery.",
    features: [
      "Live Interactive Weekend Masterclasses",
      "Real-world Case Studies & Capstone Project",
      "PMO Ready Templates & Frameworks",
      "Direct Mentorship & 1-on-1 Review",
      "Accredited MMR Rise Certificate"
    ],
    upcomingBatch: "Starting 15th December 2026",
    platform: "Both Online & Offline (Dhaka Hub)"
  },
  {
    id: "executive-leadership-accelerator",
    title: "Executive Leadership & Strategic Influence",
    category: "Leadership",
    deliveryMode: "Online Executive Cohort",
    level: "Senior Leaders & C-Suite",
    duration: "6 Weeks (Live Virtual Labs)",
    price: 40000,
    currency: "BDT",
    originalPrice: 55000,
    rating: 5.0,
    reviewCount: 88,
    instructor: "Mukhlasur Rahaman",
    shortDescription: "An intensive closed-door leadership lab for senior executives looking to master board-level influence, strategic agility, and visionary leadership.",
    features: [
      "Closed-Door Cohort of Max 15 Executives",
      "Strategic Boardroom Simulation",
      "Executive Presence & Communication Coaching",
      "Lifetime Access to Alumni Leadership Circle",
      "One 1-on-1 Private Coaching Session Included"
    ],
    upcomingBatch: "Starting 5th January 2027",
    platform: "Online Virtual Executive Lab"
  },
  {
    id: "corporate-trainer-cert",
    title: "Train The Trainer (TTT) - High-Impact Facilitation Mastery",
    category: "Training & Coaching",
    deliveryMode: "Offline Hands-on Immersion",
    level: "All Levels",
    duration: "3-Day Intensive Bootcamp",
    price: 30000,
    currency: "BDT",
    originalPrice: 42000,
    rating: 4.8,
    reviewCount: 96,
    instructor: "Mukhlasur Rahaman",
    shortDescription: "Become a world-class corporate trainer, captivating facilitator, and influential public speaker with stage mastery techniques.",
    features: [
      "Live Micro-Training Practice with Video Feedback",
      "Instructional Design & Adult Learning Psychology",
      "Audience Engagement & High-Energy Dynamics",
      "Trainer Toolkits, Slides & Activity Blueprints",
      "Corporate Certification & Empanelment Opportunities"
    ],
    upcomingBatch: "Starting 22nd December 2026",
    platform: "Offline In-Person (Executive Convention Center, Dhaka)"
  },
  {
    id: "organizational-culture-mastery",
    title: "Designing High-Trust & High-Performance Culture",
    category: "Organizational Transformation",
    deliveryMode: "Self-Paced Online + Weekly Q&A",
    level: "HR Leaders & Team Managers",
    duration: "4 Weeks Self-Paced",
    price: 15000,
    currency: "BDT",
    originalPrice: 22000,
    rating: 4.9,
    reviewCount: 64,
    instructor: "Mukhlasur Rahaman",
    shortDescription: "Practical toolkits for HR directors, team leaders, and CXOs to eliminate workplace toxicity, align values, and amplify team productivity.",
    features: [
      "On-Demand HD Video Modules",
      "Weekly Live Ask-Me-Anything with MMR",
      "Culture Assessment Surveys & Templates",
      "Employee Retention Playbook",
      "Verified Certificate of Completion"
    ],
    upcomingBatch: "Immediate Lifetime Access",
    platform: "Online Learning Portal"
  }
];

export const FALLBACK_PACKAGES: BookingPackage[] = [
  {
    id: "pkg-discovery",
    name: "Strategy Discovery Call",
    duration: "30 Minutes",
    price: 5000,
    currency: "BDT",
    badge: "Introductory",
    description: "Focused 1-on-1 assessment to diagnose your key organizational or leadership friction points and outline next strategic moves."
  },
  {
    id: "pkg-executive",
    name: "Executive Leadership Strategy Deep-Dive",
    duration: "90 Minutes",
    price: 15000,
    currency: "BDT",
    badge: "Most Popular",
    description: "Intensive deep-dive strategy session with Mukhlasur Rahaman on complex organizational transformation, PMO architecture, or confidential executive leadership challenges."
  },
  {
    id: "pkg-corporate",
    name: "Enterprise PMO & Transformation Audit",
    duration: "Half-Day (3.5 Hours)",
    price: 45000,
    currency: "BDT",
    badge: "Enterprise",
    description: "Comprehensive corporate advisory immersion for founders, management boards, and C-Suite teams analyzing enterprise delivery bottlenecks and governance roadmaps."
  }
];

export const FALLBACK_SLOTS: BookingSlot[] = [
  { id: 'slot-1', date: '2026-11-15', time: '10:00 AM - 11:30 AM', available: true },
  { id: 'slot-2', date: '2026-11-15', time: '03:00 PM - 04:30 PM', available: true },
  { id: 'slot-3', date: '2026-11-16', time: '11:00 AM - 12:30 PM', available: true },
  { id: 'slot-4', date: '2026-11-18', time: '02:00 PM - 03:30 PM', available: true },
  { id: 'slot-5', date: '2026-11-20', time: '10:00 AM - 11:30 AM', available: false },
  { id: 'slot-6', date: '2026-11-22', time: '04:00 PM - 05:30 PM', available: true },
  { id: 'slot-7', date: '2026-11-25', time: '11:00 AM - 12:30 PM', available: true }
];

export const FALLBACK_TOPICS: SpeakingTopic[] = [
  {
    id: "keynote-agile-future",
    title: "Leading in Uncharted Waters: Navigating Volatility with Strategic Agility",
    theme: "Leadership & Future of Work",
    audience: "Corporate Leaders, CXOs, Industry Summits",
    description: "How modern leaders can break rigid hierarchies, embrace rapid experimentation, and foster unwavering resilience amid economic headwinds.",
    duration: "45 - 60 Minutes + Q&A"
  },
  {
    id: "keynote-culture-transformation",
    title: "From Chaos to High Performance: Architecting Purpose-Driven Organizations",
    theme: "Organizational Culture",
    audience: "All-Hands Conferences, Annual Corporate Offsites",
    description: "Demystifying why transformation efforts fail and how authentic leadership transforms disengaged teams into accountable powerhouses.",
    duration: "60 Minutes Keynote"
  },
  {
    id: "keynote-project-governance",
    title: "The Execution Advantage: Delivering Complex Projects with Zero Excuses",
    theme: "Project & Delivery Governance",
    audience: "Project Managers, Tech Leads, Operations Leaders",
    description: "Tactical lessons learned from managing multi-million-dollar transformations, managing stakeholder conflict, and guaranteeing project velocity.",
    duration: "45 Minutes Keynote / 90 Minutes Masterclass"
  }
];

export const FALLBACK_MEDIA: MediaItem[] = [
  {
    id: "media-1",
    type: "Video",
    title: "Mastering Strategic Decision Making Under Pressure",
    source: "Leadership Summit Keynote",
    duration: "18 mins",
    tag: "Keynote Speech",
    date: "October 2026",
    description: "Watch Mukhlasur Rahaman address 500+ corporate leaders on executive poise and navigating high-stakes business choices."
  },
  {
    id: "media-2",
    type: "Podcast",
    title: "Why 70% of Digital Transformations Fail and How to Fix Them",
    source: "The Executive Edge Podcast (Episode 44)",
    duration: "42 mins",
    tag: "Podcast Feature",
    date: "September 2026",
    description: "A deep dive conversation exploring organizational psychology, change resistance, and execution velocity."
  },
  {
    id: "media-3",
    type: "Article",
    title: "The 5 Non-Negotiable Habits of Future-Ready Executive Teams",
    source: "Business Outlook Review",
    duration: "6 min read",
    tag: "Thought Leadership",
    date: "August 2026",
    description: "Featured opinion editorial on how agile leadership frameworks are reshaping corporate governance in South Asia."
  },
  {
    id: "media-4",
    type: "Gallery",
    title: "Corporate Transformation Immersion Workshop - Dhaka Hub",
    source: "MMR Rise Executive Masterclass",
    duration: "Photo Series",
    tag: "Workshop Gallery",
    date: "July 2026",
    description: "Highlights from the intensive 3-day corporate leadership retreat attended by 30+ Managing Directors and C-Suite executives."
  }
];

export const FALLBACK_FAQS: FaqItem[] = [
  {
    category: "Consulting & Transformation",
    question: "How does MMR Rise approach an organizational consulting engagement?",
    answer: "Our engagements follow a battle-tested 4-phase framework: 1) Diagnostic Audit (analyzing people, processes, and current bottlenecks), 2) Blueprint Design (co-crafting an actionable roadmap), 3) Guided Execution (hands-on facilitation, PMO governance, and team alignment), and 4) Institutionalization (measuring KPIs, continuous retrospectives, and ensuring self-sustaining growth)."
  },
  {
    category: "Consulting & Transformation",
    question: "What size of companies do you typically work with?",
    answer: "We consult with emerging mid-market firms ($5M-$50M turnover), fast-scaling tech companies, multinational subsidiaries, and large established conglomerates looking to modernize their operational structures, culture, and project governance."
  },
  {
    category: "Executive Coaching",
    question: "How confidential are the 1-on-1 executive coaching sessions?",
    answer: "All individual coaching sessions are held under strict non-disclosure agreements (NDA). The conversations serve as a safe, private sounding board for C-level executives, founders, and managing directors to address high-stakes dilemmas openly."
  },
  {
    category: "Executive Coaching",
    question: "What is the typical duration of an Executive Coaching retainer?",
    answer: "True behavioral and leadership transformation takes sustained practice. Our primary retainers run for 6 months or 12 months, featuring bi-weekly 60-to-90-minute strategic sessions, unlimited urgent text/email sounding board support, and 360-degree stakeholder feedback."
  },
  {
    category: "Courses & Training",
    question: "Are the courses available both online and offline?",
    answer: "Yes! MMR Rise delivers high-impact learning programs across both modalities: live virtual interactive cohort-based courses for global learners, as well as offline executive masterclasses and bootcamps at prestigious convention centers in Dhaka."
  },
  {
    category: "Booking & Speaking",
    question: "How can we book Mukhlasur Rahaman for a keynote speech or corporate summit?",
    answer: "You can request a speaker booking directly via our 'Speaking' page or through our Paid Booking calendar. Our engagement team will evaluate your event date, theme, and audience profile within 24 hours to finalize terms."
  }
];
