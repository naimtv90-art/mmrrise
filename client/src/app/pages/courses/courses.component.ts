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
    <section class="bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark text-white py-16 lg:py-24 border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">
            Academy & Masterclasses
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel">
            Course Sales & Training Programs
          </h1>
          <p class="text-lg text-slate-300 font-light leading-relaxed">
            Delivering high-impact executive education across both Online Virtual Platforms and Offline Hands-on Bootcamps in Dhaka.
          </p>
        </div>
      </div>
    </section>

    <!-- Filter & Courses Grid -->
    <section class="py-16 bg-slate-50 min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-slate-200">
          <div class="inline-flex p-1.5 rounded-xl bg-slate-200/80 space-x-1 text-xs font-semibold">
            <button (click)="filterMode = 'all'"
                    [class.bg-white]="filterMode === 'all'"
                    [class.shadow-sm]="filterMode === 'all'"
                    [class.text-slate-900]="filterMode === 'all'"
                    [class.text-slate-600]="filterMode !== 'all'"
                    class="px-4 py-2 rounded-lg transition">
              All Programs ({{ courses.length }})
            </button>
            <button (click)="filterMode = 'online'"
                    [class.bg-white]="filterMode === 'online'"
                    [class.shadow-sm]="filterMode === 'online'"
                    [class.text-slate-900]="filterMode === 'online'"
                    [class.text-slate-600]="filterMode !== 'online'"
                    class="px-4 py-2 rounded-lg transition">
              💻 Online Platform
            </button>
            <button (click)="filterMode = 'offline'"
                    [class.bg-white]="filterMode === 'offline'"
                    [class.shadow-sm]="filterMode === 'offline'"
                    [class.text-slate-900]="filterMode === 'offline'"
                    [class.text-slate-600]="filterMode !== 'offline'"
                    class="px-4 py-2 rounded-lg transition">
              🏛️ Offline / In-Person (Dhaka)
            </button>
          </div>

          <div class="text-xs text-slate-500 font-medium">
            Showing <strong class="text-slate-800">{{ filteredCourses.length }}</strong> professional programs
          </div>
        </div>

        <!-- Course Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div *ngFor="let course of filteredCourses"
               class="bg-white rounded-3xl border border-slate-200 shadow-executive p-8 flex flex-col justify-between hover:border-brand-accent/70 transition duration-300">
            
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span class="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-200">
                  {{ course.category }}
                </span>
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full"
                      [ngClass]="course.deliveryMode.includes('Offline') ? 'bg-amber-100 text-amber-900' : 'bg-emerald-50 text-emerald-800'">
                  {{ course.deliveryMode }}
                </span>
              </div>

              <h2 class="text-2xl font-bold text-slate-900 mb-2 font-cinzel">{{ course.title }}</h2>
              <p class="text-xs text-slate-500 mb-4 font-medium">Instructor: <strong class="text-slate-700">{{ course.instructor }}</strong> &bull; Level: {{ course.level }}</p>
              
              <p class="text-slate-600 text-sm leading-relaxed mb-6">
                {{ course.shortDescription }}
              </p>

              <!-- Features checklist -->
              <div class="space-y-2 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div class="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">Curriculum Highlights:</div>
                <div *ngFor="let f of course.features" class="flex items-start gap-2 text-xs text-slate-700">
                  <span class="text-emerald-600 font-bold">&#10003;</span>
                  <span>{{ f }}</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 text-xs py-3 border-t border-b border-slate-100 mb-6">
                <div>
                  <span class="text-slate-400 block">Duration</span>
                  <span class="font-bold text-slate-800">{{ course.duration }}</span>
                </div>
                <div>
                  <span class="text-slate-400 block">Batch Timing</span>
                  <span class="font-bold text-brand-blue">{{ course.upcomingBatch }}</span>
                </div>
              </div>
            </div>

            <!-- Price and Enroll CTA -->
            <div class="flex items-center justify-between pt-2">
              <div>
                <span class="text-xs text-slate-400 block">Total Investment</span>
                <div class="flex items-baseline gap-2">
                  <span class="text-2xl font-extrabold text-slate-900 font-cinzel">৳{{ course.price | number }}</span>
                  <span class="text-sm line-through text-slate-400">৳{{ course.originalPrice | number }}</span>
                </div>
              </div>
              <button (click)="openEnrollModal(course)"
                      class="px-6 py-3 rounded-xl bg-brand-dark hover:bg-slate-900 text-brand-accent font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition">
                Enroll / Reserve Seat
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- ENROLLMENT MODAL -->
    <div *ngIf="selectedCourse" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button (click)="closeEnrollModal()" class="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div *ngIf="!enrollmentSuccess">
          <div class="mb-5">
            <span class="text-xs font-bold uppercase tracking-wider text-brand-accent bg-amber-50 px-2.5 py-1 rounded">Course Enrollment</span>
            <h3 class="text-xl font-bold text-slate-900 mt-2 font-cinzel">{{ selectedCourse.title }}</h3>
            <p class="text-xs text-slate-500 mt-1">Platform: {{ selectedCourse.platform }} &bull; Fee: ৳{{ selectedCourse.price | number }}</p>
          </div>

          <form (ngSubmit)="submitEnrollment()" class="space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 mb-1">Full Name *</label>
              <input type="text" [(ngModel)]="enrollForm.studentName" name="studentName" required
                     placeholder="e.g. Asif Mahmud"
                     class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input type="email" [(ngModel)]="enrollForm.email" name="email" required
                       placeholder="asif@company.com"
                       class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                <input type="tel" [(ngModel)]="enrollForm.phone" name="phone" required
                       placeholder="+880 1700 000000"
                       class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Organization / Designation</label>
              <input type="text" [(ngModel)]="enrollForm.organization" name="organization"
                     placeholder="Company & Role"
                     class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
            </div>

            <div>
              <label class="block font-semibold text-slate-700 mb-1">Preferred Learning Format</label>
              <select [(ngModel)]="enrollForm.preferredFormat" name="preferredFormat"
                      class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white">
                <option value="Online Platform">Online Virtual Interactive Platform</option>
                <option value="Offline In-Person">Offline Executive Workshop (Dhaka)</option>
                <option value="Corporate Group Batch">Corporate In-House Batch (Custom)</option>
              </select>
            </div>

            <button type="submit" [disabled]="isSubmitting"
                    class="w-full mt-2 py-3.5 rounded-xl bg-brand-dark text-brand-accent font-bold text-xs uppercase tracking-wider hover:bg-slate-900 transition flex items-center justify-center">
              <span *ngIf="!isSubmitting">Complete Seat Reservation</span>
              <span *ngIf="isSubmitting">Processing...</span>
            </button>
          </form>
        </div>

        <!-- Success Message -->
        <div *ngIf="enrollmentSuccess" class="text-center py-6 space-y-4">
          <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
            ✓
          </div>
          <h3 class="text-xl font-bold text-slate-900 font-cinzel">Registration Successful!</h3>
          <p class="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
            Thank you, <strong class="text-slate-800">{{ enrollForm.studentName }}</strong>. We have registered your seat for <strong class="text-slate-800">{{ selectedCourse.title }}</strong>. Our admissions coordinator will email your syllabus and payment confirmation within 24 hours.
          </p>
          <button (click)="closeEnrollModal()"
                  class="px-6 py-2.5 bg-brand-dark text-white rounded-xl text-xs font-semibold">
            Close
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
  isSubmitting = false;
  enrollmentSuccess = false;

  enrollForm = {
    studentName: '',
    email: '',
    phone: '',
    organization: '',
    preferredFormat: 'Online Platform',
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
    if (this.filterMode === 'online') {
      return this.courses.filter(c => c.deliveryMode.toLowerCase().includes('online'));
    }
    if (this.filterMode === 'offline') {
      return this.courses.filter(c => c.deliveryMode.toLowerCase().includes('offline') || c.platform.toLowerCase().includes('offline'));
    }
    return this.courses;
  }

  openEnrollModal(course: CourseItem): void {
    this.selectedCourse = course;
    this.enrollmentSuccess = false;
    this.enrollForm.preferredFormat = course.deliveryMode.includes('Offline') ? 'Offline In-Person' : 'Online Platform';
  }

  closeEnrollModal(): void {
    this.selectedCourse = null;
    this.enrollmentSuccess = false;
  }

  submitEnrollment(): void {
    if (!this.selectedCourse || !this.enrollForm.studentName || !this.enrollForm.email || !this.enrollForm.phone) {
      alert('Please fill out all required fields.');
      return;
    }

    this.isSubmitting = true;
    const payload = {
      courseId: this.selectedCourse.id,
      ...this.enrollForm
    };

    this.api.enrollCourse(payload).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.enrollmentSuccess = true;
      },
      error: (err) => {
        this.isSubmitting = false;
        alert('Enrollment failed. Please try again.');
      }
    });
  }
}

