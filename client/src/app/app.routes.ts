import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutMmrComponent } from './pages/about-mmr/about-mmr.component';
import { AboutRiseComponent } from './pages/about-rise/about-rise.component';
import { ServicesComponent } from './pages/services/services.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { SpeakingComponent } from './pages/speaking/speaking.component';
import { MediaComponent } from './pages/media/media.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'MMR Rise | Mukhlasur Rahaman - Executive Coach & Consultant' },
  { path: 'about-mmr', component: AboutMmrComponent, title: 'About Mukhlasur Rahaman | Executive Leadership' },
  { path: 'about-rise', component: AboutRiseComponent, title: 'About MMR Rise | Firm Vision & Methodology' },
  { path: 'services', component: ServicesComponent, title: 'Consulting & Coaching Services | MMR Rise' },
  { path: 'courses', component: CoursesComponent, title: 'Course Sales - Online & Offline | MMR Academy' },
  { path: 'speaking', component: SpeakingComponent, title: 'Speaking Engagements & Keynotes | Mukhlasur Rahaman' },
  { path: 'media', component: MediaComponent, title: 'Media & Thought Leadership | MMR Rise' },
  { path: 'booking', component: BookingComponent, title: 'Paid Consultation Booking | MMR Rise' },
  { path: 'contact', component: ContactComponent, title: 'Contact & FAQ | MMR Rise' },
  { path: '**', redirectTo: '' }
];
