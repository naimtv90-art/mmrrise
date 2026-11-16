import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, BookingSlot } from '../../services/api.service';

interface DayOption {
  dateStr: string;
  dayName: string;
  dayNum: number;
  monthName: string;
  isFriday: boolean;
  isToday: boolean;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Header Hero -->
    <section class="bg-white dark:bg-gradient-to-b dark:from-brand-dark dark:via-brand-navy dark:to-brand-dark text-slate-900 dark:text-white py-16 lg:py-20 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/15 dark:bg-brand-accent/20 border border-brand-accent/30 text-brand-dark dark:text-brand-accent text-xs font-bold uppercase tracking-widest">
            <span class="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            20-Minute Executive Advisory
          </div>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel text-slate-900 dark:text-white">
            Schedule a Consultation
          </h1>
          <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Select a 20-minute strategic advisory slot with <strong class="text-slate-900 dark:text-white font-medium">Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM</strong>. Available <strong class="text-brand-accent">Saturday to Thursday</strong> from <strong class="text-slate-900 dark:text-white">9:00 AM to 9:00 PM BST</strong> (Friday is closed).
          </p>
          <div class="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-medium">
              ✔ Sat &ndash; Thu Working Days
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
              ⏰ 9:00 AM &ndash; 9:00 PM BST
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800 font-medium">
              ✖ Friday Closed
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-medium">
              📅 Google Calendar Sync
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Booking Section -->
    <section class="py-16 bg-brand-surface dark:bg-brand-dark min-h-screen transition-colors duration-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- ============================================== -->
        <!-- CONFIRMED BOOKING SUCCESS RECEIPT VIEW -->
        <!-- ============================================== -->
        <div *ngIf="confirmedBooking" class="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl mx-auto text-center space-y-6 animate-fadeIn">
          <div class="flex items-center justify-center space-x-2">
            <img src="logo.png" alt="MMR Rise Logo" class="w-12 h-12 object-contain">
            <span class="font-cinzel text-xl font-bold tracking-wider text-slate-900 dark:text-white">MMR <span class="text-brand-accent font-sans font-light">RISE</span></span>
          </div>

          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 inline-block">
              ✔ 20-Minute Consultation Scheduled
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-cinzel mt-4">
              Session Confirmed
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Booking Ref ID: <strong class="text-slate-900 dark:text-white font-mono">{{ confirmedBooking.id }}</strong></p>
          </div>

          <!-- Meeting Summary Box -->
          <div class="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-3">
            <div class="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400">Host:</span>
              <span class="font-bold text-slate-900 dark:text-white">Mukhlesur Rahman, PMP, PgMP, PfMP, PCC, DTM</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400">Scheduled Date:</span>
              <span class="font-bold text-brand-blue">{{ confirmedBooking.date }} ({{ confirmedBooking.weekday || 'Working Day' }})</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400">20-Minute Time Slot:</span>
              <span class="font-bold text-brand-blue text-sm">{{ confirmedBooking.timeSlot }}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400">Client Name:</span>
              <span class="font-bold text-slate-900 dark:text-white">{{ confirmedBooking.clientName }}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400">Client Email:</span>
              <span class="font-medium text-slate-700 dark:text-slate-300">{{ confirmedBooking.clientEmail }}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400">Delivery Mode:</span>
              <span class="font-semibold text-slate-800 dark:text-slate-200">{{ confirmedBooking.mode }}</span>
            </div>
            <div *ngIf="confirmedBooking.notes" class="py-1">
              <span class="text-slate-500 dark:text-slate-400 block mb-1">Agenda / Discussion Topic:</span>
              <span class="text-slate-800 dark:text-slate-200 italic font-normal">&ldquo;{{ confirmedBooking.notes }}&rdquo;</span>
            </div>
          </div>

          <!-- Calendar Add & Download Buttons -->
          <div class="space-y-3 pt-2">
            <a *ngIf="confirmedBooking.googleCalendarUrl"
               [href]="confirmedBooking.googleCalendarUrl"
               target="_blank"
               rel="noopener noreferrer"
               class="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>
              <span>Add to Google Calendar</span>
            </a>

            <a [href]="getIcsDownloadUrl(confirmedBooking.id)"
               class="w-full py-3 px-6 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2">
              <svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Download .ICS Calendar File (Apple / Outlook)</span>
            </a>
          </div>

          <!-- Notification status info -->
          <div class="bg-amber-50 dark:bg-brand-navy/60 border border-amber-200 dark:border-brand-accent/30 rounded-xl p-4 text-xs text-left space-y-1.5">
            <div class="font-bold text-amber-900 dark:text-brand-accent flex items-center gap-1.5">
              <span>📧 Notification Dispatched</span>
            </div>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
              An email notification has been triggered to the host desk (<strong>mmrshohagbd&#64;gmail.com</strong>) with 1-click confirmation and calendar sync. A confirmation receipt has also been dispatched to <strong>{{ confirmedBooking.clientEmail }}</strong>.
            </p>
          </div>

          <div class="pt-4">
            <button (click)="resetBooking()" class="px-8 py-3 bg-brand-navy dark:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition">
              Book Another 20-Min Slot
            </button>
          </div>
        </div>

        <!-- ============================================== -->
        <!-- INTERACTIVE BOOKING WIZARD -->
        <!-- ============================================== -->
        <div *ngIf="!confirmedBooking" class="space-y-10">

          <!-- STEP 1: Date Selection (Saturday to Thursday) -->
          <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-brand-accent bg-brand-navy dark:bg-slate-800 px-3 py-1 rounded-full border border-brand-accent/30">
                  Step 01
                </span>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-cinzel mt-2">
                  Select Consultation Date
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  Operating days: Saturday through Thursday (Friday is closed).
                </p>
              </div>

              <!-- Manual Date Input for quick jump -->
              <div class="flex items-center gap-2">
                <label class="text-xs font-medium text-slate-600 dark:text-slate-400">Jump to date:</label>
                <input
                  type="date"
                  [min]="minDateStr"
                  [(ngModel)]="selectedDate"
                  (change)="onDateChanged()"
                  class="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-brand-accent focus:outline-none"
                />
              </div>
            </div>

            <!-- 14-Day Date Carousel / Pills -->
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
              <button
                *ngFor="let day of upcomingDays"
                (click)="!day.isFriday && selectDate(day.dateStr)"
                [disabled]="day.isFriday"
                [ngClass]="{
                  'opacity-40 bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 cursor-not-allowed': day.isFriday,
                  'border-brand-accent bg-amber-50/70 dark:bg-brand-navy shadow-md ring-2 ring-brand-accent/40 text-brand-dark dark:text-white': selectedDate === day.dateStr && !day.isFriday,
                  'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-brand-accent text-slate-700 dark:text-slate-200 cursor-pointer': selectedDate !== day.dateStr && !day.isFriday
                }"
                class="p-3 rounded-2xl border text-center transition-all duration-150 flex flex-col items-center justify-center">
                <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {{ day.dayName }}
                </span>
                <span class="text-lg font-black my-0.5" [ngClass]="{'text-brand-accent': selectedDate === day.dateStr && !day.isFriday}">
                  {{ day.dayNum }}
                </span>
                <span class="text-[10px] text-slate-400">
                  {{ day.monthName }}
                </span>
                <span *ngIf="day.isFriday" class="text-[9px] font-bold uppercase text-rose-500 mt-1">
                  Closed
                </span>
                <span *ngIf="day.isToday && !day.isFriday" class="text-[9px] font-bold uppercase text-brand-blue mt-1">
                  Today
                </span>
              </button>
            </div>

            <!-- Friday Warning Notice -->
            <div *ngIf="isFridaySelected" class="mt-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-3">
              <span class="text-base">⚠️</span>
              <div>
                <strong>Friday is a non-working day.</strong> MMR Rise advisory sessions operate Saturday through Thursday from 9:00 AM to 9:00 PM BST. Please select any day between Saturday and Thursday.
              </div>
            </div>
          </div>

          <!-- STEP 2: 20-Minute Time Slot Picker -->
          <div *ngIf="!isFridaySelected" class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-brand-accent bg-brand-navy dark:bg-slate-800 px-3 py-1 rounded-full border border-brand-accent/30">
                  Step 02
                </span>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-cinzel mt-2">
                  Select 20-Minute Slot
                </h2>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  Showing available 20-minute slots for <strong class="text-slate-900 dark:text-white">{{ selectedDateWeekday }}, {{ selectedDate }}</strong> (9:00 AM &ndash; 9:00 PM BST).
                </p>
              </div>

              <!-- Period Filter Tabs -->
              <div class="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
                <button
                  *ngFor="let p of periodFilters"
                  (click)="activePeriod = p.id"
                  [ngClass]="{
                    'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm': activePeriod === p.id,
                    'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white': activePeriod !== p.id
                  }"
                  class="px-3 py-1.5 rounded-lg transition text-[11px]">
                  {{ p.label }}
                </button>
              </div>
            </div>

            <!-- Loading indicator -->
            <div *ngIf="loadingSlots" class="py-12 text-center text-xs text-slate-500">
              <div class="animate-spin w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full mx-auto mb-3"></div>
              Checking real-time slot availability for {{ selectedDate }}...
            </div>

            <!-- Slots Grid -->
            <div *ngIf="!loadingSlots" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              <button
                *ngFor="let slot of filteredSlots"
                (click)="slot.available && selectSlot(slot)"
                [disabled]="!slot.available"
                [ngClass]="{
                  'opacity-40 bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-400 cursor-not-allowed': !slot.available,
                  'border-brand-accent bg-amber-50 dark:bg-brand-navy shadow-md ring-2 ring-brand-accent/40 text-brand-dark dark:text-white font-bold': selectedSlot?.id === slot.id,
                  'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-brand-accent hover:shadow text-slate-800 dark:text-slate-200 cursor-pointer': slot.available && selectedSlot?.id !== slot.id
                }"
                class="p-3 rounded-xl border text-center transition-all duration-150 flex flex-col justify-between items-center min-h-[72px]">
                
                <span class="text-xs font-bold leading-tight">
                  {{ slot.time }}
                </span>

                <div class="mt-1 flex items-center gap-1">
                  <span *ngIf="slot.available && selectedSlot?.id !== slot.id" class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    ● Available
                  </span>
                  <span *ngIf="selectedSlot?.id === slot.id" class="text-[10px] text-brand-accent font-bold">
                    ✔ Selected
                  </span>
                  <span *ngIf="!slot.available" class="text-[10px] text-rose-500 font-medium">
                    Booked
                  </span>
                </div>
              </button>
            </div>

            <div *ngIf="!loadingSlots && filteredSlots.length === 0" class="py-8 text-center text-xs text-slate-500">
              No slots available in this time period. Please select another filter or another date.
            </div>

            <!-- Selected Slot Confirmation Strip -->
            <div *ngIf="selectedSlot" class="mt-6 p-4 rounded-2xl bg-amber-50/80 dark:bg-brand-navy border border-brand-accent/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-full bg-brand-accent text-brand-dark font-black flex items-center justify-center text-sm">⏰</span>
                <div>
                  <span class="text-slate-500 dark:text-slate-400 block text-[11px]">Selected 20-Minute Slot:</span>
                  <strong class="text-slate-900 dark:text-white text-sm">{{ selectedSlot.time }} &bull; {{ selectedDateWeekday }}, {{ selectedDate }}</strong>
                </div>
              </div>
              <span class="text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 text-[11px]">
                Slot Locked &bull; Proceed to Step 03
              </span>
            </div>
          </div>

          <!-- STEP 3: Client Details Form -->
          <div *ngIf="!isFridaySelected" class="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="mb-6">
              <span class="text-xs font-bold uppercase tracking-wider text-brand-accent bg-brand-navy dark:bg-slate-800 px-3 py-1 rounded-full border border-brand-accent/30">
                Step 03
              </span>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-cinzel mt-2">
                Executive & Contact Details
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Provide your coordinates for calendar invitation and Google Meet connection.
              </p>
            </div>

            <form (ngSubmit)="submitBooking()" class="space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    [(ngModel)]="bookingForm.clientName"
                    name="clientName"
                    required
                    placeholder="e.g. Tariqul Islam"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    [(ngModel)]="bookingForm.organization"
                    name="organization"
                    placeholder="e.g. Apex Horizon Ltd"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Official Email Address *</label>
                  <input
                    type="email"
                    [(ngModel)]="bookingForm.clientEmail"
                    name="clientEmail"
                    required
                    placeholder="tariqul@organization.com"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    [(ngModel)]="bookingForm.clientPhone"
                    name="clientPhone"
                    required
                    placeholder="+880 1712 345678"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Consultation Delivery Mode *</label>
                  <select
                    [(ngModel)]="bookingForm.mode"
                    name="mode"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none">
                    <option value="Virtual (Google Meet / Zoom HD)">Virtual (Google Meet / Zoom HD)</option>
                    <option value="In-Person (Executive Suite, Gulshan-2, Dhaka)">In-Person (Executive Suite, Gulshan-2, Dhaka)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Session Duration</label>
                  <input
                    type="text"
                    disabled
                    value="20 Minutes (Standard Executive Advisory)"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-sm font-semibold cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Consultation Agenda / Key Dilemma</label>
                <textarea
                  rows="3"
                  [(ngModel)]="bookingForm.notes"
                  name="notes"
                  placeholder="State your core strategic dilemma, leadership decision, PMO governance questions..."
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"></textarea>
              </div>

              <div class="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span class="text-xs text-slate-500 dark:text-slate-400 block">Advisory Session</span>
                  <div class="text-sm font-bold text-slate-900 dark:text-white">
                    20-Minute Strategic Session &bull; 
                    <span *ngIf="selectedSlot" class="text-brand-blue">{{ selectedSlot.time }}</span>
                    <span *ngIf="!selectedSlot" class="text-rose-500 font-normal">Select a slot in Step 02</span>
                  </div>
                </div>

                <button
                  type="submit"
                  [disabled]="submitting || !selectedSlot"
                  class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-glow transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  <span *ngIf="!submitting">Confirm 20-Min Booking & Sync Calendar &rarr;</span>
                  <span *ngIf="submitting">Scheduling Session...</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  `
})
export class BookingComponent implements OnInit {
  selectedDate: string = '';
  selectedDateWeekday: string = '';
  minDateStr: string = '';
  isFridaySelected: boolean = false;
  
  upcomingDays: DayOption[] = [];
  slots: BookingSlot[] = [];
  selectedSlot: BookingSlot | null = null;
  loadingSlots: boolean = false;
  submitting: boolean = false;
  confirmedBooking: any = null;

  activePeriod: string = 'all';

  periodFilters = [
    { id: 'all', label: 'All Slots (36)' },
    { id: 'morning', label: 'Morning (9 AM - 12 PM)' },
    { id: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
    { id: 'evening', label: 'Evening (5 PM - 9 PM)' }
  ];

  bookingForm = {
    clientName: '',
    organization: '',
    clientEmail: '',
    clientPhone: '',
    mode: 'Virtual (Google Meet / Zoom HD)',
    notes: ''
  };

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDateStr = this.formatDate(today);

    this.buildUpcomingDays();

    // Default to today or next Saturday if today is Friday
    let initialDate = new Date();
    if (initialDate.getDay() === 5) { // Friday
      initialDate.setDate(initialDate.getDate() + 1); // Saturday
    }
    this.selectedDate = this.formatDate(initialDate);

    this.onDateChanged();
  }

  buildUpcomingDays(): void {
    this.upcomingDays = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const current = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(current);
      d.setDate(current.getDate() + i);

      const isFri = d.getDay() === 5;
      const isToday = i === 0;

      this.upcomingDays.push({
        dateStr: this.formatDate(d),
        dayName: dayNames[d.getDay()],
        dayNum: d.getDate(),
        monthName: monthNames[d.getMonth()],
        isFriday: isFri,
        isToday
      });
    }
  }

  formatDate(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  selectDate(dateStr: string): void {
    this.selectedDate = dateStr;
    this.onDateChanged();
  }

  onDateChanged(): void {
    if (!this.selectedDate) return;

    const [y, m, d] = this.selectedDate.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayOfWeek = dateObj.getDay();

    const fullDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.selectedDateWeekday = fullDayNames[dayOfWeek];

    // Check if Friday
    if (dayOfWeek === 5) {
      this.isFridaySelected = true;
      this.slots = [];
      this.selectedSlot = null;
      return;
    }

    this.isFridaySelected = false;
    this.selectedSlot = null;
    this.fetchSlotsForDate(this.selectedDate);
  }

  fetchSlotsForDate(dateStr: string): void {
    this.loadingSlots = true;
    this.api.getSlotsForDate(dateStr).subscribe({
      next: (res) => {
        this.loadingSlots = false;
        if (res.isFriday) {
          this.isFridaySelected = true;
          this.slots = [];
        } else {
          this.slots = res.slots || [];
          this.selectedDateWeekday = res.weekday || this.selectedDateWeekday;
        }
      },
      error: (err) => {
        this.loadingSlots = false;
        console.error('Error fetching slots:', err);
      }
    });
  }

  get filteredSlots(): BookingSlot[] {
    if (this.activePeriod === 'all') return this.slots;
    return this.slots.filter(s => s.period === this.activePeriod);
  }

  selectSlot(slot: BookingSlot): void {
    this.selectedSlot = slot;
  }

  submitBooking(): void {
    if (!this.selectedSlot) {
      alert('Please select an available 20-minute time slot.');
      return;
    }
    if (!this.bookingForm.clientName || !this.bookingForm.clientEmail || !this.bookingForm.clientPhone) {
      alert('Please fill out all required fields: Name, Email, and Phone number.');
      return;
    }

    this.submitting = true;
    const payload = {
      packageId: 'pkg-20min-advisory',
      packageName: '20-Minute Strategic Consultation',
      date: this.selectedDate,
      timeSlot: this.selectedSlot.time,
      clientName: this.bookingForm.clientName,
      clientEmail: this.bookingForm.clientEmail,
      clientPhone: this.bookingForm.clientPhone,
      organization: this.bookingForm.organization,
      mode: this.bookingForm.mode,
      notes: this.bookingForm.notes,
      fee: 5000
    };

    this.api.createBooking(payload).subscribe({
      next: (res) => {
        this.submitting = false;
        this.confirmedBooking = res.booking;
        window.scrollTo({ top: 120, behavior: 'smooth' });
      },
      error: (err) => {
        this.submitting = false;
        console.error(err);
        const errorMsg = err?.error?.error || 'Booking submission error. Please try again or email us.';
        alert(errorMsg);
      }
    });
  }

  getIcsDownloadUrl(bookingId: string): string {
    return `/api/bookings/${bookingId}/calendar.ics`;
  }

  resetBooking(): void {
    this.confirmedBooking = null;
    this.selectedSlot = null;
    this.bookingForm = {
      clientName: '',
      organization: '',
      clientEmail: '',
      clientPhone: '',
      mode: 'Virtual (Google Meet / Zoom HD)',
      notes: ''
    };
    this.onDateChanged();
  }
}
