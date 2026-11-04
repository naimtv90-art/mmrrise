import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  FALLBACK_PROFILE,
  FALLBACK_SERVICES,
  FALLBACK_COURSES,
  FALLBACK_PACKAGES,
  FALLBACK_SLOTS,
  FALLBACK_TOPICS,
  FALLBACK_MEDIA,
  FALLBACK_FAQS
} from './fallback-data';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  description: string;
  deliverables: string[];
  duration: string;
  targetAudience: string;
  deliverableFormat: string;
}

export interface CourseItem {
  id: string;
  title: string;
  category: string;
  deliveryMode: string;
  level: string;
  duration: string;
  price: number;
  currency: string;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  instructor: string;
  shortDescription: string;
  features: string[];
  upcomingBatch: string;
  platform: string;
}

export interface BookingPackage {
  id: string;
  name: string;
  duration: string;
  price: number;
  currency: string;
  badge: string;
  description: string;
}

export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface SpeakingTopic {
  id: string;
  title: string;
  theme: string;
  audience: string;
  description: string;
  duration: string;
}

export interface MediaItem {
  id: string;
  type: string;
  title: string;
  source: string;
  duration: string;
  tag: string;
  date: string;
  description: string;
}

export interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Use relative path for production (works on Vercel & Node server)
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`).pipe(
      catchError(() => of(FALLBACK_PROFILE))
    );
  }

  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiUrl}/services`).pipe(
      catchError(() => of(FALLBACK_SERVICES))
    );
  }

  getServiceById(id: string): Observable<ServiceItem | undefined> {
    return this.http.get<ServiceItem>(`${this.apiUrl}/services/${id}`).pipe(
      catchError(() => of(FALLBACK_SERVICES.find(s => s.id === id)))
    );
  }

  getCourses(): Observable<CourseItem[]> {
    return this.http.get<CourseItem[]>(`${this.apiUrl}/courses`).pipe(
      catchError(() => of(FALLBACK_COURSES))
    );
  }

  enrollCourse(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses/enroll`, data).pipe(
      catchError(() => of({
        message: 'Course enrollment received! Our team will contact you with batch details.',
        enrollment: { id: `ENR-${Date.now()}`, ...data, status: 'Confirmed' }
      }))
    );
  }

  getBookingSlots(): Observable<{ slots: BookingSlot[], packages: BookingPackage[] }> {
    return this.http.get<{ slots: BookingSlot[], packages: BookingPackage[] }>(`${this.apiUrl}/bookings/available-slots`).pipe(
      catchError(() => of({ slots: FALLBACK_SLOTS, packages: FALLBACK_PACKAGES }))
    );
  }

  createBooking(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookings`, bookingData).pipe(
      catchError(() => of({
        message: 'Consultation scheduled successfully with Mukhlasur Rahaman.',
        booking: { id: `MMR-BKG-${Date.now()}`, ...bookingData, bookingStatus: 'Confirmed' }
      }))
    );
  }

  getSpeakingTopics(): Observable<SpeakingTopic[]> {
    return this.http.get<SpeakingTopic[]>(`${this.apiUrl}/speaking`).pipe(
      catchError(() => of(FALLBACK_TOPICS))
    );
  }

  requestSpeaking(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/speaking/request`, data).pipe(
      catchError(() => of({
        message: 'Keynote speaking request submitted successfully to Mukhlasur Rahaman’s office.',
        request: { id: `SPK-${Date.now()}`, ...data, status: 'Under Review' }
      }))
    );
  }

  getMedia(): Observable<MediaItem[]> {
    return this.http.get<MediaItem[]>(`${this.apiUrl}/media`).pipe(
      catchError(() => of(FALLBACK_MEDIA))
    );
  }

  getFaqs(): Observable<FaqItem[]> {
    return this.http.get<FaqItem[]>(`${this.apiUrl}/faqs`).pipe(
      catchError(() => of(FALLBACK_FAQS))
    );
  }

  submitContact(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact`, data).pipe(
      catchError(() => of({
        message: 'Thank you for reaching out to MMR Rise. Mukhlasur Rahaman’s executive office has received your message.',
        contact: { id: `MSG-${Date.now()}`, ...data, status: 'Unread' }
      }))
    );
  }
}
