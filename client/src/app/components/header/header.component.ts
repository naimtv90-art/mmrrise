import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 bg-white/95 dark:bg-brand-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-all duration-300 shadow-sm">
      <!-- Top announcement bar -->
      <div class="bg-gradient-to-r from-slate-100 via-white to-slate-100 dark:from-brand-navy dark:via-slate-900 dark:to-brand-navy border-b border-slate-200 dark:border-brand-accent/20 py-1.5 px-4 text-center text-xs font-medium text-slate-700 dark:text-slate-300">
        <span class="inline-block px-2 py-0.5 mr-2 rounded bg-brand-accent/20 text-brand-dark dark:text-brand-accent uppercase text-[10px] tracking-wider font-bold">MMR Rise Advisory</span>
        Direct consultations with Mukhlesur Rahman now booking for Q4 2026 & Q1 2027.
        <a routerLink="/booking" class="ml-2 text-brand-accent hover:underline font-bold">Reserve Your Session &rarr;</a>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Logo & Brand Name: MMR Rise -->
          <a routerLink="/" class="flex items-center space-x-3 group">
            <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-sm p-1.5 border border-slate-200 dark:border-white/20 flex items-center justify-center shadow transition-transform group-hover:scale-105">
              <img src="logo.png" alt="MMR Rise Official Logo" class="w-full h-full object-contain">
            </div>
            <div>
              <div class="font-cinzel text-2xl font-bold tracking-wider text-slate-900 dark:text-white flex items-center">
                MMR <span class="text-brand-accent ml-1 font-sans font-light">RISE</span>
              </div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-medium">Mukhlesur Rahman</div>
            </div>
          </a>

          <!-- Desktop Navigation Links -->
          <nav class="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium">
            <a routerLink="/" routerLinkActive="text-brand-accent bg-slate-100 dark:bg-slate-800/60 font-semibold" [routerLinkActiveOptions]="{exact: true}"
               class="px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-brand-blue dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40 transition">
              Home
            </a>

            <!-- About Dropdown/Links -->
            <div class="relative group">
              <button class="px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-brand-blue dark:hover:text-white flex items-center gap-1 transition">
                <span>About</span>
                <svg class="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div class="absolute left-0 mt-2 w-60 rounded-xl bg-white dark:bg-brand-dark/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700/60 shadow-2xl py-2 hidden group-hover:block transition-all animate-fadeIn">
                <a routerLink="/about-rise" routerLinkActive="text-brand-accent bg-slate-100 dark:bg-slate-800/60"
                   class="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-brand-navy hover:text-brand-accent transition">
                  <div class="font-semibold text-brand-accent">About MMR Rise</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">Firm Vision, Mission & Service Catalog</div>
                </a>
                <a routerLink="/about-mmr" routerLinkActive="text-brand-accent bg-slate-100 dark:bg-slate-800/60"
                   class="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-brand-navy hover:text-brand-accent transition">
                  <div class="font-semibold text-slate-900 dark:text-white">Mukhlesur Rahman</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">Biography & Leadership Profile</div>
                </a>
              </div>
            </div>

            <a routerLink="/services" routerLinkActive="text-brand-accent bg-slate-100 dark:bg-slate-800/60 font-semibold"
               class="px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-brand-blue dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40 transition">
              Consulting Services
            </a>

            <a routerLink="/courses" routerLinkActive="text-brand-accent bg-slate-100 dark:bg-slate-800/60 font-semibold"
               class="px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-brand-blue dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40 transition">
              Courses
            </a>

            <a routerLink="/speaking" routerLinkActive="text-brand-accent bg-slate-100 dark:bg-slate-800/60 font-semibold"
               class="px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-brand-blue dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40 transition">
              Speaking
            </a>

            <a routerLink="/media" routerLinkActive="text-brand-accent bg-slate-100 dark:bg-slate-800/60 font-semibold"
               class="px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-brand-blue dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40 transition">
              Media
            </a>

            <a routerLink="/faq" routerLinkActive="text-brand-accent bg-slate-100 dark:bg-slate-800/60 font-semibold"
               class="px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-brand-blue dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40 transition">
              FAQ
            </a>

            <a routerLink="/contact" routerLinkActive="text-brand-accent bg-slate-100 dark:bg-slate-800/60 font-semibold"
               class="px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-brand-blue dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40 transition">
              Contact
            </a>
          </nav>

          <!-- Executive Call To Action & Light/Dark Mode Switcher -->
          <div class="hidden md:flex items-center space-x-3">
            <!-- Theme Toggle Button -->
            <button (click)="themeService.toggleTheme()"
                    type="button"
                    [attr.aria-label]="themeService.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
                    [title]="themeService.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
                    class="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700/70 bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:border-brand-accent hover:text-brand-accent dark:hover:text-brand-accent transition-all duration-200 focus:outline-none shadow-sm cursor-pointer">
              <!-- Sun Icon (in Dark Mode to switch to Light) -->
              <svg *ngIf="themeService.isDark" class="w-5 h-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <!-- Moon Icon (in Light Mode to switch to Dark) -->
              <svg *ngIf="!themeService.isDark" class="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <a routerLink="/booking"
               class="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-dark bg-gradient-to-r from-brand-accent to-brand-accentLight rounded-xl shadow-gold-glow hover:brightness-110 transition active:scale-95">
              <span>Book Consultation</span>
            </a>
          </div>

          <!-- Mobile Right Controls (Toggle + Menu Button) -->
          <div class="flex items-center space-x-2 lg:hidden">
            <!-- Mobile Quick Toggle Button -->
            <button (click)="themeService.toggleTheme()"
                    type="button"
                    [attr.aria-label]="themeService.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
                    class="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
              <svg *ngIf="themeService.isDark" class="w-5 h-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg *ngIf="!themeService.isDark" class="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <!-- Mobile Menu Toggle Button -->
            <button (click)="isMobileMenuOpen = !isMobileMenuOpen" class="text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white p-2 rounded-md focus:outline-none">
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
      <div *ngIf="isMobileMenuOpen" class="lg:hidden bg-white dark:bg-brand-dark border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 text-base shadow-xl">
        <div class="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
          <span class="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">Appearance Mode</span>
          <button (click)="themeService.toggleTheme()"
                  class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <span *ngIf="themeService.isDark" class="flex items-center gap-1.5 text-brand-accent">
              ☀️ Light Mode
            </span>
            <span *ngIf="!themeService.isDark" class="flex items-center gap-1.5 text-slate-700">
              🌙 Dark Mode
            </span>
          </button>
        </div>

        <a (click)="isMobileMenuOpen = false" routerLink="/" class="block px-3 py-2 rounded-md text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Home</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/about-rise" class="block px-3 py-2 rounded-md text-brand-accent font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">About MMR Rise</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/about-mmr" class="block px-3 py-2 rounded-md text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">About Mukhlesur Rahman</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/services" class="block px-3 py-2 rounded-md text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Service Catalog</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/courses" class="block px-3 py-2 rounded-md text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Courses & Workshops</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/speaking" class="block px-3 py-2 rounded-md text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Speaking & Keynotes</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/media" class="block px-3 py-2 rounded-md text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Media & Press</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/faq" class="block px-3 py-2 rounded-md text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Frequently Asked Questions (FAQ)</a>
        <a (click)="isMobileMenuOpen = false" routerLink="/contact" class="block px-3 py-2 rounded-md text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Contact Office</a>
        <div class="pt-3">
          <a (click)="isMobileMenuOpen = false" routerLink="/booking"
             class="w-full text-center block px-4 py-3 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-bold text-sm uppercase tracking-wider shadow">
            Book Paid Consultation
          </a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  constructor(public themeService: ThemeService) {}
}
