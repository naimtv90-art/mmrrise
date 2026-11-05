import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService, FaqItem } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- Header Hero -->
    <section class="bg-white dark:bg-gradient-to-b dark:from-brand-dark dark:via-brand-navy dark:to-brand-dark text-slate-900 dark:text-white py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/15 dark:bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">
            Get In Touch
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel text-slate-900 dark:text-white">
            Contact & Frequently Asked Questions
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Reach out to Mukhlasur Rahaman's executive desk for corporate advisory, training proposals, or explore answers to common inquiries below.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact & Info Section -->
    <section class="py-20 bg-white dark:bg-brand-dark transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Left Column: Contact Form -->
          <div class="lg:col-span-7 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div class="mb-8 space-y-2">
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-cinzel">Send An Executive Message</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Fill in the form below and our team will get back to you within 24 hours.</p>
            </div>

            <!-- Submission notification -->
            <div *ngIf="submitted" class="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center space-y-2 mb-6">
              <div class="text-emerald-700 dark:text-emerald-400 font-bold text-base">Message Sent Successfully!</div>
              <p class="text-xs text-slate-600 dark:text-slate-300">Thank you for reaching out. Mukhlasur Rahaman’s executive office has received your inquiry.</p>
              <button (click)="submitted = false" class="text-xs font-bold text-brand-blue underline mt-2">Send another note</button>
            </div>

            <form *ngIf="!submitted" (ngSubmit)="sendContact()" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                  <input type="text" [(ngModel)]="form.name" name="name" required
                         placeholder="e.g. Kamal Hossain"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500">
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Email Address *</label>
                  <input type="email" [(ngModel)]="form.email" name="email" required
                         placeholder="kamal@organization.com"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone / WhatsApp Number</label>
                  <input type="tel" [(ngModel)]="form.phone" name="phone"
                         placeholder="+880 1714 113030"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500">
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Service Interest</label>
                  <select [(ngModel)]="form.serviceInterest" name="serviceInterest"
                          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                    <option value="General">General Inquiry</option>
                    <option value="Coaching for CXOs">Coaching for CXOs (1:1, Transition, Peer Circle)</option>
                    <option value="CXO Pathway">CXO Pathway Program (Rising Managers)</option>
                    <option value="Coaching for HR">Coaching for HR Leaders & Culture</option>
                    <option value="Corporate Training">Corporate Training Programs</option>
                    <option value="Consulting & Advisory">Consulting & Strategic Advisory</option>
                    <option value="Working with Boards">Working with Boards</option>
                    <option value="Keynote Speaking">Keynote Speech Invitation</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                <input type="text" [(ngModel)]="form.subject" name="subject"
                       placeholder="e.g. Enterprise Leadership Alignment for Q1 2027"
                       class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500">
              </div>

              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Detailed Message *</label>
                <textarea rows="4" [(ngModel)]="form.message" name="message" required
                          placeholder="How can Mukhlesur Rahman and MMR Rise support you or your organization?"
                          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"></textarea>
              </div>

              <button type="submit" [disabled]="loading"
                      class="w-full py-4 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-gold-glow">
                <span *ngIf="!loading">Send Message &rarr;</span>
                <span *ngIf="loading">Sending...</span>
              </button>
            </form>
          </div>

          <!-- Right Column: Executive Office Coordinates -->
          <div class="lg:col-span-5 space-y-6">
            <div class="bg-slate-50 dark:bg-brand-navy text-slate-900 dark:text-white rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-xl bg-slate-200 dark:bg-white/10 p-1.5 border border-slate-300 dark:border-white/20 flex items-center justify-center">
                  <img src="logo.png" alt="MMR Rise Logo" class="w-full h-full object-contain">
                </div>
                <div>
                  <span class="text-xs font-bold uppercase tracking-widest text-brand-accent">Executive Office</span>
                  <h3 class="text-2xl font-bold font-cinzel text-slate-900 dark:text-white">MMR Rise</h3>
                  <div class="text-[11px] text-slate-500 dark:text-slate-400">Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM</div>
                </div>
              </div>

              <div class="space-y-4 text-xs">
                <div class="flex items-start gap-3">
                  <span class="text-brand-accent text-base">📍</span>
                  <div>
                    <span class="text-slate-500 dark:text-slate-400 block">Locations:</span>
                    <span class="text-slate-900 dark:text-white font-medium">Dhaka & Chattogram (In-person) &bull; Global (Live Online)</span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-brand-accent text-base">✉</span>
                  <div>
                    <span class="text-slate-500 dark:text-slate-400 block">Direct Email:</span>
                    <a href="mailto:mmrshohagbd@gmail.com" class="text-brand-accent font-medium hover:underline">mmrshohagbd&#64;gmail.com</a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-brand-accent text-base">📞</span>
                  <div>
                    <span class="text-slate-500 dark:text-slate-400 block">Direct Phone / WhatsApp:</span>
                    <a href="tel:+8801714113030" class="text-slate-900 dark:text-white font-medium hover:underline">+8801714113030</a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-brand-accent text-base">🔗</span>
                  <div>
                    <span class="text-slate-500 dark:text-slate-400 block">LinkedIn:</span>
                    <a href="https://www.linkedin.com/in/coachmmr" target="_blank" rel="noopener" class="text-brand-accent font-medium hover:underline">linkedin.com/in/coachmmr</a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-brand-accent text-base">🕒</span>
                  <div>
                    <span class="text-slate-500 dark:text-slate-400 block">Consultation Hours:</span>
                    <span class="text-slate-900 dark:text-white font-medium">Sunday &ndash; Thursday: 9:00 AM &ndash; 6:00 PM (BST)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Direct Booking Prompt -->
            <div class="bg-gradient-to-br from-brand-accent/10 via-white dark:via-brand-surface to-brand-blue/5 border border-brand-accent/30 rounded-3xl p-6 text-center space-y-3 shadow-sm">
              <h4 class="font-bold text-slate-900 dark:text-white text-sm">Need Direct Strategic Advice Immediately?</h4>
              <p class="text-xs text-slate-600 dark:text-slate-300">
                Skip the back-and-forth email scheduling and secure a direct paid discovery or consultation session with Mukhlesur Rahman on our calendar.
              </p>
              <a routerLink="/booking" class="inline-block px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-glow transition">
                Go to Consultation Booking Calendar
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION -->
    <section id="faq" class="py-20 bg-white dark:bg-brand-dark border-t border-slate-200 dark:border-slate-800 scroll-mt-20 transition-colors duration-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-14 space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 dark:bg-brand-blue/10 px-3 py-1 rounded-full border border-blue-200 dark:border-brand-blue/30">
            Everything You Need To Know
          </span>
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white font-cinzel">Frequently Asked Questions (FAQ)</h2>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Answers to key questions regarding our consulting retainers, coaching formats, and courses.</p>
        </div>

        <div class="space-y-4">
          <div *ngFor="let faq of faqs; let i = index"
               class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition">
            
            <button (click)="toggleFaq(i)"
                    class="w-full px-6 py-5 text-left flex items-center justify-between text-slate-900 dark:text-white font-semibold text-sm hover:text-brand-blue transition">
              <span class="pr-4">{{ faq.question }}</span>
              <span class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                {{ activeFaqIndex === i ? '−' : '+' }}
              </span>
            </button>

            <div *ngIf="activeFaqIndex === i" class="px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
              <span class="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 dark:bg-brand-blue/20 px-2 py-0.5 rounded mb-2">
                {{ faq.category }}
              </span>
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class ContactComponent implements OnInit {
  faqs: FaqItem[] = [];
  activeFaqIndex: number | null = 0;
  loading = false;
  submitted = false;

  form = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    serviceInterest: 'General',
    message: ''
  };

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.api.getFaqs().subscribe({
      next: (data) => this.faqs = data,
      error: (err) => console.error(err)
    });

    this.route.fragment.subscribe(frag => {
      if (frag === 'faq') {
        setTimeout(() => {
          const el = document.getElementById('faq');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    });
  }

  toggleFaq(index: number): void {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }

  sendContact(): void {
    this.loading = true;
    this.api.submitContact(this.form).subscribe({
      next: () => {
        this.loading = false;
        this.submitted = true;
        this.form = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          serviceInterest: 'General',
          message: ''
        };
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Could not submit inquiry. Please email us directly.');
      }
    });
  }
}
