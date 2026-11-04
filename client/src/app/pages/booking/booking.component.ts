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
    <section class="bg-gradient-to-b from-brand-dark via-brand-navy to-brand-dark text-white py-16 lg:py-24 border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl space-y-4">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">
            Paid Advisory & Consultation Scheduling
          </span>
          <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight font-cinzel">
            Book a Strategic Consultation
          </h1>
          <p class="text-lg text-slate-300 font-light leading-relaxed">
            Direct, confidential 1-on-1 advisory with Mukhlasur Rahaman. Select your consultation tier, choose your preferred slot, and finalize your booking.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Booking Wizard -->
    <section class="py-16 bg-slate-50 min-h-screen">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- SUCCESS RECEIPT VIEW -->
        <div *ngIf="confirmedBooking" class="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl max-w-2xl mx-auto text-center space-y-6">
          <div class="flex items-center justify-center space-x-2">
            <img src="logo.png" alt="MMR Rise Logo" class="w-10 h-10 object-contain">
            <span class="font-cinzel text-xl font-bold tracking-wider text-brand-dark">MMR <span class="text-brand-accent font-sans font-light">RISE</span></span>
          </div>
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Official MMR Rise Consultation Receipt
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-cinzel mt-3">
              Consultation Scheduled
            </h2>
            <p class="text-xs text-slate-500 mt-1">Booking Reference ID: <strong class="text-slate-800">{{ confirmedBooking.id }}</strong></p>
          </div>

          <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left text-xs space-y-3">
            <div class="flex justify-between py-1 border-b border-slate-200">
              <span class="text-slate-500">Service Package:</span>
              <span class="font-bold text-slate-800">{{ confirmedBooking.packageName }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200">
              <span class="text-slate-500">Client Name:</span>
              <span class="font-bold text-slate-800">{{ confirmedBooking.clientName }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200">
              <span class="text-slate-500">Scheduled Date:</span>
              <span class="font-bold text-brand-blue">{{ confirmedBooking.date }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200">
              <span class="text-slate-500">Time Slot:</span>
              <span class="font-bold text-brand-blue">{{ confirmedBooking.timeSlot }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200">
              <span class="text-slate-500">Mode:</span>
              <span class="font-bold text-slate-800">{{ confirmedBooking.mode }}</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-slate-500">Consultation Fee:</span>
              <span class="font-extrabold text-brand-accent text-sm font-cinzel">৳{{ confirmedBooking.fee | number }} BDT</span>
            </div>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed">
            A confirmation receipt and meeting link (Google Meet / Zoom) have been registered. Our executive assistant will contact <strong class="text-slate-800">{{ confirmedBooking.clientEmail }}</strong> with calendar coordinates.
          </p>

          <button (click)="resetBooking()" class="px-8 py-3 bg-brand-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition">
            Book Another Consultation
          </button>
        </div>

        <!-- BOOKING FORM / FLOW -->
        <div *ngIf="!confirmedBooking" class="space-y-12">
          
          <!-- Step 1: Package Selection -->
          <div>
            <div class="mb-6">
              <span class="text-xs font-bold uppercase tracking-wider text-brand-accent bg-slate-900 px-3 py-1 rounded-full">Step 01</span>
              <h2 class="text-2xl font-bold text-slate-900 font-cinzel mt-2">Select Your Consultation Tier</h2>
              <p class="text-xs text-slate-500">Choose the format that best addresses your executive or operational goals.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div *ngFor="let pkg of packages"
                   (click)="selectedPackage = pkg"
                   [class.ring-2]="selectedPackage?.id === pkg.id"
                   [class.ring-brand-accent]="selectedPackage?.id === pkg.id"
                   [class.border-brand-accent]="selectedPackage?.id === pkg.id"
                   [class.bg-amber-50]="selectedPackage?.id === pkg.id"
                   class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm cursor-pointer transition hover:shadow-md flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {{ pkg.badge }}
                    </span>
                    <span class="text-xs text-slate-400 font-medium">{{ pkg.duration }}</span>
                  </div>
                  <h3 class="text-base font-bold text-slate-900 mb-2 font-cinzel">{{ pkg.name }}</h3>
                  <p class="text-xs text-slate-600 leading-relaxed mb-4">{{ pkg.description }}</p>
                </div>

                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-xl font-extrabold text-slate-900 font-cinzel">৳{{ pkg.price | number }}</span>
                  <span class="text-xs font-bold uppercase tracking-wider"
                        [ngClass]="selectedPackage?.id === pkg.id ? 'text-brand-accent' : 'text-slate-400'">
                    {{ selectedPackage?.id === pkg.id ? '✔ Selected' : 'Select' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Slot & Details Form -->
          <div class="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-executive">
            <div class="mb-8">
              <span class="text-xs font-bold uppercase tracking-wider text-brand-accent bg-slate-900 px-3 py-1 rounded-full">Step 02</span>
              <h2 class="text-2xl font-bold text-slate-900 font-cinzel mt-2">Schedule & Provide Executive Details</h2>
            </div>

            <form (ngSubmit)="submitBooking()" class="space-y-6 text-xs">
              
              <!-- Available Slots -->
              <div>
                <label class="block font-bold text-slate-800 mb-2">Select Date & Time Slot *</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div *ngFor="let slot of slots"
                       (click)="slot.available && selectSlot(slot)"
                       [class.opacity-50]="!slot.available"
                       [class.cursor-not-allowed]="!slot.available"
                       [class.cursor-pointer]="slot.available"
                       [class.border-brand-accent]="selectedSlot?.id === slot.id"
                       [class.bg-amber-50]="selectedSlot?.id === slot.id"
                       class="p-3.5 rounded-xl border border-slate-200 text-center transition">
                    <div class="font-bold text-slate-800 text-xs">{{ slot.date }}</div>
                    <div class="text-[11px] text-brand-blue font-medium mt-0.5">{{ slot.time }}</div>
                    <span *ngIf="!slot.available" class="text-[10px] text-rose-500 font-semibold block mt-1">Booked</span>
                    <span *ngIf="slot.available && selectedSlot?.id !== slot.id" class="text-[10px] text-emerald-600 font-semibold block mt-1">Available</span>
                    <span *ngIf="selectedSlot?.id === slot.id" class="text-[10px] text-brand-accent font-bold block mt-1">Selected</span>
                  </div>
                </div>
              </div>

              <!-- Client Information Fields -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input type="text" [(ngModel)]="bookingForm.clientName" name="clientName" required
                         placeholder="e.g. Tariqul Islam"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Company / Organization</label>
                  <input type="text" [(ngModel)]="bookingForm.organization" name="organization"
                         placeholder="e.g. Apex Horizon Ltd"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Official Email Address *</label>
                  <input type="email" [(ngModel)]="bookingForm.clientEmail" name="clientEmail" required
                         placeholder="tariqul@apexgroup.com"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                  <input type="tel" [(ngModel)]="bookingForm.clientPhone" name="clientPhone" required
                         placeholder="+880 1712 345678"
                         class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm">
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Consultation Delivery Mode *</label>
                  <select [(ngModel)]="bookingForm.mode" name="mode"
                          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white">
                    <option value="Virtual (Google Meet / Zoom)">Virtual (Google Meet / Zoom HD)</option>
                    <option value="In-Person (Executive Suite, Gulshan-2, Dhaka)">In-Person (Executive Suite, Gulshan-2, Dhaka)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Payment Method *</label>
                  <select [(ngModel)]="bookingForm.paymentMethod" name="paymentMethod"
                          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm bg-white">
                    <option value="bKash Merchant Pay">bKash Merchant Payment</option>
                    <option value="Credit / Debit Card">Credit / Debit Card (Visa, Mastercard, Amex)</option>
                    <option value="Direct Corporate Bank Transfer">Direct Corporate Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block font-semibold text-slate-700 mb-1">Consultation Agenda & Key Topics</label>
                <textarea rows="3" [(ngModel)]="bookingForm.notes" name="notes"
                          placeholder="Briefly state your core organizational dilemma, PMO bottlenecks, or executive leadership questions..."
                          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm"></textarea>
              </div>

              <!-- Price Summary & Checkout Action -->
              <div class="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span class="text-slate-500 text-xs block">Consultation Fee</span>
                  <div class="text-2xl font-black text-slate-900 font-cinzel">
                    ৳{{ selectedPackage ? (selectedPackage.price | number) : '15,000' }} <span class="text-xs font-normal text-slate-500">BDT</span>
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
    clientEmail: '',
    clientPhone: '',
    organization: '',
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
        if (this.packages.length > 0) {
          this.selectedPackage = this.packages[1] || this.packages[0];
        }
        const available = this.slots.find(s => s.available);
        if (available) {
          this.selectedSlot = available;
        }
      },
      error: (err) => console.error(err)
    });
  }

  selectSlot(slot: BookingSlot): void {
    this.selectedSlot = slot;
  }

  submitBooking(): void {
    if (!this.bookingForm.clientName || !this.bookingForm.clientEmail || !this.bookingForm.clientPhone) {
      alert('Please fill out your full name, email, and phone number.');
      return;
    }
    if (!this.selectedSlot) {
      alert('Please select an available appointment slot.');
      return;
    }

    this.submitting = true;
    const payload = {
      packageId: this.selectedPackage ? this.selectedPackage.id : 'pkg-executive',
      packageName: this.selectedPackage ? this.selectedPackage.name : 'Executive Consultation',
      fee: this.selectedPackage ? this.selectedPackage.price : 15000,
      date: this.selectedSlot.date,
      timeSlot: this.selectedSlot.time,
      ...this.bookingForm
    };

    this.api.createBooking(payload).subscribe({
      next: (res) => {
        this.submitting = false;
        this.confirmedBooking = res.booking;
      },
      error: (err) => {
        this.submitting = false;
        alert('Could not submit booking. Please check connection and try again.');
      }
    });
  }

  resetBooking(): void {
    this.confirmedBooking = null;
    this.bookingForm = {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      organization: '',
      mode: 'Virtual (Google Meet / Zoom)',
      paymentMethod: 'bKash Merchant Pay',
      notes: ''
    };
  }
}
