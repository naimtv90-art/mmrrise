import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, BookingPackage, BookingSlot } from '../../services/api.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Header -->
    <section class="bg-white dark:bg-gradient-to-b dark:from-brand-dark dark:via-brand-navy dark:to-brand-dark text-slate-900 dark:text-white py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/15 dark:bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">
            Paid Advisory & Consultation Scheduling
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel text-slate-900 dark:text-white">
            Book a Strategic Consultation
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Direct, confidential 1-on-1 advisory with Mukhlasur Rahaman. Select your consultation tier, choose your preferred slot, and finalize your booking.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Booking Wizard -->
    <section class="py-16 bg-white dark:bg-brand-dark min-h-screen transition-colors duration-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- SUCCESS RECEIPT VIEW -->
        <div *ngIf="confirmedBooking" class="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl mx-auto text-center space-y-6">
          <div class="flex items-center justify-center space-x-2">
            <img src="logo.png" alt="MMR Rise Logo" class="w-10 h-10 object-contain">
            <span class="font-cinzel text-xl font-bold tracking-wider text-slate-900 dark:text-white">MMR <span class="text-brand-accent font-sans font-light">RISE</span></span>
          </div>
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Official MMR Rise Consultation Receipt
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-cinzel mt-3">
              Consultation Scheduled
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Booking Reference ID: <strong class="text-slate-800 dark:text-slate-200">{{ confirmedBooking.id }}</strong></p>
          </div>

          <div class="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-3">
            <div class="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400">Service Package:</span>
              <span class="font-bold text-slate-800 dark:text-slate-200">{{ confirmedBooking.packageName }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400">Client Name:</span>
              <span class="font-bold text-slate-800 dark:text-slate-200">{{ confirmedBooking.clientName }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400">Scheduled Date:</span>
              <span class="font-bold text-brand-blue">{{ confirmedBooking.date }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400">Time Slot:</span>
              <span class="font-bold text-brand-blue">{{ confirmedBooking.timeSlot }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
              <span class="text-slate-500 dark:text-slate-400">Mode:</span>
              <span class="font-bold text-slate-800 dark:text-slate-200">{{ confirmedBooking.mode }}</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-slate-500 dark:text-slate-400">Consultation Fee:</span>
              <span class="font-extrabold text-brand-accent text-sm font-cinzel">৳{{ confirmedBooking.fee | number }} BDT</span>
            </div>
          </div>

          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            A confirmation receipt and meeting link (Google Meet / Zoom) have been registered. Our executive assistant will contact <strong class="text-slate-800 dark:text-slate-200">{{ confirmedBooking.clientEmail }}</strong> with calendar coordinates.
          </p>

          <button (click)="resetBooking()" class="px-8 py-3 bg-brand-dark dark:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-slate-700 transition">
            Book Another Consultation
          </button>
        </div>

        <!-- BOOKING FORM / FLOW -->
        <div *ngIf="!confirmedBooking" class="space-y-12">
          
          <!-- Step 1: Package Selection -->
          <div>
            <div class="mb-6">
              <span class="text-xs font-bold uppercase tracking-wider text-brand-accent bg-slate-900 px-3 py-1 rounded-full">Step 01</span>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-cinzel mt-2">Select Your Consultation Tier</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Choose the format that best addresses your executive or operational goals.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div *ngFor="let pkg of packages"
                   (click)="selectedPackage = pkg"
                   [class.ring-2]="selectedPackage?.id === pkg.id"
                   [class.ring-brand-accent]="selectedPackage?.id === pkg.id"
                   [class.border-brand-accent]="selectedPackage?.id === pkg.id"
                   class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer transition hover:shadow-md flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {{ pkg.badge }}
                    </span>
                    <span class="text-xs text-slate-400 font-medium">{{ pkg.duration }}</span>
                  </div>
                  <h3 class="text-base font-bold text-slate-900 dark:text-white mb-2 font-cinzel">{{ pkg.name }}</h3>
                  <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{{ pkg.description }}</p>
                </div>

                <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span class="text-xl font-extrabold text-slate-900 dark:text-white font-cinzel">৳{{ pkg.price | number }}</span>
                  <span class="text-xs font-bold uppercase tracking-wider"
                        [ngClass]="selectedPackage?.id === pkg.id ? 'text-brand-accent' : 'text-slate-400'">
                    {{ selectedPackage?.id === pkg.id ? '✔ Selected' : 'Select' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Slot & Details Form -->
          <div class="bg-white dark:bg-slate-900/90 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-executive">
            <div class="mb-8">
              <span class="text-xs font-bold uppercase tracking-wider text-brand-accent bg-slate-900 px-3 py-1 rounded-full">Step 02</span>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-cinzel mt-2">Schedule & Provide Executive Details</h2>
            </div>

            <form (ngSubmit)="submitBooking()" class="space-y-6 text-xs">
              
              <!-- Available Slots -->
              <div>
                <label class="block font-bold text-slate-800 dark:text-slate-200 mb-2">Select Date & Time Slot *</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div *ngFor="let slot of slots"
                       (click)="slot.available && selectSlot(slot)"
                       [class.opacity-50]="!slot.available"
                       [class.cursor-not-allowed]="!slot.available"
                       [class.cursor-pointer]="slot.available"
                       [class.border-brand-accent]="selectedSlot?.id === slot.id"
                       class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center transition">
                    <div class="font-bold text-slate-800 dark:text-slate-200 text-xs">{{ slot.date }}</div>
                    <div class="text-[11px] text-brand-blue font-medium mt-0.5">{{ slot.time }}</div>
                    <span *ngIf="!slot.available" class="text-[10px] text-rose-500 font-semibold block mt-1">Booked</span>
                    <span *ngIf="slot.available && selectedSlot?.id !== slot.id" class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-1">Available</span>
                    <span *ngIf="selectedSlot?.id === slot.id" class="text-[10px] text-brand-accent font-bold block mt-1">Selected</span>
                  </div>
                </div>
              </div>

              <!-- Client Information Fields -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Full Name *</label>
                  <input type="text" [(ngModel)]="bookingForm.clientName" name="clientName" required
                         placeholder="e.g. Tariqul Islam"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Organization</label>
                  <input type="text" [(ngModel)]="bookingForm.organization" name="organization"
                         placeholder="e.g. Apex Horizon Ltd"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Official Email Address *</label>
                  <input type="email" [(ngModel)]="bookingForm.clientEmail" name="clientEmail" required
                         placeholder="tariqul@apexgroup.com"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone / WhatsApp Number *</label>
                  <input type="tel" [(ngModel)]="bookingForm.clientPhone" name="clientPhone" required
                         placeholder="+880 1712 345678"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Consultation Delivery Mode *</label>
                  <select [(ngModel)]="bookingForm.mode" name="mode"
                          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
                    <option value="Virtual (Google Meet / Zoom)">Virtual (Google Meet / Zoom HD)</option>
                    <option value="In-Person (Executive Suite, Gulshan-2, Dhaka)">In-Person (Executive Suite, Gulshan-2, Dhaka)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Payment Method *</label>
                  <select [(ngModel)]="bookingForm.paymentMethod" name="paymentMethod"
                          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
                    <option value="bKash Merchant Pay">bKash Merchant Payment</option>
                    <option value="Credit / Debit Card">Credit / Debit Card (Visa, Mastercard, Amex)</option>
                    <option value="Direct Corporate Bank Transfer">Direct Corporate Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Consultation Agenda & Key Topics</label>
                <textarea rows="3" [(ngModel)]="bookingForm.notes" name="notes"
                          placeholder="Briefly state your core organizational dilemma, PMO bottlenecks, or executive leadership questions..."
                          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm"></textarea>
              </div>

              <div class="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span class="text-slate-500 dark:text-slate-400 text-xs block">Consultation Fee</span>
                  <div class="text-2xl font-black text-slate-900 dark:text-white font-cinzel">
                    ৳{{ selectedPackage ? (selectedPackage.price | number) : '15,000' }} <span class="text-xs font-normal text-slate-500 dark:text-slate-400">BDT</span>
                  </div>
                </div>

                <button type="submit" [disabled]="submitting"
                        class="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-brand-accent to-brand-accentLight text-brand-dark font-extrabold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-glow transition flex items-center justify-center">
                  <span *ngIf="!submitting">Confirm & Finalize Paid Booking &rarr;</span>
                  <span *ngIf="submitting">Processing Booking...</span>
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
  packages: BookingPackage[] = [];
  slots: BookingSlot[] = [];
  selectedPackage: BookingPackage | null = null;
  selectedSlot: BookingSlot | null = null;
  submitting = false;
  confirmedBooking: any = null;

  bookingForm = {
    clientName: '',
    organization: '',
    clientEmail: '',
    clientPhone: '',
    mode: 'Virtual (Google Meet / Zoom)',
    paymentMethod: 'bKash Merchant Pay',
    notes: ''
  };

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.api.getBookingSlots().subscribe({
      next: (data) => {
        this.slots = data.slots;
        this.packages = data.packages;
        this.route.queryParams.subscribe(params => {
          if (params['package']) {
            const found = this.packages.find(p => p.id === params['package']);
            if (found) this.selectedPackage = found;
          }
          if (!this.selectedPackage && this.packages.length > 0) {
            this.selectedPackage = this.packages[1] || this.packages[0];
          }
        });
      },
      error: (err) => console.error(err)
    });
  }

  selectSlot(slot: BookingSlot): void {
    this.selectedSlot = slot;
  }

  submitBooking(): void {
    if (!this.selectedPackage) {
      alert('Please select a consultation package tier.');
      return;
    }
    if (!this.selectedSlot) {
      alert('Please select an available date and time slot.');
      return;
    }

    this.submitting = true;
    const payload = {
      packageId: this.selectedPackage.id,
      packageName: this.selectedPackage.name,
      date: this.selectedSlot.date,
      timeSlot: this.selectedSlot.time,
      clientName: this.bookingForm.clientName,
      clientEmail: this.bookingForm.clientEmail,
      clientPhone: this.bookingForm.clientPhone,
      organization: this.bookingForm.organization,
      mode: this.bookingForm.mode,
      paymentMethod: this.bookingForm.paymentMethod,
      topicOfInterest: this.bookingForm.notes,
      consultationFee: this.selectedPackage.price
    };

    this.api.createBooking(payload).subscribe({
      next: (res) => {
        this.submitting = false;
        this.confirmedBooking = res.booking;
        window.scrollTo({ top: 100, behavior: 'smooth' });
      },
      error: (err) => {
        this.submitting = false;
        console.error(err);
        alert('Booking submission error. Please try again or email us.');
      }
    });
  }

  resetBooking(): void {
    this.confirmedBooking = null;
    this.selectedSlot = null;
    this.bookingForm = {
      clientName: '',
      organization: '',
      clientEmail: '',
      clientPhone: '',
      mode: 'Virtual (Google Meet / Zoom)',
      paymentMethod: 'bKash Merchant Pay',
      notes: ''
    };
  }
}
