import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-brand-dark text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          <!-- Column 1: Brand Info -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm p-1.5 border border-white/20 flex items-center justify-center shadow-lg">
                <img src="logo.png" alt="MMR Rise Logo" class="w-full h-full object-contain">
              </div>
              <span class="font-cinzel text-2xl font-bold tracking-wider text-white">
                MMR <span class="text-brand-accent font-sans font-light">RISE</span>
              </span>
            </div>
            <p class="text-sm leading-relaxed text-slate-300 max-w-sm">
              <strong class="text-white">MMR Rise</strong> is the premier leadership advisory and management consultancy led by <strong class="text-white">Mukhlasur Rahaman</strong>. Transforming organizations, empowering C-suite leaders, and instituting world-class project execution.
            </p>
            <div class="flex items-center space-x-4 pt-2">
              <div class="text-xs text-brand-accent uppercase tracking-wider font-semibold">Connect with MMR Rise:</div>
              <a href="https://linkedin.com" target="_blank" rel="noopener" class="text-slate-400 hover:text-brand-accent transition">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="mailto:contact@mmrrise.com" class="text-slate-400 hover:text-brand-accent transition">
                <svg class="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
            </div>
          </div>

          <!-- Column 2: Consulting & Services -->
          <div>
            <h4 class="text-xs uppercase tracking-widest font-bold text-white mb-4">Consulting Services</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a routerLink="/services" fragment="consulting" class="hover:text-brand-accent transition">Strategic Consulting</a></li>
              <li><a routerLink="/services" fragment="organizational-transformation" class="hover:text-brand-accent transition">Organizational Transformation</a></li>
              <li><a routerLink="/services" fragment="project-management-consultancy" class="hover:text-brand-accent transition">Project Management (PMO)</a></li>
              <li><a routerLink="/services" fragment="organizational-coaching" class="hover:text-brand-accent transition">Organizational Coaching</a></li>
              <li><a routerLink="/services" fragment="executive-coaching" class="hover:text-brand-accent transition">Executive 1-on-1 Coaching</a></li>
            </ul>
          </div>

          <!-- Column 3: Learning & Speaking -->
          <div>
            <h4 class="text-xs uppercase tracking-widest font-bold text-white mb-4">Courses & Speaking</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a routerLink="/courses" class="hover:text-brand-accent transition">Online Learning Platform</a></li>
              <li><a routerLink="/courses" class="hover:text-brand-accent transition">Offline Executive Workshops</a></li>
              <li><a routerLink="/speaking" class="hover:text-brand-accent transition">Keynote Speeches</a></li>
              <li><a routerLink="/speaking" class="hover:text-brand-accent transition">Corporate Offsites</a></li>
              <li><a routerLink="/media" class="hover:text-brand-accent transition">Press & Podcasts</a></li>
            </ul>
          </div>

          <!-- Column 4: Quick Engagements -->
          <div>
            <h4 class="text-xs uppercase tracking-widest font-bold text-white mb-4">Company: MMR Rise</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a routerLink="/about-rise" class="text-brand-accent font-semibold hover:underline">About MMR Rise</a></li>
              <li><a routerLink="/about-mmr" class="hover:text-brand-accent transition">About Mukhlasur Rahaman</a></li>
              <li><a routerLink="/booking" class="hover:text-brand-accent transition">Book Paid Consultation</a></li>
              <li><a routerLink="/contact" class="hover:text-brand-accent transition">Inquiry & Office Info</a></li>
              <li><a routerLink="/contact" fragment="faq" class="hover:text-brand-accent transition">Frequently Asked Questions</a></li>
            </ul>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            &copy; 2026 <strong class="text-slate-400">MMR Rise</strong> &bull; Founded by Mukhlasur Rahaman. All rights reserved.
          </div>
          <div class="mt-4 md:mt-0 flex space-x-6">
            <span class="text-slate-400">Gulshan-2, Dhaka, Bangladesh</span>
            <span>&bull;</span>
            <span class="text-slate-400">contact&#64;mmrrise.com</span>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {}
