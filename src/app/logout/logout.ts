import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.html',
  styleUrls: ['./logout.css'],
  standalone: true,
})
export class Logout {
  // inject dependencies with proper types
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // delete all cookies
    this.cookieService.deleteAll();

    // redirect to login
    this.router.navigate(['/login']);
  }
}
