import { Routes } from '@angular/router';
import { HomeComponent } from './pages/1-home/home.component';
import { LoginComponent } from './pages/2-login/login.component';
import { EventComponent } from './pages/3-event/event.component';
import { MatchedFacesComponent } from './pages/4-matched-faces/matched-faces.component';
import { AdminEventsComponent } from './pages/6-admin-events/admin-events.component';
import { AdminAccountComponent } from './pages/8-admin-account/admin-account.component';
import { AdminSingleEventComponent } from './pages/7-admin-single-event/admin-single-event.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'event', component: EventComponent },
  { path: 'match', component: MatchedFacesComponent },
  { path: 'admin/events', component: AdminEventsComponent },
  { path: 'admin/event/:eventId', component: AdminSingleEventComponent },
  { path: 'admin/account', component: AdminAccountComponent },
];
