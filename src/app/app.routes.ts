import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Admin } from './admin/admin';
import { Footer } from './footer/footer';


export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "dashboard", component: Dashboard },
  { path: "admin", component: Admin },
  { path: "login", component: Login },
  { path: "signup", component: Signup },
  { path: "footer", component: Footer }
];
