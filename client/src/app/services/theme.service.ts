import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDark = true; // default to rich executive dark theme

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('mmr-theme');
      if (savedTheme) {
        this.isDark = savedTheme === 'dark';
      } else {
        this.isDark = true;
      }
      this.applyTheme();
    }
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('mmr-theme', this.isDark ? 'dark' : 'light');
      this.applyTheme();
    }
  }

  private applyTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;
      if (this.isDark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
    }
  }
}

