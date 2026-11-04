import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, ServiceItem, CourseItem, MediaItem } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- HERO SECTION -->
    <section class="relative bg-white dark:bg-gradient-to-b dark:from-brand-dark dark:via-brand-navy dark:to-brand-dark text-slate-900 dark:text-white overflow-hidden py-20 lg:py-28 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <!-- Background Luxury Glow Elements (Azure Blue & Solar Amber from Logo) -->
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-brand-accent/15 dark:bg-brand-accent/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-10 w-80 h-80 bg-brand-blue/15 dark:bg-brand-blue/25 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Hero Text -->
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-brand-accent/40 text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-brand-accent">
              <span class="w-2 h-2 rounded-full bg-brand-accent animate-ping"></span>
              MMR Rise &bull; Executive Coaching & Management Consulting
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
              Transforming Organizations. <br>
              <span class="gold-gradient-text font-cinzel">Elevating Leaders.</span>
            </h1>

            <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-light leading-relaxed">
              Welcome to <strong class="text-brand-accent">MMR Rise</strong>. Led by <strong class="text-slate-900 dark:text-white font-medium">Mukhlasur Rahaman</strong> — Executive Coach, Enterprise Transformation Consultant & Corporate Trainer. We partner with Founders, CXOs, and ambitious organizations to align strategy, master project execution, and build fearless high-performance cultures.
            </p>

            <!-- Action Buttons -->
            <div class="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a routerLink="/booking"
                 class="px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark shadow-gold-glow hover:brightness-110 transition active:scale-95 text-center">
                Book Paid Consultation
              </a>
              <a routerLink="/services"
                 class="px-8 py-4 rounded-xl text-sm font-semibold tracking-wide bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 transition active:scale-95 text-center">
                Explore Consulting Services
              </a>
            </div>

            <!-- Badges -->
            <div class="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 justify-center lg:justify-start">
              <span class="flex items-center gap-1.5"><span class="text-brand-accent">✓</span> PMP & Agile Governance</span>
              <span class="flex items-center gap-1.5"><span class="text-brand-accent">✓</span> 1-on-1 C-Suite Retainers</span>
              <span class="flex items-center gap-1.5"><span class="text-brand-accent">✓</span> Online & Offline Masterclasses</span>
            </div>
          </div>

          <!-- Hero Executive Visual Card -->
          <div class="lg:col-span-5 flex justify-center">
            <div class="relative w-full max-w-md">
              <div class="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-brand-blue via-brand-accentLight to-brand-accent opacity-30 dark:opacity-40 blur-lg"></div>
              
              <div class="relative bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-brand-dark border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <!-- Mukhlasur Rahaman Executive Portrait Card -->
                <div class="relative mx-auto w-40 h-40 rounded-2xl overflow-hidden border-2 border-brand-accent/70 shadow-xl mb-6 bg-slate-100 dark:bg-slate-900 group">
                  <img src="mukhlasur-rahaman.jpg" alt="Mukhlasur Rahaman" class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105">
                  <div class="absolute bottom-0 inset-x-0 bg-brand-accent text-brand-dark text-[9px] font-extrabold text-center py-0.5 uppercase tracking-wider shadow">
                    MMR RISE ADVISORY
                  </div>
                </div>

                <div class="text-center space-y-1 mb-6">
                  <h3 class="text-2xl font-bold text-slate-900 dark:text-white font-cinzel">Mukhlasur Rahaman</h3>
                  <p class="text-xs text-brand-accent font-medium tracking-wide">Executive Coach & Managing Consultant</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">Founder & Principal, <strong class="text-slate-800 dark:text-slate-200">MMR Rise</strong></p>
                </div>

                <!-- Credential highlights -->
                <div class="space-y-3 bg-slate-50 dark:bg-brand-navy/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  <div class="flex items-center justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                    <span class="text-slate-500 dark:text-slate-400">Experience</span>
                    <span class="text-slate-900 dark:text-white font-semibold">18+ Years Corporate Advisory</span>
                  </div>
                  <div class="flex items-center justify-between py-1 border-b border-slate-200 dark:border-slate-800/80">
                    <span class="text-slate-500 dark:text-slate-400">Keynote Speaker</span>
                    <span class="text-slate-900 dark:text-white font-semibold">100+ Summits & Offsites</span>
                  </div>
                  <div class="flex items-center justify-between py-1">
                    <span class="text-slate-500 dark:text-slate-400">Core Focus</span>
                    <span class="text-brand-accent font-semibold">Transformation & PMO</span>
                  </div>
                </div>

                <div class="mt-6 text-center">
                  <a routerLink="/about-mmr" class="text-xs text-brand-accent hover:underline font-semibold inline-flex items-center gap-1">
                    View Full Executive Bio & Credentials &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- KEY STATS COUNTER BAR -->
    <section class="bg-white dark:bg-brand-navy border-b border-slate-200 dark:border-slate-800 py-10 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
          <div class="p-2">
            <div class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-cinzel">500+</div>
            <div class="text-xs sm:text-sm text-brand-accent font-medium mt-1">C-Suite & Leaders Coached</div>
          </div>
          <div class="p-2">
            <div class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-cinzel">65+</div>
            <div class="text-xs sm:text-sm text-brand-accent font-medium mt-1">Organizations Transformed</div>
          </div>
          <div class="p-2">
            <div class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-cinzel">12,000+</div>
            <div class="text-xs sm:text-sm text-brand-accent font-medium mt-1">Hours of Training Delivered</div>
          </div>
          <div class="p-2">
            <div class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-cinzel">99.4%</div>
            <div class="text-xs sm:text-sm text-brand-accent font-medium mt-1">Client Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CORE CONSULTING SERVICES OVERVIEW -->
    <section class="py-20 bg-white dark:bg-brand-dark transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 dark:bg-brand-blue/10 px-3 py-1 rounded-full border border-blue-200 dark:border-brand-blue/30">
            End-To-End Advisory &bull; MMR Rise
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            MMR Rise Consulting & Coaching Services
          </h2>
          <p class="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            From organizational restructuring and high-stakes PMO setup to confidential 1-on-1 executive mentoring, discover structured frameworks crafted for measurable impact by MMR Rise.
          </p>
        </div>

        <!-- 5 Services Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let s of services"
               class="bg-white dark:bg-slate-900/90 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 shadow-executive hover:shadow-xl hover:border-brand-accent dark:hover:border-brand-accent transition duration-300 flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-amber-50 group-hover:text-amber-800 transition">
                  {{ s.badge }}
                </span>
                <span class="text-xs text-slate-400 font-medium">{{ s.duration }}</span>
              </div>

              <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-blue transition mb-2">
                {{ s.title }}
              </h3>
              <p class="text-xs text-brand-blue font-medium mb-3">
                {{ s.subtitle }}
              </p>
              <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-6">
                {{ s.description }}
              </p>

              <!-- Deliverable bullets preview -->
              <div class="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
                <div *ngFor="let d of s.deliverables.slice(0, 3)" class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span class="text-brand-accent font-bold mt-0.5">&#10003;</span>
                  <span>{{ d }}</span>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <a [routerLink]="['/services']" [fragment]="s.id" class="text-xs font-bold text-slate-900 dark:text-slate-200 hover:text-brand-blue flex items-center gap-1">
                View Full Delivery Scope &rarr;
              </a>
              <a routerLink="/booking" class="text-xs px-3 py-1.5 rounded-lg bg-brand-dark dark:bg-slate-800 text-white hover:bg-brand-blue transition font-medium">
                Book
              </a>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <a routerLink="/services" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-dark dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 font-semibold text-sm transition">
            Browse All Consulting Delivery Information & Frameworks &rarr;
          </a>
        </div>
      </div>
    </section>

    <!-- FEATURED COURSES SECTION (Online & Offline) -->
    <section class="py-20 bg-white dark:bg-brand-dark text-slate-900 dark:text-white border-t border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div class="space-y-3 max-w-2xl">
            <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/15 dark:bg-brand-accent/10 px-3 py-1 rounded-full border border-brand-accent/30">
              Capacity Building & Academy
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Course Sales: <span class="gold-gradient-text">Online & Offline Platforms</span>
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm">
              World-class cohorts, live interactive virtual labs, and in-person executive bootcamps led personally by Mukhlasur Rahaman.
            </p>
          </div>
          <div class="mt-6 md:mt-0">
            <a routerLink="/courses" class="inline-flex items-center text-xs font-semibold text-brand-accent hover:underline">
              Explore All Courses & Upcoming Batches &rarr;
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let c of courses.slice(0, 3)"
               class="bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-brand-navy rounded-2xl p-7 border border-slate-200 dark:border-slate-700/80 shadow-md dark:shadow-2xl flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-xs mb-3">
                <span class="px-2.5 py-1 rounded-full bg-brand-accent/20 text-brand-accent font-semibold">{{ c.category }}</span>
                <span class="text-slate-500 dark:text-slate-400">{{ c.deliveryMode }}</span>
              </div>

              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">{{ c.title }}</h3>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">{{ c.shortDescription }}</p>

              <div class="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mb-6 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <div class="flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Duration:</span>
                  <span class="text-slate-900 dark:text-white font-medium">{{ c.duration }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Format:</span>
                  <span class="text-brand-accent font-medium">{{ c.platform }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500 dark:text-slate-400">Upcoming Batch:</span>
                  <span class="text-slate-900 dark:text-white font-medium">{{ c.upcomingBatch }}</span>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span class="text-xs text-slate-500 dark:text-slate-400 block">Investment</span>
                <span class="text-xl font-extrabold text-brand-accent font-cinzel">৳{{ c.price | number }}</span>
                <span class="text-xs line-through text-slate-400 dark:text-slate-500 ml-1">৳{{ c.originalPrice | number }}</span>
              </div>
              <a routerLink="/courses" class="px-4 py-2 rounded-lg bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-bold text-xs uppercase tracking-wider hover:brightness-110 transition">
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- KEYNOTE & SPEAKING SPOTLIGHT -->
    <section class="py-20 bg-white dark:bg-brand-dark transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-slate-50 dark:bg-gradient-to-r dark:from-brand-navy dark:via-slate-900 dark:to-brand-navy rounded-3xl p-8 sm:p-14 text-slate-900 dark:text-white border border-slate-200 dark:border-transparent shadow-xl relative overflow-hidden">
          <div class="max-w-2xl relative z-10 space-y-4">
            <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">
              Keynote Speaker & Guest Engagements
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Electrify Your Next Corporate Summit or Annual Offsite
            </h2>
            <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Mukhlasur Rahaman has delivered keynotes for leading industry forums, banking summits, and corporate leadership retreats across Bangladesh and Southeast Asia. Book MMR to inspire your leadership corps.
            </p>
            <div class="pt-4 flex flex-wrap gap-4">
              <a routerLink="/speaking" class="px-6 py-3 rounded-xl bg-brand-accent text-brand-dark font-bold text-xs uppercase tracking-wider hover:brightness-110 transition">
                View Keynote Topics & Speaker Kit
              </a>
              <a routerLink="/media" class="px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold text-xs tracking-wide hover:bg-slate-300 dark:hover:bg-slate-700 transition">
                Watch Video Speeches & Podcasts
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PAID BOOKING CALL TO ACTION -->
    <section class="py-16 bg-white dark:bg-brand-navy border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-4xl mx-auto px-4 text-center space-y-5">
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white">
          Ready to Elevate Your Leadership or Transform Your PMO?
        </h2>
        <p class="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
          Schedule a direct 1-on-1 Strategy Discovery Call or an Executive Leadership Deep-Dive with Mukhlasur Rahaman today. Select your preferred date and time on our online booking calendar.
        </p>
        <div class="pt-2">
          <a routerLink="/booking" class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-bold text-sm uppercase tracking-wider shadow-gold-glow hover:brightness-110 hover:scale-105 transition duration-200">
            <span>📅 Go To Paid Booking Calendar</span>
          </a>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  services: ServiceItem[] = [];
  courses: CourseItem[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getServices().subscribe({
      next: (data) => this.services = data,
      error: (err) => console.error(err)
    });

    this.api.getCourses().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error(err)
    });
  }
}

