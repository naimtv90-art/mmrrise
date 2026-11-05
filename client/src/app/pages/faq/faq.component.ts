import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface FAQEntry {
  category: string;
  question: string;
  answer: string[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- Header Hero -->
    <section class="bg-white dark:bg-gradient-to-b dark:from-brand-dark dark:via-brand-navy dark:to-brand-dark text-slate-900 dark:text-white py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/15 dark:bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30 inline-block">
            Frequently Asked Questions
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel text-slate-900 dark:text-white">
            Answers for Leaders, HR Teams & Managers
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Everything you need to know about working with MMR Rise across executive coaching, corporate training, and strategic advisory.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="mt-8 max-w-2xl">
          <div class="relative">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (input)="filterFaqs()"
              placeholder="Search by keyword (e.g., PMP, coaching, CXO, confidential, pricing)..."
              class="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <svg class="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button
              *ngIf="searchQuery"
              (click)="clearSearch()"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              Clear
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Area -->
    <section class="py-16 bg-white dark:bg-brand-dark transition-colors duration-200 min-h-[50vh]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Category Filter Tabs -->
        <div class="flex flex-wrap gap-2 pb-8 border-b border-slate-200 dark:border-slate-800">
          <button
            *ngFor="let cat of categories"
            (click)="selectCategory(cat)"
            [ngClass]="{
              'bg-brand-navy text-white dark:bg-brand-accent dark:text-brand-dark font-bold shadow-md': selectedCategory === cat,
              'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700': selectedCategory !== cat
            }"
            class="px-4 py-2 rounded-xl text-xs tracking-wide transition-all duration-150">
            {{ cat }}
            <span class="ml-1 opacity-70 text-[10px]">
              ({{ getCountForCategory(cat) }})
            </span>
          </button>
        </div>

        <!-- FAQ Items List -->
        <div class="mt-8 space-y-4 max-w-4xl">
          
          <div *ngIf="filteredFaqs.length === 0" class="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <svg class="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">No questions found</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Try adjusting your search terms or select another category.</p>
            <button (click)="clearFilters()" class="mt-4 px-4 py-2 rounded-xl bg-brand-navy dark:bg-brand-accent text-white dark:text-brand-dark text-xs font-semibold">
              Reset Filters
            </button>
          </div>

          <div
            *ngFor="let item of filteredFaqs; let idx = index"
            class="rounded-2xl border transition-all duration-200 overflow-hidden"
            [ngClass]="{
              'border-brand-accent/50 bg-slate-50/70 dark:bg-slate-900/80 shadow-md ring-1 ring-brand-accent/20': isExpanded(idx),
              'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700': !isExpanded(idx)
            }">
            
            <button
              (click)="toggleFaq(idx)"
              class="w-full text-left p-6 flex items-start justify-between gap-4 focus:outline-none">
              <div class="space-y-1.5 flex-1">
                <span class="inline-block text-[11px] font-bold uppercase tracking-wider text-brand-blue dark:text-brand-accent">
                  {{ item.category }}
                </span>
                <h3 class="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-snug">
                  {{ item.question }}
                </h3>
              </div>
              <div class="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-transform duration-200"
                   [ngClass]="{'rotate-180 bg-brand-accent/20 text-brand-accent': isExpanded(idx)}">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            <div
              *ngIf="isExpanded(idx)"
              class="px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
              <p *ngFor="let p of item.answer" class="text-sm leading-relaxed" [ngClass]="{'pl-4 border-l-2 border-brand-accent/40 font-medium': p.startsWith('•')}">
                {{ p }}
              </p>
            </div>
          </div>

        </div>

        <!-- Contact & Direct Inquiry Banner -->
        <div class="mt-16 bg-gradient-to-br from-brand-navy via-slate-900 to-brand-navy text-white rounded-3xl p-8 sm:p-12 border border-brand-accent/30 shadow-xl relative overflow-hidden">
          <div class="absolute -right-10 -bottom-10 w-60 h-60 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="relative z-10 max-w-2xl space-y-4">
            <span class="text-xs uppercase tracking-widest font-bold text-brand-accent">Have A Question Not Answered Here?</span>
            <h2 class="text-2xl sm:text-3xl font-bold font-cinzel">Start a Discovery Conversation with MMR Rise</h2>
            <p class="text-sm text-slate-300 font-light leading-relaxed">
              We discuss your leaders, your team, and your business context, then agree on scope, outcomes, and measures of success.
            </p>
            <div class="flex flex-wrap gap-4 pt-2">
              <a routerLink="/contact" class="px-6 py-3 rounded-xl bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-wider hover:opacity-90 transition shadow-lg inline-flex items-center gap-2">
                Send An Inquiry Form
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <a href="mailto:contact@mmrrise.com" class="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider transition border border-white/20 inline-flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                contact&#64;mmrrise.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class FaqComponent implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = 'All';
  expandedIndices: Set<number> = new Set([0]); // first open by default

  categories: string[] = [
    'All',
    'About MMR Rise',
    'Coaching',
    'Training',
    'Consulting and Advisory',
    'Working with MMR Rise'
  ];

  faqs: FAQEntry[] = [
    // About MMR Rise
    {
      category: 'About MMR Rise',
      question: 'What does MMR Rise do?',
      answer: [
        'MMR Rise offers three services: coaching, training and consulting. We help leaders and organizations build leadership that performs and earns trust.'
      ]
    },
    {
      category: 'About MMR Rise',
      question: 'Who is behind MMR Rise?',
      answer: [
        'Mukhlesur Rahman, an ICF Professional Certified Coach (PCC) with PMP, PgMP, PfMP and DTM credentials.',
        'He has more than 20 years of corporate leadership across telecom and technology, including regulatory strategy, stakeholder relations, sales and P&L leadership at Banglalink and NEC Corporation. He also serves on the Steering Committee (Board) of Good Neighbors Bangladesh.'
      ]
    },
    {
      category: 'About MMR Rise',
      question: 'Who do you work with?',
      answer: [
        '• Coaching: Boards, CXOs and emerging mid-level managers who aspire to be CXOs. Team coaching for a group of people or managers working toward a shared goal.',
        '• Training: Individual contributors, front-line staff, managers, cross-functional managers, managers of managers and organization leaders.',
        '• Consulting: CXOs, and board members who sponsor leadership development in their organizations. We help set up the processes and organization for success and positive impact, transform the organization to keep pace with society, and find its purpose and align its values. Areas include corporate affairs, public policy advocacy and sales setup.'
      ]
    },
    {
      category: 'About MMR Rise',
      question: 'What is the difference between coaching, training and consulting?',
      answer: [
        'Coaching helps you find your own answers through questions, reflection and accountability.',
        'Training builds specific skills, and a shared understanding of values, in a group.',
        'Consulting gives you recommendations and a plan for a business or leadership challenge.',
        'Many clients combine them, for example a training program for a team with coaching for its leaders.'
      ]
    },
    {
      category: 'About MMR Rise',
      question: 'Why choose MMR Rise over a trainer or coach without corporate experience?',
      answer: [
        'Our work is grounded in real corporate leadership: running a country operation, negotiating major contracts, dealing with regulators and building leadership teams. Examples and exercises come from situations leaders actually face, including in Bangladesh.'
      ]
    },

    // Coaching
    {
      category: 'Coaching',
      question: 'What does executive coaching involve?',
      answer: [
        'A confidential, structured series of one-to-one conversations on leadership presence, decision-making, stakeholder influence and leading your team. You set the goals, and the coach helps you think clearly, test your assumptions and follow through.'
      ]
    },
    {
      category: 'Coaching',
      question: 'Is coaching the same as therapy or mentoring?',
      answer: [
        'No. Coaching is not therapy or counseling. Mentoring means sharing experience and advice, while coaching mainly asks questions so you reach your own decisions. Both can be part of the work where it helps you.'
      ]
    },
    {
      category: 'Coaching',
      question: 'Is coaching confidential?',
      answer: [
        'Coaching follows the ICF Code of Ethics. When an organization sponsors the coaching, what is shared with the sponsor is agreed with you in advance, before the work starts. Sponsors never receive the content of coaching conversations; they see only the milestones agreed in advance.'
      ]
    },
    {
      category: 'Coaching',
      question: 'How long does a coaching engagement last?',
      answer: [
        'It depends on your goals. We agree the length and number of sessions in the discovery conversation, and review progress along the way. Engagements typically run from 3 months to 2 years. Each one-to-one session lasts about 45 to 60 minutes, and group coaching sessions can run 2 to 3 hours.'
      ]
    },
    {
      category: 'Coaching',
      question: 'I am a mid-level manager who wants to become a CXO. Is coaching right for me?',
      answer: [
        'Yes. The CXO Pathway Program is designed for leaders moving from functional expertise to enterprise leadership. It covers strategic thinking, executive presence, commercial and P&L understanding, stakeholder influence and personal leadership brand.',
        'Individual coaching is also available, and some organizations sponsor it for high-potential leaders.'
      ]
    },
    {
      category: 'Coaching',
      question: 'I am an HR leader. How can you support me?',
      answer: [
        'We offer coaching for HR leaders, support in designing talent and succession coaching for your high-potential leaders, and a Coaching Culture Program that builds coaching skills in your HR team and internal managers.'
      ]
    },
    {
      category: 'Coaching',
      question: 'What is a CXO Peer Circle?',
      answer: [
        'A small, confidential group of CXOs who meet regularly to think through real leadership challenges, facilitated by Mukhlesur Rahman.'
      ]
    },

    // Training
    {
      category: 'Training',
      question: 'What training topics do you offer?',
      answer: [
        'Programs are grouped by audience:',
        '• Managers: leading people, communication and feedback, negotiation, problem solving, project management, PMP exam preparation, time and priority management, sales and account management, performance management, accountability and productivity.',
        '• Managers of managers: leading leaders, coaching skills, strategy to execution, stakeholder management, advanced negotiation, program and portfolio management, decision-making, leading change.',
        '• Organization leaders: leading through complexity, leadership team alignment, stakeholder trust and corporate affairs, ethical leadership, AI-era leadership, coaching culture, succession.'
      ]
    },
    {
      category: 'Training',
      question: 'What formats do you offer?',
      answer: [
        'Half-day and full-day workshops, shorter 3-hour sessions, online and hybrid delivery, multi-session cohort programs with optional coaching between sessions, and customized in-house programs. We also train internal trainers and champions.'
      ]
    },
    {
      category: 'Training',
      question: 'Can the training be customized for our company?',
      answer: [
        'Yes. In-house programs are built around your organization\'s needs, using your industry, your situation and your people\'s real challenges.'
      ]
    },
    {
      category: 'Training',
      question: 'Do you train in Bangla or English?',
      answer: [
        'Sessions can be run in English, Bangla or a mix, depending on your participants.'
      ]
    },
    {
      category: 'Training',
      question: 'Do you offer PMP exam preparation?',
      answer: [
        'Yes. Mukhlesur Rahman holds the PMP, PgMP and PfMP certifications and has run PMP preparation programs. Contact us for the current schedule and format.',
        'We also offer PgMP and PfMP cohorts for senior professionals who manage project managers or deliver specific benefits for their organization.'
      ]
    },
    {
      category: 'Training',
      question: 'What is included in AI-era leadership training?',
      answer: [
        'It helps leaders understand how AI may change organizations and decide what to do about it. It focuses on leadership awareness and decisions, not technical AI skills.'
      ]
    },
    {
      category: 'Training',
      question: 'Can you run a program for a single team or a whole group of managers?',
      answer: [
        'Yes. We can work with one team, a cohort of managers across departments, or a leadership-development program across the organization.'
      ]
    },
    {
      category: 'Training',
      question: 'How do we know the training worked?',
      answer: [
        'Before the program, we agree on the outcomes you want and how they will be measured. Multi-session programs with coaching between sessions help participants apply what they learned at work.'
      ]
    },

    // Consulting and Advisory
    {
      category: 'Consulting and Advisory',
      question: 'What consulting do you offer?',
      answer: [
        '• Leadership team building',
        '• Leadership capability roadmaps',
        '• Stakeholder relations and corporate affairs strategy',
        '• Regulatory strategy, particularly in telecom, technology and other regulated sectors',
        '• Purpose and strategy alignment',
        '• Organizational transformation'
      ]
    },
    {
      category: 'Consulting and Advisory',
      question: 'Do you work with boards?',
      answer: [
        'Yes, as sponsors. Board members are welcome to start with a conversation about their organization\'s leadership needs. From there, we design coaching, training and leadership-team programs for the whole organization. We also help board members settle into their role and contribute more effectively.'
      ]
    },
    {
      category: 'Consulting and Advisory',
      question: 'Can you help us build a leadership team?',
      answer: [
        'Yes. This work covers defining roles, building alignment around a shared agenda and creating the working practices a leadership team needs to perform. It draws on experience building an internal leadership team and management pipeline as adviser to a business group\'s Chairman and CEO.'
      ]
    },

    // Working with MMR Rise
    {
      category: 'Working with MMR Rise',
      question: 'How do we get started?',
      answer: [
        'Start with a discovery conversation. We discuss your leaders, your team and your business context, then agree on scope, outcomes and measures of success. After that comes delivery, then a review of progress and next steps.',
        'To begin, fill in the contact form on this website or email contact@mmrrise.com.'
      ]
    },
    {
      category: 'Working with MMR Rise',
      question: 'How much does it cost?',
      answer: [
        'Fees depend on the service, the number of participants, the length of the engagement and the amount of customization. We share a clear proposal after the discovery conversation.'
      ]
    },
    {
      category: 'Working with MMR Rise',
      question: 'Do you work in person or online?',
      answer: [
        'Both. In-person sessions are held in Dhaka and Chattogram, and live online or hybrid sessions allow us to work with teams in other locations.'
      ]
    },
    {
      category: 'Working with MMR Rise',
      question: 'Can individuals enroll, or only companies?',
      answer: [
        'Individual leaders can engage a coach directly. Organizations, founders, SME owners and senior leaders can sponsor coaching or commission training and consulting programs.'
      ]
    }
  ];

  filteredFaqs: FAQEntry[] = [];

  ngOnInit(): void {
    this.filterFaqs();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterFaqs();
  }

  filterFaqs(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredFaqs = this.faqs.filter(item => {
      const matchCat = this.selectedCategory === 'All' || item.category === this.selectedCategory;
      if (!matchCat) return false;
      if (!query) return true;
      const questionMatch = item.question.toLowerCase().includes(query);
      const answerMatch = item.answer.some(a => a.toLowerCase().includes(query));
      return questionMatch || answerMatch;
    });
    // Open the first result automatically if searching or filtering
    this.expandedIndices.clear();
    if (this.filteredFaqs.length > 0) {
      this.expandedIndices.add(0);
    }
  }

  toggleFaq(index: number): void {
    if (this.expandedIndices.has(index)) {
      this.expandedIndices.delete(index);
    } else {
      this.expandedIndices.add(index);
    }
  }

  isExpanded(index: number): boolean {
    return this.expandedIndices.has(index);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterFaqs();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'All';
    this.filterFaqs();
  }

  getCountForCategory(category: string): number {
    if (category === 'All') return this.faqs.length;
    return this.faqs.filter(f => f.category === category).length;
  }
}
