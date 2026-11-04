import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, SpeakingTopic } from '../../services/api.service';

@Component({
  selector: 'app-speaking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Header -->
    <section class="bg-white dark:bg-gradient-to-b dark:from-brand-dark dark:via-brand-navy dark:to-brand-dark text-slate-900 dark:text-white py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-amber-500/10 dark:bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">
            Keynotes & Stage Presence
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel text-slate-900 dark:text-white">
            Speaking & Keynote Engagements
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Invigorating executive audiences, global summits, and enterprise leadership retreats with provocative insights, battle-tested stories, and actionable frameworks.
          </p>
        </div>
      </div>
    </section>

    <!-- Keynote Topics Grid -->
    <section class="py-20 bg-white dark:bg-brand-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            Signature Keynotes
          </span>
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white font-cinzel">Popular Keynote Presentations</h2>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Each speech is tailored precisely to your conference theme, corporate milestones, and audience seniority.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div *ngFor="let topic of topics" class="bg-white dark:bg-slate-900/90 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-executive flex flex-col justify-between hover:border-brand-accent transition">
            <div class="space-y-4">
              <span class="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                {{ topic.theme }}
              </span>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white font-cinzel leading-snug">
                {{ topic.title }}
              </h3>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {{ topic.description }}
              </p>
              
              <div class="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                <div class="text-slate-500 dark:text-slate-400">Ideal For: <strong class="text-slate-700 dark:text-slate-200">{{ topic.audience }}</strong></div>
                <div class="text-slate-500 dark:text-slate-400">Format: <strong class="text-brand-blue dark:text-sky-400">{{ topic.duration }}</strong></div>
              </div>
            </div>

            <div class="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
              <a href="#speaker-form" (click)="prefillTopic(topic.title)" class="text-xs font-bold text-brand-blue dark:text-brand-accent hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                Request This Keynote &rarr;
              </a>
            </div>
          </div>
        </div>

        <!-- Speaker Engagement Booking Form -->
        <div id="speaker-form" class="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div class="text-center mb-8 space-y-2">
            <span class="text-xs font-bold uppercase tracking-wider text-brand-accent bg-amber-500/10 dark:bg-slate-800 px-3 py-1 rounded-full border border-brand-accent/30">Speaker Inquiry</span>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white font-cinzel">Invite Mukhlasur Rahaman to Speak</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Provide your event specifics and our speaker bureau will confirm availability within 24 business hours.</p>
          </div>

          <div *ngIf="submitted" class="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 text-center space-y-2">
            <div class="text-emerald-700 dark:text-emerald-400 font-bold text-base">Keynote Request Received!</div>
            <p class="text-xs text-slate-600 dark:text-slate-300">Thank you. Our team will review your event details and contact you promptly.</p>
            <button (click)="submitted = false" class="text-xs font-bold text-brand-blue dark:text-sky-400 underline mt-2">Submit another inquiry</button>
          </div>

          <form *ngIf="!submitted" (ngSubmit)="submitSpeakerRequest()" class="space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Organizer / Contact Name *</label>
                <input type="text" [(ngModel)]="form.organizerName" name="organizerName" required
                       placeholder="e.g. Navid Chowdhury"
                       class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Organization / Host Entity *</label>
                <input type="text" [(ngModel)]="form.organization" name="organization" required
                       placeholder="e.g. Bangladesh Tech Summit"
                       class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Official Email *</label>
                <input type="email" [(ngModel)]="form.email" name="email" required
                       placeholder="organizer@summit.org"
                       class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone / WhatsApp *</label>
                <input type="tel" [(ngModel)]="form.phone" name="phone" required
                       placeholder="+880 1..."
                       class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Event Name *</label>
                <input type="text" [(ngModel)]="form.eventName" name="eventName" required
                       placeholder="Annual Leadership Conclave"
                       class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Event Date *</label>
                <input type="date" [(ngModel)]="form.eventDate" name="eventDate" required
                       class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Location / Venue</label>
                <input type="text" [(ngModel)]="form.location" name="location"
                       placeholder="Dhaka / Virtual"
                       class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred Keynote Topic</label>
              <input type="text" [(ngModel)]="form.topic" name="topic"
                     placeholder="Select or specify topic"
                     class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Additional Context / Audience Profile</label>
              <textarea rows="3" [(ngModel)]="form.notes" name="notes"
                        placeholder="Expected attendees, theme, VIP guests..."
                        class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm"></textarea>
            </div>

            <button type="submit" [disabled]="loading"
                    class="w-full py-4 rounded-xl bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg">
              <span *ngIf="!loading">Submit Speaker Invitation</span>
              <span *ngIf="loading">Sending Details...</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  `
})
export class SpeakingComponent implements OnInit {
  topics: SpeakingTopic[] = [];
  loading = false;
  submitted = false;

  form = {
    organizerName: '',
    email: '',
    phone: '',
    organization: '',
    eventName: '',
    eventDate: '',
    location: '',
    topic: '',
    notes: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getSpeakingTopics().subscribe({
      next: (data) => this.topics = data,
      error: (err) => console.error(err)
    });
  }

  prefillTopic(title: string): void {
    this.form.topic = title;
  }

  submitSpeakerRequest(): void {
    if (!this.form.organizerName || !this.form.email || !this.form.eventName || !this.form.eventDate) {
      alert('Please fill out the required fields.');
      return;
    }

    this.loading = true;
    this.api.requestSpeaking(this.form).subscribe({
      next: () => {
        this.loading = false;
        this.submitted = true;
      },
      error: () => {
        this.loading = false;
        alert('Failed to send request. Please try again.');
      }
    });
  }
}

