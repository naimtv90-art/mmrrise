import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, MediaItem } from '../../services/api.service';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Header -->
    <section class="bg-white dark:bg-gradient-to-b dark:from-brand-dark dark:via-brand-navy dark:to-brand-dark text-slate-900 dark:text-white py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-amber-500/10 dark:bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">
            Press, Broadcasts & Insights
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel text-slate-900 dark:text-white">
            Media & Thought Leadership
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Keynote recordings, TEDx speeches, podcast conversations, publications, and highlights from executive retreats led by Mukhlesur Rahman.
          </p>
        </div>
      </div>
    </section>

    <!-- Media Grid -->
    <section class="py-20 bg-white dark:bg-brand-dark min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div *ngFor="let item of mediaItems"
               class="bg-white dark:bg-slate-900/90 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-executive flex flex-col justify-between hover:border-brand-accent transition duration-300">
            
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold px-3 py-1 rounded-full bg-brand-accent/15 dark:bg-slate-800 text-brand-accent border border-brand-accent/30">
                  {{ item.type }}
                </span>
                <span class="text-xs text-slate-400 font-medium">{{ item.date }}</span>
              </div>

              <div class="text-xs font-semibold text-brand-blue dark:text-sky-400 mb-1 uppercase tracking-wider">{{ item.source }}</div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white font-cinzel mb-3">{{ item.title }}</h3>
              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{{ item.description }}</p>

              <!-- Media Visual Placeholder -->
              <div class="bg-gradient-to-r from-slate-900 to-brand-navy rounded-2xl h-44 flex items-center justify-center text-white p-6 relative overflow-hidden group">
                <div class="text-center space-y-2 z-10">
                  <div class="w-12 h-12 rounded-full bg-brand-accent/20 border border-brand-accent text-brand-accent mx-auto flex items-center justify-center font-bold text-lg group-hover:scale-110 transition">
                    ▶
                  </div>
                  <span class="text-xs font-semibold block text-slate-300">{{ item.tag }} ({{ item.duration }})</span>
                </div>
              </div>
            </div>

            <div class="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-6">
              <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">MMR Rise Official Media</span>
              <a routerLink="/speaking" class="text-xs font-bold text-brand-blue dark:text-brand-accent hover:underline">
                Invite For Interview / Event &rarr;
              </a>
            </div>

          </div>
        </div>

        <!-- Press Kit Download Banner -->
        <div class="mt-16 bg-slate-50 dark:bg-brand-navy rounded-3xl p-8 sm:p-12 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-none">
          <div class="space-y-2 text-center sm:text-left">
            <h3 class="text-xl font-bold font-cinzel text-slate-900 dark:text-white">Journalist or Conference Organizer?</h3>
            <p class="text-xs text-slate-600 dark:text-slate-300">Download Mukhlesur Rahman’s high-resolution media kit, official headshots, and speaker bio.</p>
          </div>
          <a routerLink="/contact" class="px-6 py-3 rounded-xl bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-wider hover:brightness-110 transition whitespace-nowrap shadow-md">
            Request Media Press Kit
          </a>
        </div>

      </div>
    </section>
  `
})
export class MediaComponent implements OnInit {
  mediaItems: MediaItem[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getMedia().subscribe({
      next: (data) => this.mediaItems = data,
      error: (err) => console.error(err)
    });
  }
}

