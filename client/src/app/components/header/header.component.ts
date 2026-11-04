import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <!-- Top announcement bar -->
      <div class="bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy border-b border-brand-accent/20 py-1.5 px-4 text-center text-xs font-medium text-slate-300">
        <span class="inline-block px-2 py-0.5 mr-2 rounded bg-brand-accent/20 text-brand-accent uppercase text-[10px] tracking-wider font-semibold">MMR Rise Advisory</span>
        Direct consultations with Mukhlasur Rahaman now booking for Q4 2026 & Q1 2027.
        <a routerLink="/booking" class="ml-2 text-brand-accent hover:underline font-semibold">Reserve Your Session &rarr;</a>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Logo & Brand Name: MMR Rise -->
          <a routerLink="/" class="flex items-center space-x-3 group">
            <div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm p-1.5 border border-white/20 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <img src="logo.png" alt="MMR Rise Official Logo" class="w-full h-full object-contain">
            </div>
            <div>
              <div class="font-cinzel text-2xl font-bold tracking-wider text-white flex items-center">
                MMR <span class="text-brand-accent ml-1 font-sans font-light">RISE</span>
              </div>
              <div class="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Mukhlasur Rahaman</div>
            </div>
          </a>

          <!-- Desktop Navigation Links -->
          <nav class="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium">
            <a routerLink="/" routerLinkActive="text-brand-accent bg-slate-800/60" [routerLinkActiveOptions]="{exact: true}"
               class="px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/40 transition">
              Home
            </a>

            <!-- About Dropdown/Links -->
            <div class="relative group">
              <button class="px-3 py-2 rounded-md text-slate-300 hover:text-white flex items-center gap-1 transition">
                <span>About</span>
                <svg class="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div class="absolute left-0 mt-2 w-60 rounded-xl bg-brand-dark/95 backdrop-blur-xl border border-slate-700/60 shadow-2xl py-2 hidden group-hover:block transition-all animate-fadeIn">
                <a routerLink="/about-rise" routerLinkActive="text-brand-accent bg-slate-800/60"
                   class="block px-4 py-2.5 text-sm text-slate-200 hover:bg-brand-navy hover:text-brand-accent transition">
                  <div class="font-semibold text-brand-accent">About MMR Rise</div>
                  <div class="text-xs text-slate-400">Firm Vision, Mission & Impact</div>
                </a>
                <a routerLink="/about-mmr" routerLinkActive="text-brand-accent bg-slate-800/60"
                   class="block px-4 py-2.5 text-sm text-slate-200 hover:bg-brand-navy hover:text-brand-accent transition">
                  <div class="font-semibold">Mukhlasur Rahaman</div>
                  <div class="text-xs text-slate-400">Biography & Leadership Profile</div>
                </a>
              </div>
            </div>

            <a routerLink="/services" routerLinkActive="text-brand-accent bg-slate-800/60"
               class="px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/40 transition">
              Consulting Services
            </a>

            <a routerLink="/courses" routerLinkActive="text-brand-accent bg-slate-800/60"
               class="px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/40 transition">
              Courses
            </a>

            <a routerLink="/speaking" routerLinkActive="text-brand-accent bg-slate-800/60"
               class="px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/40 transition">
              Speaking
            </a>

            <a routerLink="/media" routerLinkActive="text-brand-accent bg-slate-800/60"
               class="px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/40 transition">
              Media
            </a>

            <a routerLink="/contact" routerLinkActive="text-brand-accent bg-slate-800/60"
               class="px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/40 transition">
              Contact & FAQ
            </a>
          </nav>

          <!-- Executive Call To Action -->
          <div class="hidden md:flex items-center space-x-3">
            <a routerLink="/booking"
               class="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-dark bg-gradient-to-r from-brand-accent to-brand-accentLight rounded-lg shadow-gold-glow hover:brightness-110 transition active:scale-95">
              <span>Book Consultation</span>
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <div class="flex lg:hidden">
            <button (click)="isMobileMenuOpen = !isMobileMenuOpen" class="text-slate-300 hover:text-white p-2 rounded-md focus:outline-none">
              <svg *ngIf="!isMobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <svg *ngIf="isMobileMenuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile dropdown nav -->
      <div *ngIf="isMobileMenuOpen" class="lg:hidden bg-brand-dark border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 text-base">
        <a (click)="isMobileMenuOpen = false" routerLink="/" class="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800">Home</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/about-rise" class="block px-3 py-2 rounded-md text-brand-accent font-semibold hover:bg-slate-800">About MMR Rise</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/about-mmr" class="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800">About Mukhlasur Rahaman</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/services" class="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800">Consulting Services</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/courses" class="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800">Course Sales (Online & Offline)</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/speaking" class="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800">Speaking & Keynotes</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/media" class="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800">Media & Press</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/contact" class="block px-3 py-2 rounded-md text-slate-200 hover:bg-slate-800">Contact & FAQs</a>
        <div class="pt-3">
          <a (click)="isMobileMenuOpen = false" routerLink="/booking"
             class="w-full text-center block px-4 py-3 rounded-lg bg-brand-accent text-brand-dark font-semibold text-sm uppercase tracking-wider">
            Book Paid Consultation
          </a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  isMobileMenuOpen = false;
}
