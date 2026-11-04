import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, CourseItem } from '../../services/api.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Header -->
    <section class="bg-white dark:bg-gradient-to-b dark:from-brand-dark dark:via-brand-navy dark:to-brand-dark text-slate-900 dark:text-white py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/15 dark:bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">
            Academy & Masterclasses
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel text-slate-900 dark:text-white">
            Course Sales & Training Programs
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Delivering high-impact executive education across both Online Virtual Platforms and Offline Hands-on Bootcamps in Dhaka.
          </p>
        </div>
      </div>
    </section>

    <!-- Filter & Courses Grid -->
    <section class="py-16 bg-white dark:bg-brand-dark min-h-screen transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div class="inline-flex p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 space-x-1 text-xs font-semibold">
            <button (click)="filterMode = 'all'"
                    [class.bg-white]="filterMode === 'all'"
                    [class.dark:bg-slate-700]="filterMode === 'all'"
                    [class.shadow-sm]="filterMode === 'all'"
                    [class.text-slate-900]="filterMode === 'all'"
                    [class.dark:text-white]="filterMode === 'all'"
                    [class.text-slate-600]="filterMode !== 'all'"
                    [class.dark:text-slate-400]="filterMode !== 'all'"
                    class="px-4 py-2 rounded-lg transition">
              All Programs ({{ courses.length }})
            </button>
            <button (click)="filterMode = 'online'"
                    [class.bg-white]="filterMode === 'online'"
                    [class.dark:bg-slate-700]="filterMode === 'online'"
                    [class.shadow-sm]="filterMode === 'online'"
                    [class.text-slate-900]="filterMode === 'online'"
                    [class.dark:text-white]="filterMode === 'online'"
                    [class.text-slate-600]="filterMode !== 'online'"
                    [class.dark:text-slate-400]="filterMode !== 'online'"
                    class="px-4 py-2 rounded-lg transition">
              💻 Online Platform
            </button>
            <button (click)="filterMode = 'offline'"
                    [class.bg-white]="filterMode === 'offline'"
                    [class.dark:bg-slate-700]="filterMode === 'offline'"
                    [class.shadow-sm]="filterMode === 'offline'"
                    [class.text-slate-900]="filterMode === 'offline'"
                    [class.dark:text-white]="filterMode === 'offline'"
                    [class.text-slate-600]="filterMode !== 'offline'"
                    [class.dark:text-slate-400]="filterMode !== 'offline'"
                    class="px-4 py-2 rounded-lg transition">
              🏛️ Offline / In-Person (Dhaka)
            </button>
          </div>

          <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong class="text-slate-800 dark:text-slate-200">{{ filteredCourses.length }}</strong> professional programs
          </div>
        </div>

        <!-- Course Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div *ngFor="let course of filteredCourses"
               class="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-executive p-8 flex flex-col justify-between hover:border-brand-accent/70 transition duration-300">
            
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span class="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-brand-blue border border-blue-200 dark:border-blue-700/50">
                  {{ course.category }}
                </span>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full"
                      [ngClass]="course.deliveryMode.includes('Offline') ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'">
                  {{ course.deliveryMode }}
                </span>
              </div>

              <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-cinzel">{{ course.title }}</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">Instructor: <strong class="text-slate-700 dark:text-slate-300">{{ course.instructor }}</strong> &bull; Level: {{ course.level }}</p>
              
              <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                {{ course.shortDescription }}
              </p>

              <!-- Features checklist -->
              <div class="space-y-2 mb-6 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                <div class="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">Curriculum Highlights:</div>
                <div *ngFor="let f of course.features" class="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <span class="text-emerald-600 dark:text-emerald-400 font-bold">&#10003;</span>
                  <span>{{ f }}</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 text-xs py-3 border-t border-b border-slate-100 dark:border-slate-800 mb-6">
                <div>
                  <span class="text-slate-500 dark:text-slate-400 block">Duration</span>
                  <span class="font-bold text-slate-800 dark:text-slate-200">{{ course.duration }}</span>
                </div>
                <div>
                  <span class="text-slate-500 dark:text-slate-400 block">Batch Timing</span>
                  <span class="font-bold text-brand-blue">{{ course.upcomingBatch }}</span>
                </div>
              </div>
            </div>

            <!-- Price and Enroll CTA -->
            <div class="flex items-center justify-between pt-2">
              <div>
                <span class="text-xs text-slate-500 dark:text-slate-400 block">Total Investment</span>
                <div class="flex items-baseline gap-2">
                  <span class="text-2xl font-extrabold text-slate-900 dark:text-white font-cinzel">৳{{ course.price | number }}</span>
                  <span class="text-sm line-through text-slate-400 dark:text-slate-500">৳{{ course.originalPrice | number }}</span>
                </div>
              </div>
              <button (click)="openEnrollModal(course)"
                      class="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-extrabold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition active:scale-95">
                Enroll / Reserve Seat
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- ENROLLMENT MODAL -->
    <div *ngIf="selectedCourse" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div class="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative text-slate-900 dark:text-white">
        <button (click)="closeEnrollModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div *ngIf="!enrollmentSuccess">
          <div class="mb-5">
            <span class="text-xs font-bold uppercase tracking-wider text-brand-accent bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded">Course Enrollment</span>
            <h3 class="text-xl font-bold font-cinzel text-slate-900 dark:text-white mt-2">{{ selectedCourse.title }}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Tuition Fee: <strong class="text-brand-accent font-bold">৳{{ selectedCourse.price | number }} BDT</strong></p>
          </div>

          <form (ngSubmit)="submitEnrollment()" class="space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
              <input type="text" [(ngModel)]="enrollForm.studentName" name="studentName" required
                     placeholder="e.g. Nusrat Jahan"
                     class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
              <input type="email" [(ngModel)]="enrollForm.studentEmail" name="studentEmail" required
                     placeholder="nusrat@corporate.com"
                     class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone / WhatsApp Number *</label>
              <input type="tel" [(ngModel)]="enrollForm.studentPhone" name="studentPhone" required
                     placeholder="+880 1819 000000"
                     class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Special Notes / Organizational Sponsorship</label>
              <textarea rows="2" [(ngModel)]="enrollForm.notes" name="notes"
                        placeholder="Company sponsoring, batch preference..."
                        class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm"></textarea>
            </div>

            <div class="pt-2">
              <button type="submit" [disabled]="enrolling"
                      class="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-glow transition">
                <span *ngIf="!enrolling">Confirm Registration & Reserve Seat &rarr;</span>
                <span *ngIf="enrolling">Processing Registration...</span>
              </button>
            </div>
          </form>
        </div>

        <div *ngIf="enrollmentSuccess" class="text-center py-6 space-y-4">
          <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto">
            ✓
          </div>
          <h4 class="text-xl font-bold font-cinzel text-slate-900 dark:text-white">Seat Reserved Successfully!</h4>
          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
            Thank you for enrolling in <strong>{{ selectedCourse.title }}</strong>. Our admissions team will email onboarding instructions to <strong>{{ enrollForm.studentEmail }}</strong>.
          </p>
          <button (click)="closeEnrollModal()" class="px-6 py-2.5 bg-brand-dark dark:bg-slate-800 text-white rounded-xl text-xs font-bold">
            Close Window
          </button>
        </div>

      </div>
    </div>
  `
})
export class CoursesComponent implements OnInit {
  courses: CourseItem[] = [];
  filterMode: 'all' | 'online' | 'offline' = 'all';
  selectedCourse: CourseItem | null = null;
  enrolling = false;
  enrollmentSuccess = false;

  enrollForm = {
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    notes: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCourses().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error(err)
    });
  }

  get filteredCourses(): CourseItem[] {
    if (this.filterMode === 'all') return this.courses;
    if (this.filterMode === 'online') {
      return this.courses.filter(c => c.deliveryMode.toLowerCase().includes('online') || c.platform.toLowerCase().includes('online'));
    }
    if (this.filterMode === 'offline') {
      return this.courses.filter(c => c.deliveryMode.toLowerCase().includes('offline') || c.platform.toLowerCase().includes('offline') || c.platform.toLowerCase().includes('dhaka'));
    }
    return this.courses;
  }

  openEnrollModal(course: CourseItem): void {
    this.selectedCourse = course;
    this.enrollmentSuccess = false;
  }

  closeEnrollModal(): void {
    this.selectedCourse = null;
    this.enrollForm = { studentName: '', studentEmail: '', studentPhone: '', notes: '' };
  }

  submitEnrollment(): void {
    if (!this.selectedCourse) return;
    this.enrolling = true;

    const payload = {
      courseId: this.selectedCourse.id,
      ...this.enrollForm,
      deliveryFormat: this.selectedCourse.deliveryMode
    };

    this.api.enrollCourse(payload).subscribe({
      next: () => {
        this.enrolling = false;
        this.enrollmentSuccess = true;
      },
      error: (err) => {
        this.enrolling = false;
        console.error(err);
        alert('Enrollment error. Please reach out to contact@mmrrise.com.');
      }
    });
  }
}
