import { ServiceItem, CourseItem, BookingPackage, BookingSlot, SpeakingTopic, MediaItem, FaqItem } from './api.service';

export const FALLBACK_PROFILE = {
  name: "Mukhlesur Rahman",
  postNominals: "PMP, PgMP, PfMP, PCC, DTM",
  fullNameWithCredentials: "Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM",
  brand: "MMR Rise",
  title: "Executive Coach | Trainer | Strategic Advisor",
  tagline: "Organizations grow best when people grow with them.",
  experienceYears: 20,
  stats: {
    leadersCoached: "1,000+",
    organizationsTransformed: "20+ Years",
    trainingHours: "1,000+ Hours",
    clientSatisfactionRate: "99.5%"
  },
  bioShort: "Mukhlesur Rahman is an ICF Professional Certified Coach (PCC) and holder of PMP, PgMP, and PfMP certifications with over two decades of corporate leadership across telecom, technology, and strategic enterprise management.",
  bioFull: "Mukhlesur Rahman partners with CXOs, rising managers, and HR leaders to build leadership that performs and earns trust. Grounded in more than two decades of corporate leadership across telecom and technology, he has led regulatory strategy, stakeholder relations, sales and commercial organizations, and held full P&L accountability as Country Representative and General Manager for NEC Corporation in Bangladesh (managing ~US$40 million annual business) and senior leadership roles at Banglalink (delivering US$2 million in capex savings via fiber-exchange). He currently serves as Adviser to the Chairman and CEO of Betopia Group and sits on the Steering Committee (Board) of Good Neighbors Bangladesh. An alumnus of BUET and IBA (University of Dhaka), he completed executive leadership development at INSEAD and the Cornell University Senior Executive Leadership Program (CEO Track).",
  credentials: [
    "ICF Professional Certified Coach (PCC)",
    "PMI Certified: PMP, PgMP, PfMP (Project, Program & Portfolio Management)",
    "Distinguished Toastmaster (DTM) & Certified Product Ownership Analysis (CPOA)",
    "Trained Trainer (TOT) with corporate training leadership since 2010",
    "Steering Committee (Board) Member, Good Neighbors Bangladesh",
    "Adviser to the Chairman & CEO, Betopia Group (since 2021)",
    "Former Country Representative & General Manager, NEC Corporation Bangladesh",
    "Former Head of Regulatory Operations & Wholesale Business, Banglalink",
    "BUET (B.Sc. Engg), IBA DU (MBA), INSEAD LDP & Cornell Senior Executive (CEO Track)",
    "TEDx Speaker (TEDxBUET, TEDxNSU) & Keynote Speaker (PMI Bangladesh, AIUB)"
  ],
  contact: {
    email: "mmrshohagbd@gmail.com",
    phone: "+8801714113030",
    location: "Dhaka, Bangladesh (In-person in Dhaka & Chattogram)",
    linkedin: "https://www.linkedin.com/in/coachmmr",
    hours: "Sunday - Thursday: 9:00 AM - 6:00 PM (BST)"
  }
};

export const FALLBACK_SERVICES: ServiceItem[] = [
  {
    id: "coaching-cxos",
    title: "Coaching for CXOs",
    subtitle: "Executive Coaching (1:1), CXO Transition & Confidential Peer Circles",
    badge: "C-Suite Coaching",
    icon: "award",
    description: "Coaching is for leaders who want clarity, grounded confidence, ethical judgment and authentic presence in complex, high-stakes environments. Tailored 1:1 engagements, transition support for new executive roles, and facilitated CXO Peer Circles.",
    deliverables: [
      "Executive Coaching (1:1): Confidential, structured engagement on leadership presence, decision-making, stakeholder influence and leading the leadership team",
      "CXO Transition Coaching: Focused onboarding and transition support for leaders stepping into a new CEO, COO or CXO role, or entering a new enterprise",
      "CXO Peer Circle: Small, confidential group of peer CXOs meeting regularly to think through real leadership challenges, facilitated by Mukhlesur Rahman",
      "ICF Code of Ethics Compliance: Complete confidentiality where sponsors receive only pre-agreed milestone updates, never private conversation content"
    ],
    duration: "3 Months to 2 Years (45-60 min 1:1 / 2-3 hr group)",
    targetAudience: "CEOs, COOs, CFOs, Managing Directors, Board Members & Senior CXOs",
    deliverableFormat: "In-Person (Dhaka/Chattogram) or Live Virtual / Hybrid"
  },
  {
    id: "coaching-emerging-leaders",
    title: "Coaching for Rising Managers & Future CXOs",
    subtitle: "The CXO Pathway Program & High-Potential Individual Coaching",
    badge: "Succession & Growth",
    icon: "trending-up",
    description: "Designed for ambitious leaders stepping up from functional expertise to enterprise-wide leadership. Accelerates strategic thinking, commercial and P&L intuition, executive presence, and personal leadership brand.",
    deliverables: [
      "CXO Pathway Program: Rigorous cohort program for leaders moving from functional management to enterprise leadership",
      "Commercial & P&L Acumen: Translating departmental targets into enterprise-level commercial viability and EBITDA awareness",
      "Executive Presence & Stakeholder Influence: Mastering high-stakes communication, influence without authority, and board presence",
      "High-Potential 1:1 Coaching: Focused individual coaching sponsored by organizations as part of succession planning"
    ],
    duration: "3 - 6 Months Cohort / 1-on-1 Engagements",
    targetAudience: "Emerging Mid-Level Managers, Functional Heads, High-Potential Directors",
    deliverableFormat: "Interactive Cohort Labs, 1:1 Coaching & Strategic Simulations"
  },
  {
    id: "coaching-hr-leaders",
    title: "Coaching for HR Leaders & Culture",
    subtitle: "CHRO Strategic Partnering, Coaching Culture & Succession Architecture",
    badge: "HR Strategy & Culture",
    icon: "users",
    description: "Partnering with HR leadership to position HR as a core strategic driver to the CEO and Board, while cultivating an internal Coaching Culture that builds leadership capability from within.",
    deliverables: [
      "CHRO & HR Leader Coaching: Developing the HR leader as a strategic business partner and trusted sounding board to the CEO",
      "Coaching Culture Program: Building coaching skills in HR teams and internal managers (Manager-as-Coach and group coaching formats)",
      "Talent & Succession Partnership: Co-designing structured coaching and assessment frameworks for high-potentials and succession pipelines",
      "Internal Capability Institutionalization: Equipping organizations to develop and sustain their own leadership talent internally"
    ],
    duration: "3 - 12 Months Partnership",
    targetAudience: "CHROs, HR Directors, People & Culture Executives, Internal Talent Leaders",
    deliverableFormat: "1:1 Executive Sounding Board, Manager-as-Coach Workshops & Co-Design"
  },
  {
    id: "corporate-training",
    title: "Corporate Training Programs",
    subtitle: "Practical Programs for Managers, Managers of Managers & Organization Leaders",
    badge: "Corporate Training",
    icon: "book-open",
    description: "Practical, actionable corporate training drawn from more than two decades of corporate leadership across telecom, technology, and commercial P&L management. Delivered in English, Bangla, or bilingual blend.",
    deliverables: [
      "For Managers: Leading people, communication & feedback, negotiation, problem solving, Project Management Essentials, PMP exam prep, time management, sales & account management, performance management",
      "For Managers of Managers: Leading leaders, coaching skills, strategy to execution, cross-functional stakeholder management, advanced negotiation, PgMP & PfMP program/portfolio management, leading change",
      "For Organization Leaders: Leading through complexity, leadership team alignment, stakeholder trust & corporate affairs, ethical leadership, AI-era leadership, coaching culture, succession design",
      "Training Internal Champions: Training-of-trainers (TOT) and internal champions to scale learning across the enterprise"
    ],
    duration: "Half-day, Full-day, 3-Hour intensive, or Multi-Session Cohort",
    targetAudience: "Managers, Cross-Functional Managers, Department Heads & Senior Executives",
    deliverableFormat: "In-Person (Dhaka/Chattogram), Live Virtual, Hybrid, or In-House Custom"
  },
  {
    id: "consulting-advisory",
    title: "Consulting & Strategic Advisory",
    subtitle: "Leadership Team Building, Capability Roadmaps & Regulatory Strategy",
    badge: "Strategic Consulting",
    icon: "briefcase",
    description: "Strategic advisory offered to CXOs and Boards, focusing on leadership team performance, organizational capability roadmaps, public policy, and regulatory strategy in telecom and tech.",
    deliverables: [
      "Leadership Team Building: Role clarity, executive alignment around a shared agenda, and high-performance operating rhythms",
      "Leadership Capability Roadmap: Organization-wide diagnostic and customized coaching/training roadmap",
      "Stakeholder Relations & Corporate Affairs: Government, regulator, trade chamber, and public reputation engagement strategy",
      "Regulatory Strategy: Telecom, technology, spectrum access, Significant Market Power (SMP), infrastructure sharing, DFS licensing",
      "Purpose & Strategy Alignment: Connecting organizational purpose, stakeholder trust, and disciplined execution"
    ],
    duration: "3 - 12 Months Advisory Retainer / Project-Based",
    targetAudience: "CEOs, Managing Directors, Corporate Affairs Directors, Board Sponsors",
    deliverableFormat: "Executive Boardrooms, Strategic Roadmaps, Diagnostic Audits & Advisory"
  },
  {
    id: "working-with-boards",
    title: "Working with Boards",
    subtitle: "Board Governance Settle-in & Enterprise Leadership Sponsorship",
    badge: "Board Governance",
    icon: "shield",
    description: "MMR Rise works with board members as sponsors and champions of organization-wide leadership development. Supporting board members to settle into their role and contribute with strategic clarity.",
    deliverables: [
      "Board Member Role Settle-in: Helping newly appointed or transitioning board members settle into governance and contribute effectively",
      "Enterprise Development Sponsorship: Designing comprehensive coaching, training, and leadership programs sponsored directly by the Board",
      "Leadership Alignment & Succession: Acting as an independent sounding board on executive succession and leadership pipeline readiness",
      "External Standing & Governance: Strategic advisory on corporate affairs, ethics, and external stakeholder trust"
    ],
    duration: "Annual Board Advisory Retainer or Committee Sponsorship",
    targetAudience: "Board Members, Board Chairs, Nominations & Governance Committees",
    deliverableFormat: "Closed-Door Board Sessions, Committee Consultations & Executive Briefings"
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
    instructor: "Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM",
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
    instructor: "Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM",
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
    instructor: "Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM",
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
    instructor: "Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM",
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
    name: "Discovery Conversation",
    duration: "45 - 60 Minutes",
    price: 5000,
    currency: "BDT",
    badge: "Step 01: Discovery",
    description: "Initial confidential conversation to understand the leader, team dynamics, and business context, then agree on scope, outcomes, and measures of success."
  },
  {
    id: "pkg-executive",
    name: "1-on-1 Executive Coaching Session",
    duration: "60 - 90 Minutes",
    price: 15000,
    currency: "BDT",
    badge: "ICF Executive Coaching",
    description: "Confidential 1:1 structured engagement with Mukhlesur Rahman on leadership presence, decision-making, stakeholder influence, and leading the leadership team."
  },
  {
    id: "pkg-corporate",
    name: "Leadership Capability & Team Alignment Diagnostic",
    duration: "Half-Day (3 Hours)",
    price: 45000,
    currency: "BDT",
    badge: "Enterprise Advisory",
    description: "Organizational diagnostic assessing leadership team building, capability roadmaps, regulatory strategy, or in-house cohort design."
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
    description: "Watch Mukhlesur Rahman address 500+ corporate leaders on executive poise and navigating high-stakes business choices."
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
    category: "About MMR Rise",
    question: "What does MMR Rise do?",
    answer: "MMR Rise offers three services: coaching, training and consulting. We help leaders and organizations build leadership that performs and earns trust."
  },
  {
    category: "About MMR Rise",
    question: "Who is behind MMR Rise?",
    answer: "Mukhlesur Rahman, an ICF Professional Certified Coach (PCC) with PMP, PgMP, PfMP and DTM credentials. He has more than 20 years of corporate leadership across telecom and technology, including regulatory strategy, stakeholder relations, sales and P&L leadership at Banglalink and NEC Corporation. He also serves on the Steering Committee (Board) of Good Neighbors Bangladesh."
  },
  {
    category: "About MMR Rise",
    question: "Who do you work with?",
    answer: "Coaching: Boards, CXOs and emerging mid-level managers who aspire to be CXOs. Team coaching for a group of people or managers working toward a shared goal.\nTraining: Individual contributors, front-line staff, managers, cross-functional managers, managers of managers and organization leaders.\nConsulting: CXOs, and board members who sponsor leadership development in their organizations. We help set up the processes and organization for success and positive impact, transform the organization to keep pace with society, and find its purpose and align its values. Areas include corporate affairs, public policy advocacy and sales setup."
  },
  {
    category: "About MMR Rise",
    question: "What is the difference between coaching, training and consulting?",
    answer: "Coaching helps you find your own answers through questions, reflection and accountability. Training builds specific skills, and a shared understanding of values, in a group. Consulting gives you recommendations and a plan for a business or leadership challenge. Many clients combine them, for example a training program for a team with coaching for its leaders."
  },
  {
    category: "About MMR Rise",
    question: "Why choose MMR Rise over a trainer or coach without corporate experience?",
    answer: "Our work is grounded in real corporate leadership: running a country operation, negotiating major contracts, dealing with regulators and building leadership teams. Examples and exercises come from situations leaders actually face, including in Bangladesh."
  },
  {
    category: "Coaching",
    question: "What does executive coaching involve?",
    answer: "A confidential, structured series of one-to-one conversations on leadership presence, decision-making, stakeholder influence and leading your team. You set the goals, and the coach helps you think clearly, test your assumptions and follow through."
  },
  {
    category: "Coaching",
    question: "Is coaching the same as therapy or mentoring?",
    answer: "No. Coaching is not therapy or counseling. Mentoring means sharing experience and advice, while coaching mainly asks questions so you reach your own decisions. Both can be part of the work where it helps you."
  },
  {
    category: "Coaching",
    question: "Is coaching confidential?",
    answer: "Coaching follows the ICF Code of Ethics. When an organization sponsors the coaching, what is shared with the sponsor is agreed with you in advance, before the work starts. Sponsors never receive the content of coaching conversations; they see only the milestones agreed in advance."
  },
  {
    category: "Coaching",
    question: "How long does a coaching engagement last?",
    answer: "It depends on your goals. We agree the length and number of sessions in the discovery conversation, and review progress along the way. Engagements typically run from 3 months to 2 years. Each one-to-one session lasts about 45 to 60 minutes, and group coaching sessions can run 2 to 3 hours."
  },
  {
    category: "Coaching",
    question: "I am a mid-level manager who wants to become a CXO. Is coaching right for me?",
    answer: "Yes. The CXO Pathway Program is designed for leaders moving from functional expertise to enterprise leadership. It covers strategic thinking, executive presence, commercial and P&L understanding, stakeholder influence and personal leadership brand. Individual coaching is also available, and some organizations sponsor it for high-potential leaders."
  },
  {
    category: "Coaching",
    question: "I am an HR leader. How can you support me?",
    answer: "We offer coaching for HR leaders, support in designing talent and succession coaching for your high-potential leaders, and a Coaching Culture Program that builds coaching skills in your HR team and internal managers."
  },
  {
    category: "Coaching",
    question: "What is a CXO Peer Circle?",
    answer: "A small, confidential group of CXOs who meet regularly to think through real leadership challenges, facilitated by Mukhlesur Rahman."
  },
  {
    category: "Training",
    question: "What training topics do you offer?",
    answer: "Programs are grouped by audience:\n• Managers: leading people, communication and feedback, negotiation, problem solving, project management, PMP exam preparation, time and priority management, sales and account management, performance management, accountability and productivity\n• Managers of managers: leading leaders, coaching skills, strategy to execution, stakeholder management, advanced negotiation, program and portfolio management, decision-making, leading change\n• Organization leaders: leading through complexity, leadership team alignment, stakeholder trust and corporate affairs, ethical leadership, AI-era leadership, coaching culture, succession"
  },
  {
    category: "Training",
    question: "What formats do you offer?",
    answer: "Half-day and full-day workshops, shorter 3-hour sessions, online and hybrid delivery, multi-session cohort programs with optional coaching between sessions, and customized in-house programs. We also train internal trainers and champions."
  },
  {
    category: "Training",
    question: "Can the training be customized for our company?",
    answer: "Yes. In-house programs are built around your organization's needs, using your industry, your situation and your people's real challenges."
  },
  {
    category: "Training",
    question: "Do you train in Bangla or English?",
    answer: "Sessions can be run in English, Bangla or a mix, depending on your participants."
  },
  {
    category: "Training",
    question: "Do you offer PMP exam preparation?",
    answer: "Yes. Mukhlesur Rahman holds the PMP, PgMP and PfMP certifications and has run PMP preparation programs. Contact us for the current schedule and format. We also offer PgMP and PfMP cohorts for senior professionals who manage project managers or deliver specific benefits for their organization."
  },
  {
    category: "Training",
    question: "What is included in AI-era leadership training?",
    answer: "It helps leaders understand how AI may change organizations and decide what to do about it. It focuses on leadership awareness and decisions, not technical AI skills."
  },
  {
    category: "Training",
    question: "Can you run a program for a single team or a whole group of managers?",
    answer: "Yes. We can work with one team, a cohort of managers across departments, or a leadership-development program across the organization."
  },
  {
    category: "Training",
    question: "How do we know the training worked?",
    answer: "Before the program, we agree on the outcomes you want and how they will be measured. Multi-session programs with coaching between sessions help participants apply what they learned at work."
  },
  {
    category: "Consulting and Advisory",
    question: "What consulting do you offer?",
    answer: "• Leadership team building\n• Leadership capability roadmaps\n• Stakeholder relations and corporate affairs strategy\n• Regulatory strategy, particularly in telecom, technology and other regulated sectors\n• Purpose and strategy alignment\n• Organizational transformation"
  },
  {
    category: "Consulting and Advisory",
    question: "Do you work with boards?",
    answer: "Yes, as sponsors. Board members are welcome to start with a conversation about their organization's leadership needs. From there, we design coaching, training and leadership-team programs for the whole organization. We also help board members settle into their role and contribute more effectively."
  },
  {
    category: "Consulting and Advisory",
    question: "Can you help us build a leadership team?",
    answer: "Yes. This work covers defining roles, building alignment around a shared agenda and creating the working practices a leadership team needs to perform. It draws on experience building an internal leadership team and management pipeline as adviser to a business group's Chairman and CEO."
  },
  {
    category: "Working with MMR Rise",
    question: "How do we get started?",
    answer: "Start with a discovery conversation. We discuss your leaders, your team and your business context, then agree on scope, outcomes and measures of success. After that comes delivery, then a review of progress and next steps. To begin, fill in the contact form on this website or email contact@mmrrise.com."
  },
  {
    category: "Working with MMR Rise",
    question: "How much does it cost?",
    answer: "Fees depend on the service, the number of participants, the length of the engagement and the amount of customization. We share a clear proposal after the discovery conversation."
  },
  {
    category: "Working with MMR Rise",
    question: "Do you work in person or online?",
    answer: "Both. In-person sessions are held in Dhaka and Chattogram, and live online or hybrid sessions allow us to work with teams in other locations."
  },
  {
    category: "Working with MMR Rise",
    question: "Can individuals enroll, or only companies?",
    answer: "Individual leaders can engage a coach directly. Organizations, founders, SME owners and senior leaders can sponsor coaching or commission training and consulting programs."
  }
];

