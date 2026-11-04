import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${this.apiUrl}/services`);
  }

  getServiceById(id: string): Observable<ServiceItem> {
    return this.http.get<ServiceItem>(`${this.apiUrl}/services/${id}`);
  }

  getCourses(): Observable<CourseItem[]> {
    return this.http.get<CourseItem[]>(`${this.apiUrl}/courses`);
  }

  enrollCourse(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/courses/enroll`, data);
  }

  getBookingSlots(): Observable<{ slots: BookingSlot[], packages: BookingPackage[] }> {
    return this.http.get<{ slots: BookingSlot[], packages: BookingPackage[] }>(`${this.apiUrl}/bookings/available-slots`);
  }

  createBooking(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookings`, bookingData);
  }

  getSpeakingTopics(): Observable<SpeakingTopic[]> {
    return this.http.get<SpeakingTopic[]>(`${this.apiUrl}/speaking`);
  }

  requestSpeaking(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/speaking/request`, data);
  }

  getMedia(): Observable<MediaItem[]> {
    return this.http.get<MediaItem[]>(`${this.apiUrl}/media`);
  }

  getFaqs(): Observable<FaqItem[]> {
    return this.http.get<FaqItem[]>(`${this.apiUrl}/faqs`);
  }

  submitContact(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact`, data);
  }
}

