import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-about-mmr',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Header Hero -->
    <section class="bg-white dark:bg-gradient-to-b dark:from-brand-dark dark:via-brand-navy dark:to-brand-dark text-slate-900 dark:text-white py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/15 dark:bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">
            About The Founder & Executive Coach
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel text-slate-900 dark:text-white">
            Mukhlasur Rahaman
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Executive Leadership Coach, Management Consultant & Enterprise Trainer with over 18 years of high-stakes corporate execution experience.
          </p>
        </div>
      </div>
    </section>

    <!-- Detailed Biography & Credentials -->
    <section class="py-20 bg-white dark:bg-brand-dark transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Left Column: Portrait & Key Credentials Card -->
          <div class="lg:col-span-5 space-y-6">
            <div class="bg-white dark:bg-brand-navy text-slate-900 dark:text-white rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
              <div class="w-44 h-44 rounded-2xl overflow-hidden mx-auto mb-6 shadow-xl border-2 border-brand-accent/70 bg-slate-100 dark:bg-slate-900 ring-4 ring-brand-accent/20">
                <img src="mukhlasur-rahaman.jpg" alt="Mukhlasur Rahaman" class="w-full h-full object-cover object-top">
              </div>
              <h3 class="text-2xl font-bold text-center font-cinzel text-slate-900 dark:text-white">Mukhlasur Rahaman</h3>
              <p class="text-xs text-brand-accent text-center font-semibold uppercase tracking-wider mt-1">Founder & Managing Consultant, MMR Rise</p>
              
              <div class="mt-8 space-y-4 text-xs">
                <div class="border-t border-slate-200 dark:border-slate-800 pt-4 flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Total Industry Experience:</span>
                  <span class="text-slate-900 dark:text-white font-bold">18+ Years</span>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-800 pt-4 flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Leaders Mentored:</span>
                  <span class="text-slate-900 dark:text-white font-bold">500+ CXOs & Senior Execs</span>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-800 pt-4 flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Offices Coached:</span>
                  <span class="text-slate-900 dark:text-white font-bold">65+ Enterprises</span>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-800 pt-4 flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Headquarters:</span>
                  <span class="text-brand-accent font-bold">Dhaka, Bangladesh</span>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                <a routerLink="/booking" class="w-full block text-center py-3 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-gold-glow">
                  Book 1-on-1 Executive Consultation
                </a>
              </div>
            </div>

            <!-- Credentials Box -->
            <div class="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm">
              <h4 class="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">Accreditations & Specializations</h4>
              <ul class="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li *ngFor="let cred of profile?.credentials" class="flex items-start gap-2">
                  <span class="text-brand-accent font-bold">✔</span>
                  <span>{{ cred }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right Column: Biography & Philosophy -->
          <div class="lg:col-span-7 space-y-8">
            <div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                The Architect Behind High-Velocity Organizations
              </h2>
              <div class="prose prose-slate text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-4">
                <p>
                  {{ profile?.bioFull }}
                </p>
                <p>
                  Throughout his career, Mukhlasur Rahaman has observed that organizations don’t fail due to lack of ambition or talent; they stumble because of broken execution rhythms, misaligned executive teams, and cultures paralyzed by fear of failure.
                </p>
                <p>
                  His proprietary frameworks blend human psychology with rigorous project delivery governance. By aligning executive mindsets with streamlined workflows, MMR has helped multinational subsidiaries, financial powerhouses, and high-growth corporations unlock untapped revenue and agility.
                </p>
              </div>
            </div>

            <!-- 4 Pillars of Coaching Philosophy -->
            <div class="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white">Coaching & Advisory Philosophy</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div class="text-brand-accent font-extrabold text-lg mb-1">01. Strategic Clarity</div>
                  <h4 class="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">C-Suite Focus</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-400">Stripping away corporate clutter to zero in on the 20% of levers that produce 80% of enterprise momentum.</p>
                </div>
                <div class="p-5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div class="text-brand-accent font-extrabold text-lg mb-1">02. Execution Discipline</div>
                  <h4 class="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">PMO Governance</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-400">Instilling ironclad project accountability so deadlines are honored and resource waste is eradicated.</p>
                </div>
                <div class="p-5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div class="text-brand-accent font-extrabold text-lg mb-1">03. Psychological Safety</div>
                  <h4 class="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">Fearless Innovation</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-400">Cultivating an environment where teams speak truth to power and solve roadblocks collaboratively.</p>
                </div>
                <div class="p-5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div class="text-brand-accent font-extrabold text-lg mb-1">04. Sustained Mastery</div>
                  <h4 class="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">Continuous Evolution</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-400">Embedding repeatable operational habits and coaching rituals that sustain performance long after the engagement concludes.</p>
                </div>
              </div>
            </div>

            <!-- Executive Quote Block -->
            <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-900 dark:to-brand-navy border-l-4 border-brand-accent p-6 rounded-r-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <blockquote class="italic text-slate-800 dark:text-slate-200 text-sm font-medium leading-relaxed">
                "Leadership is not a title; it is the courage to create clarity in ambiguity, instill belief in times of crisis, and build an environment where others rise to their highest potential."
              </blockquote>
              <div class="mt-3 text-xs font-bold text-brand-dark dark:text-brand-accent tracking-wide uppercase">
                &mdash; Mukhlasur Rahaman
              </div>
            </div>

            <div class="flex gap-4 pt-4">
              <a routerLink="/services" class="px-6 py-3 rounded-xl bg-brand-dark dark:bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase hover:bg-slate-800 dark:hover:bg-slate-700 transition">
                Explore Consulting Services
              </a>
              <a routerLink="/courses" class="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-xs tracking-wider uppercase hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                View Courses & Workshops
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  `
})
export class AboutMmrComponent implements OnInit {
  profile: any = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getProfile().subscribe({
      next: (data) => this.profile = data,
      error: (err) => console.error(err)
    });
  }
}
