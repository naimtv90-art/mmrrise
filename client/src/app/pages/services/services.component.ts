import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService, ServiceItem } from '../../services/api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Header -->
    <section class="bg-white dark:bg-gradient-to-b dark:from-brand-dark dark:via-brand-navy dark:to-brand-dark text-slate-900 dark:text-white py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/15 dark:bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">
            Advisory & Delivery Frameworks
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel text-slate-900 dark:text-white">
            Consulting & Coaching Services
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            All Service Delivery Information — rigorous corporate advisory, PMO infrastructure, enterprise transformation, and bespoke 1-on-1 executive coaching.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Deep-Dive Section -->
    <section class="py-20 bg-white dark:bg-brand-dark transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div *ngFor="let s of services; let idx = index" [id]="s.id"
             class="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-executive p-8 sm:p-12 transition-all hover:border-brand-accent/60 scroll-mt-28">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left Info Column -->
            <div class="lg:col-span-7 space-y-5">
              <div class="flex items-center gap-3">
                <span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50">
                  {{ s.badge }}
                </span>
                <span class="text-xs font-medium text-slate-400">Pillar 0{{ idx + 1 }}</span>
              </div>

              <div>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-cinzel">
                  {{ s.title }}
                </h2>
                <p class="text-sm font-semibold text-brand-blue mt-1">
                  {{ s.subtitle }}
                </p>
              </div>

              <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {{ s.description }}
              </p>

              <!-- Deliverables Breakdown -->
              <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 class="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white mb-3">Core Deliverables & Scope of Work:</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div *ngFor="let item of s.deliverables" class="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60">
                    <span class="text-brand-accent font-black text-sm">✔</span>
                    <span>{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Engagement Details Card -->
            <div class="lg:col-span-5 bg-slate-50 dark:bg-gradient-to-b dark:from-brand-navy dark:to-brand-dark text-slate-900 dark:text-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl border border-slate-200 dark:border-slate-700">
              <h4 class="text-xs uppercase tracking-widest font-bold text-brand-accent">Service Delivery Specifications</h4>
              
              <div class="space-y-4 text-xs">
                <div>
                  <span class="text-slate-500 dark:text-slate-400 block mb-1">Engagement Duration:</span>
                  <span class="text-slate-900 dark:text-white font-semibold text-sm">{{ s.duration }}</span>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-800 pt-3">
                  <span class="text-slate-500 dark:text-slate-400 block mb-1">Target Stakeholders:</span>
                  <span class="text-slate-900 dark:text-white font-semibold">{{ s.targetAudience }}</span>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-800 pt-3">
                  <span class="text-slate-500 dark:text-slate-400 block mb-1">Delivery Modality:</span>
                  <span class="text-brand-accent font-semibold">{{ s.deliverableFormat }}</span>
                </div>
              </div>

              <div class="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <a [routerLink]="['/booking']" [queryParams]="{ service: s.id, title: s.title }"
                   class="w-full block text-center py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-glow transition">
                  Book Initial Consultation
                </a>
                <a routerLink="/contact"
                   class="w-full block text-center py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs transition">
                  Request Custom RFP / Corporate Proposal
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

    <!-- FAQ Anchor Banner -->
    <section class="py-14 bg-white dark:bg-brand-dark border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white font-cinzel">Questions About Our Delivery Model?</h3>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Check our frequently asked questions on our advisory retainers, confidentiality agreements, and transformation timelines.
        </p>
        <div class="pt-2">
          <a routerLink="/contact" fragment="faq" class="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider hover:underline">
            View Frequently Asked Questions (FAQ) &rarr;
          </a>
        </div>
      </div>
    </section>
  `
})
export class ServicesComponent implements OnInit {
  services: ServiceItem[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.api.getServices().subscribe({
      next: (data) => {
        this.services = data;
        // Scroll to fragment if present
        this.route.fragment.subscribe(frag => {
          if (frag) {
            setTimeout(() => {
              const element = document.getElementById(frag);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }
        });
      },
      error: (err) => console.error(err)
    });
  }
}
