import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService, ServiceItem } from '../../services/api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Header Hero -->
    <section class="bg-white dark:bg-gradient-to-b dark:from-brand-dark dark:via-brand-navy dark:to-brand-dark text-slate-900 dark:text-white py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/15 dark:bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30 inline-block">
            MMR Rise &bull; Service Catalog
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel text-slate-900 dark:text-white">
            Coaching, Training & Strategic Consulting
          </h1>
          <p class="text-xl text-brand-accent font-medium italic">
            &ldquo;Organizations grow best when people grow with them.&rdquo;
          </p>
          <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            MMR Rise partners with CXOs, rising managers, and HR leaders to build leadership that performs and earns trust. All three service lines are grounded in more than two decades of real corporate leadership across telecom and technology, including regulatory strategy, stakeholder relations, commercial sales, and full P&L accountability.
          </p>

          <!-- Quick Jump Navigation Pills -->
          <div class="pt-4 flex flex-wrap gap-2 text-xs">
            <a href="#coaching-cxos" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-accent hover:text-brand-dark font-semibold text-slate-700 dark:text-slate-300 transition border border-slate-200 dark:border-slate-700">
              1. Coaching (CXOs, Rising Leaders, HR)
            </a>
            <a href="#corporate-training" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-accent hover:text-brand-dark font-semibold text-slate-700 dark:text-slate-300 transition border border-slate-200 dark:border-slate-700">
              2. Corporate Training Programs
            </a>
            <a href="#consulting-advisory" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-accent hover:text-brand-dark font-semibold text-slate-700 dark:text-slate-300 transition border border-slate-200 dark:border-slate-700">
              3. Consulting & Advisory
            </a>
            <a href="#working-with-boards" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-accent hover:text-brand-dark font-semibold text-slate-700 dark:text-slate-300 transition border border-slate-200 dark:border-slate-700">
              4. Working with Boards
            </a>
            <a href="#how-we-work" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brand-accent hover:text-brand-dark font-semibold text-slate-700 dark:text-slate-300 transition border border-slate-200 dark:border-slate-700">
              5. How We Work
            </a>
          </div>
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
                <span class="text-xs font-medium text-slate-400">Service Line 0{{ idx + 1 }}</span>
              </div>

              <div>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-cinzel">
                  {{ s.title }}
                </h2>
                <p class="text-sm font-semibold text-brand-blue dark:text-brand-accent mt-1">
                  {{ s.subtitle }}
                </p>
              </div>

              <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {{ s.description }}
              </p>

              <!-- Deliverables Breakdown -->
              <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 class="text-xs uppercase font-bold tracking-wider text-slate-900 dark:text-white mb-3">Core Scope & Key Programs:</h4>
                <div class="space-y-2.5">
                  <div *ngFor="let item of s.deliverables" class="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/60 leading-relaxed">
                    <span class="text-brand-accent font-black text-sm mt-0.5">✔</span>
                    <span>{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Engagement Details Card -->
            <div class="lg:col-span-5 bg-slate-50 dark:bg-gradient-to-b dark:from-brand-navy dark:to-brand-dark text-slate-900 dark:text-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl border border-slate-200 dark:border-slate-700">
              <h4 class="text-xs uppercase tracking-widest font-bold text-brand-accent">Engagement Specifications</h4>
              
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
                <div class="border-t border-slate-200 dark:border-slate-800 pt-3">
                  <span class="text-slate-500 dark:text-slate-400 block mb-1">Ethics & Standards:</span>
                  <span class="text-slate-900 dark:text-white font-semibold">ICF Code of Ethics & Strict Confidentiality</span>
                </div>
              </div>

              <div class="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <a [routerLink]="['/booking']" [queryParams]="{ service: s.id, title: s.title }"
                   class="w-full block text-center py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-glow transition">
                  Book Initial Discovery Call
                </a>
                <a routerLink="/contact"
                   class="w-full block text-center py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs transition">
                  Request Custom Proposal / In-House Cohort
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

    <!-- SECTION: HOW WE WORK (4-Step Engagement Architecture) -->
    <section id="how-we-work" class="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 scroll-mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/15 dark:bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30 inline-block">
            Engagement Methodology
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-cinzel">
            How We Work
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            A disciplined, four-stage engagement lifecycle ensuring strategic alignment, measurable outcomes, and lasting transformation.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <!-- Step 1 -->
          <div class="bg-white dark:bg-brand-navy p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-brand-accent transition">
            <div class="text-4xl font-extrabold font-cinzel text-brand-accent mb-3">01</div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Discovery</h3>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              In-depth discovery conversation to understand the leader, the leadership team, strategic challenges, and the broader business context.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="bg-white dark:bg-brand-navy p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-brand-accent transition">
            <div class="text-4xl font-extrabold font-cinzel text-brand-accent mb-3">02</div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Design</h3>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Co-crafting a clear engagement scope, explicit milestone definitions, success metrics, and structured scheduling tailored to organizational realities.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="bg-white dark:bg-brand-navy p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-brand-accent transition">
            <div class="text-4xl font-extrabold font-cinzel text-brand-accent mb-3">03</div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Delivery</h3>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Execution of the coaching, corporate training cohort, or advisory roadmap with rigorous discipline, psychological safety, and accountability.
            </p>
          </div>

          <!-- Step 4 -->
          <div class="bg-white dark:bg-brand-navy p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:border-brand-accent transition">
            <div class="text-4xl font-extrabold font-cinzel text-brand-accent mb-3">04</div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Review</h3>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Structured progress review with the participant and executive sponsor, evaluating KPIs, behavioral shifts, and establishing sustainable next steps.
            </p>
          </div>

        </div>

        <!-- ICF Ethics Note -->
        <div class="mt-12 bg-white dark:bg-brand-navy border border-brand-accent/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <div class="w-14 h-14 rounded-2xl bg-brand-accent/20 text-brand-accent flex items-center justify-center font-bold text-xl flex-shrink-0">
            ICF
          </div>
          <div class="space-y-1 text-center sm:text-left flex-1">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">Strict Adherence to ICF Code of Ethics & Confidentiality</h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              All coaching engagements respect total confidentiality. When an organization sponsors the coaching, what is shared with the sponsor is agreed with the participant in advance. Sponsors receive milestone updates only — never the content of private conversations.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- FAQ Anchor Banner -->
    <section class="py-14 bg-white dark:bg-brand-dark border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white font-cinzel">Have Questions on Working with MMR Rise?</h3>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Explore our dedicated FAQ page covering retainers, PMP preparation, CXO cohorts, board sponsorship, and delivery formats.
        </p>
        <div class="pt-2">
          <a routerLink="/faq" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy dark:bg-brand-accent text-white dark:text-brand-dark text-xs font-bold uppercase tracking-wider hover:opacity-90 transition shadow">
            Read Comprehensive FAQ &rarr;
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
