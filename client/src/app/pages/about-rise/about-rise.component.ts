import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-rise',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Header -->
    <section class="bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark text-white py-16 lg:py-24 border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center gap-8 justify-between">
          <div class="max-w-3xl space-y-4">
            <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">
              The Advisory Firm
            </span>
            <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel">
              About MMR Rise
            </h1>
            <p class="text-lg text-slate-300 font-light leading-relaxed">
              <strong class="text-white">MMR Rise</strong> is a high-impact management consulting and leadership development firm founded by <strong class="text-brand-accent">Mukhlasur Rahaman</strong>. We catalyze enterprise agility, cultivate visionary leaders, and engineer sustainable corporate breakthroughs.
            </p>
          </div>
          <div class="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white/10 backdrop-blur-md p-4 border border-white/20 shadow-2xl flex items-center justify-center shrink-0">
            <img src="logo.png" alt="MMR Rise Logo" class="w-full h-full object-contain">
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div class="bg-slate-50 border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-sm hover:shadow-md transition">
            <div class="w-12 h-12 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center font-bold text-xl mb-6">
              🎯
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-3 font-cinzel">Our Vision</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              To be South Asia's preeminent boutique leadership and organizational transformation consultancy—redefining how modern enterprises build agile operating models, empower executive talent, and generate generational value.
            </p>
          </div>

          <div class="bg-slate-50 border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-sm hover:shadow-md transition">
            <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl mb-6">
              🚀
            </div>
            <h3 class="text-2xl font-bold text-slate-900 mb-3 font-cinzel">Our Mission</h3>
            <p class="text-slate-600 text-sm leading-relaxed">
              To bridge the critical gap between executive strategy and ground-level execution through evidence-based executive coaching, high-rigor PMO frameworks, and deeply engaging corporate training programs.
            </p>
          </div>
        </div>

        <!-- The RISE Framework -->
        <div class="mb-20">
          <div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span class="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Methodology
            </span>
            <h2 class="text-3xl font-extrabold text-slate-900 font-cinzel">The R.I.S.E. Transformation Framework</h2>
            <p class="text-sm text-slate-600">Our signature 4-pillar methodology applied to drive enterprise-wide transformation.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative group hover:border-brand-accent transition">
              <div class="text-3xl font-extrabold text-brand-accent font-cinzel mb-2">R</div>
              <h4 class="font-bold text-slate-900 text-base mb-2">Review & Diagnose</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Thorough audit of organizational health, communication friction, PMO governance, and executive team alignment.
              </p>
            </div>

            <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative group hover:border-brand-accent transition">
              <div class="text-3xl font-extrabold text-brand-accent font-cinzel mb-2">I</div>
              <h4 class="font-bold text-slate-900 text-base mb-2">Instill Strategy</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Formulating precise strategic OKRs, agile workflows, and leadership accountability matrices with C-level stakeholders.
              </p>
            </div>

            <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative group hover:border-brand-accent transition">
              <div class="text-3xl font-extrabold text-brand-accent font-cinzel mb-2">S</div>
              <h4 class="font-bold text-slate-900 text-base mb-2">Sync & Coach</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Hands-on coaching of departmental heads, PMO leads, and executive teams to eliminate operational silos and boost speed.
              </p>
            </div>

            <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative group hover:border-brand-accent transition">
              <div class="text-3xl font-extrabold text-brand-accent font-cinzel mb-2">E</div>
              <h4 class="font-bold text-slate-900 text-base mb-2">Elevate & Scale</h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                Institutionalizing autonomous leadership rituals and repeatable delivery processes for perpetual growth.
              </p>
            </div>
          </div>
        </div>

        <!-- Values Banner -->
        <div class="bg-brand-navy rounded-3xl p-8 sm:p-12 text-white">
          <div class="max-w-3xl space-y-4">
            <h3 class="text-2xl font-bold font-cinzel">Why Leading Companies Partner with MMR Rise</h3>
            <p class="text-slate-300 text-sm leading-relaxed">
              Unlike generic consultancies that drop bulky slide decks and disappear, MMR Rise embeds side-by-side with your leadership team. We take personal ownership of results, measuring our success solely by your organizational resilience and delivery velocity.
            </p>
            <div class="pt-4 flex flex-wrap gap-4">
              <a routerLink="/booking" class="px-6 py-3 rounded-xl bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-wider hover:brightness-110 transition">
                Schedule An Enterprise Consultation
              </a>
              <a routerLink="/contact" class="px-6 py-3 rounded-xl bg-slate-800 text-white font-semibold text-xs tracking-wide hover:bg-slate-700 transition">
                Contact Our Corporate Desk
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class AboutRiseComponent {}

