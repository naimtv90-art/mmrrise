import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, FaqItem } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Header -->
    <section class="bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark text-white py-16 lg:py-24 border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">
            Get In Touch
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel">
            Contact & Frequently Asked Questions
          </h1>
          <p class="text-lg text-slate-300 font-light leading-relaxed">
            Reach out to Mukhlasur Rahaman's executive desk for corporate advisory, training proposals, or explore answers to common inquiries below.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact & Info Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Left Column: Contact Form -->
          <div class="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div class="mb-8 space-y-2">
              <h2 class="text-2xl font-bold text-slate-900 font-cinzel">Send An Executive Message</h2>
              <p class="text-xs text-slate-500">Fill in the form below and our team will get back to you within 24 hours.</p>
            </div>

            <!-- Submission notification -->
            <div *ngIf="submitted" class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2 mb-6">
              <div class="text-emerald-700 font-bold text-base">Message Sent Successfully!</div>
              <p class="text-xs text-slate-600">Thank you for reaching out. Mukhlasur Rahaman’s executive office has received your inquiry.</p>
              <button (click)="submitted = false" class="text-xs font-bold text-brand-blue underline mt-2">Send another note</button>
            </div>

            <form *ngIf="!submitted" (ngSubmit)="sendContact()" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Your Name *</label>
                  <input type="text" [(ngModel)]="form.name" name="name" required
                         placeholder="e.g. Kamal Hossain"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white">
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Your Email Address *</label>
                  <input type="email" [(ngModel)]="form.email" name="email" required
                         placeholder="kamal@organization.com"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input type="tel" [(ngModel)]="form.phone" name="phone"
                         placeholder="+880 1..."
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white">
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Area of Interest</label>
                  <select [(ngModel)]="form.serviceInterest" name="serviceInterest"
                          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white">
                    <option value="Consulting">Strategic Consulting</option>
                    <option value="Organizational Transformation">Organizational Transformation</option>
                    <option value="Project Management Consultancy">Project Management Consultancy (PMO)</option>
                    <option value="Executive Coaching">Executive Coaching (1-on-1)</option>
                    <option value="Organizational Coaching">Organizational Coaching</option>
                    <option value="Course / Training">Course Sales & Training</option>
                    <option value="Speaking Engagement">Speaking / Keynote</option>
                    <option value="Other">Other General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block font-semibold text-slate-700 mb-1">Subject</label>
                <input type="text" [(ngModel)]="form.subject" name="subject"
                       placeholder="e.g. Executive Retainer Inquiry"
                       class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white">
              </div>

              <div>
                <label class="block font-semibold text-slate-700 mb-1">Message *</label>
                <textarea rows="4" [(ngModel)]="form.message" name="message" required
                          placeholder="How can Mukhlasur Rahaman and MMR Rise support you or your organization?"
                          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white"></textarea>
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
            <div class="bg-brand-navy text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-6">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-xl bg-white/10 p-1.5 border border-white/20 flex items-center justify-center">
                  <img src="logo.png" alt="MMR Rise Logo" class="w-full h-full object-contain">
                </div>
                <div>
                  <span class="text-xs font-bold uppercase tracking-widest text-brand-accent">Executive Office</span>
                  <h3 class="text-2xl font-bold font-cinzel text-white">MMR Rise</h3>
                </div>
              </div>

              <div class="space-y-4 text-xs">
                <div class="flex items-start gap-3">
                  <span class="text-brand-accent text-base">📍</span>
                  <div>
                    <span class="text-slate-400 block">Location:</span>
                    <span class="text-white font-medium">Gulshan-2, Dhaka-1212, Bangladesh</span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-brand-accent text-base">✉</span>
                  <div>
                    <span class="text-slate-400 block">Direct Email:</span>
                    <a href="mailto:contact@mmrrise.com" class="text-brand-accent font-medium hover:underline">contact&#64;mmrrise.com</a>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-brand-accent text-base">📞</span>
                  <div>
                    <span class="text-slate-400 block">Office Phone / WhatsApp:</span>
                    <span class="text-white font-medium">+880 1711 000000</span>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-brand-accent text-base">🕒</span>
                  <div>
                    <span class="text-slate-400 block">Consultation Hours:</span>
                    <span class="text-white font-medium">Sunday &ndash; Thursday: 9:00 AM &ndash; 6:00 PM (BST)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Direct Booking Prompt -->
            <div class="bg-gradient-to-br from-brand-accent/15 via-brand-surface to-brand-blue/10 border border-brand-accent/30 rounded-3xl p-6 text-center space-y-3 shadow-sm">
              <h4 class="font-bold text-slate-900 text-sm">Need Direct Strategic Advice Immediately?</h4>
              <p class="text-xs text-slate-600">
                Skip the back-and-forth email scheduling and secure a direct paid consultation slot with Mukhlasur Rahaman on our live calendar.
              </p>
              <a routerLink="/booking" class="inline-block px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-glow transition">
                Go to Paid Booking Calendar
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION -->
    <section id="faq" class="py-20 bg-slate-50 border-t border-slate-200 scroll-mt-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-14 space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Everything You Need To Know
          </span>
          <h2 class="text-3xl font-extrabold text-slate-900 font-cinzel">Frequently Asked Questions (FAQ)</h2>
          <p class="text-xs sm:text-sm text-slate-600">Answers to key questions regarding our consulting retainers, coaching formats, and courses.</p>
        </div>

        <div class="space-y-4">
          <div *ngFor="let faq of faqs; let i = index"
               class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition">
            
            <button (click)="toggleFaq(i)"
                    class="w-full px-6 py-5 text-left flex items-center justify-between text-slate-900 font-semibold text-sm hover:text-brand-blue transition">
              <span class="pr-4">{{ faq.question }}</span>
              <span class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                {{ activeFaqIndex === i ? '−' : '+' }}
              </span>
            </button>

            <div *ngIf="activeFaqIndex === i" class="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              <span class="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-2 py-0.5 rounded mb-2">
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
  activeFaqIndex: number | null = 0; // Open first item by default
  loading = false;
  submitted = false;

  form = {
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'Consulting',
    subject: '',
    message: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getFaqs().subscribe({
      next: (data) => this.faqs = data,
      error: (err) => console.error(err)
    });
  }

  toggleFaq(index: number): void {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }

  sendContact(): void {
    if (!this.form.name || !this.form.email || !this.form.message) {
      alert('Please fill out all required fields.');
      return;
    }

    this.loading = true;
    this.api.submitContact(this.form).subscribe({
      next: () => {
        this.loading = false;
        this.submitted = true;
      },
      error: () => {
        this.loading = false;
        alert('Failed to send message. Please try again.');
      }
    });
  }
}

