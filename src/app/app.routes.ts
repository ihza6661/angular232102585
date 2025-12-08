import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Admin } from './admin/admin';
import { Footer } from './footer/footer';
import { Dashboard2 } from './dashboard2/dashboard2';
import { Dashboard3 } from './dashboard3/dashboard3';
import { Forex } from './forex/forex';
import { Mahasiswa } from './mahasiswa/mahasiswa';
import { Logout } from './logout/logout';
import { otentikasiGuard } from './otentikasi-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard, canActivate: [otentikasiGuard] },
  { path: 'dashboard2', component: Dashboard2, canActivate: [otentikasiGuard] },
  { path: 'dashboard3', component: Dashboard3 },
  { path: 'forex', component: Forex, canActivate: [otentikasiGuard] },
  { path: 'admin', component: Admin },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'footer', component: Footer },
  { path: 'mahasiswa', component: Mahasiswa, canActivate: [otentikasiGuard] },
  { path: 'logout', component: Logout },
];
