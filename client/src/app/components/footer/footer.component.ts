import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-white dark:bg-brand-dark text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          
          <!-- Column 1: Brand Info -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-sm p-1.5 border border-slate-200 dark:border-white/20 flex items-center justify-center shadow">
                <img src="logo.png" alt="MMR Rise Logo" class="w-full h-full object-contain">
              </div>
              <span class="font-cinzel text-2xl font-bold tracking-wider text-slate-900 dark:text-white">
                MMR <span class="text-brand-accent font-sans font-light">RISE</span>
              </span>
            </div>
            <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-sm">
              <strong class="text-slate-900 dark:text-white">MMR Rise</strong> is the executive coaching, training, and strategic advisory firm led by <strong class="text-slate-900 dark:text-white">Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM</strong>. Grounded in two decades of corporate leadership across telecom, technology, and P&L governance.
            </p>
            <p class="text-xs text-brand-accent italic font-medium">
              &ldquo;Organizations grow best when people grow with them.&rdquo;
            </p>
            <div class="flex items-center space-x-4 pt-2">
              <div class="text-xs text-brand-accent uppercase tracking-wider font-semibold">Connect with MMR:</div>
              <a href="https://www.linkedin.com/in/coachmmr" target="_blank" rel="noopener" class="text-slate-400 hover:text-brand-accent transition" title="LinkedIn Profile">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="mailto:mmrshohagbd@gmail.com" class="text-slate-400 hover:text-brand-accent transition" title="Direct Email">
                <svg class="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
              <a href="tel:+8801714113030" class="text-slate-400 hover:text-brand-accent transition" title="Direct Phone">
                <svg class="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </a>
            </div>
          </div>

          <!-- Column 2: Consulting & Services -->
          <div>
            <h4 class="text-xs uppercase tracking-widest font-bold text-slate-900 dark:text-white mb-4">Service Lines</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a routerLink="/services" fragment="coaching-cxos" class="hover:text-brand-blue dark:hover:text-brand-accent transition">Coaching for CXOs</a></li>
              <li><a routerLink="/services" fragment="coaching-emerging-leaders" class="hover:text-brand-blue dark:hover:text-brand-accent transition">CXO Pathway (Rising Managers)</a></li>
              <li><a routerLink="/services" fragment="coaching-hr-leaders" class="hover:text-brand-blue dark:hover:text-brand-accent transition">Coaching for HR Leaders</a></li>
              <li><a routerLink="/services" fragment="corporate-training" class="hover:text-brand-blue dark:hover:text-brand-accent transition">Corporate Training Programs</a></li>
              <li><a routerLink="/services" fragment="consulting-advisory" class="hover:text-brand-blue dark:hover:text-brand-accent transition">Consulting & Regulatory Advisory</a></li>
              <li><a routerLink="/services" fragment="working-with-boards" class="hover:text-brand-blue dark:hover:text-brand-accent transition">Working with Boards</a></li>
            </ul>
          </div>

          <!-- Column 3: Learning & Speaking -->
          <div>
            <h4 class="text-xs uppercase tracking-widest font-bold text-slate-900 dark:text-white mb-4">Training & Speaking</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a routerLink="/courses" class="hover:text-brand-blue dark:hover:text-brand-accent transition">PMP & Leadership Courses</a></li>
              <li><a routerLink="/courses" class="hover:text-brand-blue dark:hover:text-brand-accent transition">In-House Corporate Workshops</a></li>
              <li><a routerLink="/speaking" class="hover:text-brand-blue dark:hover:text-brand-accent transition">Keynote Speeches & Offsites</a></li>
              <li><a routerLink="/media" class="hover:text-brand-blue dark:hover:text-brand-accent transition">TEDx & Industry Talks</a></li>
              <li><a routerLink="/services" fragment="how-we-work" class="hover:text-brand-blue dark:hover:text-brand-accent transition">How We Work (Methodology)</a></li>
            </ul>
          </div>

          <!-- Column 4: Quick Engagements -->
          <div>
            <h4 class="text-xs uppercase tracking-widest font-bold text-slate-900 dark:text-white mb-4">Company: MMR Rise</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a routerLink="/about-rise" class="text-brand-accent font-semibold hover:underline">About MMR Rise</a></li>
              <li><a routerLink="/about-mmr" class="hover:text-brand-blue dark:hover:text-brand-accent transition">About Mukhlesur Rahman</a></li>
              <li><a routerLink="/booking" class="hover:text-brand-blue dark:hover:text-brand-accent transition">Book Discovery Call</a></li>
              <li><a routerLink="/faq" class="hover:text-brand-blue dark:hover:text-brand-accent transition">Frequently Asked Questions</a></li>
              <li><a routerLink="/contact" class="hover:text-brand-blue dark:hover:text-brand-accent transition">Contact Office</a></li>
            </ul>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            &copy; 2026 <strong class="text-slate-700 dark:text-slate-400">MMR Rise</strong> &bull; Founded by Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM. All rights reserved.
          </div>
          <div class="mt-4 md:mt-0 flex space-x-6">
            <span class="text-slate-600 dark:text-slate-400">Dhaka & Chattogram, Bangladesh</span>
            <span>&bull;</span>
            <a href="mailto:mmrshohagbd@gmail.com" class="text-slate-600 dark:text-slate-400 hover:text-brand-accent">mmrshohagbd&#64;gmail.com</a>
            <span>&bull;</span>
            <a href="tel:+8801714113030" class="text-slate-600 dark:text-slate-400 hover:text-brand-accent">+8801714113030</a>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {}
