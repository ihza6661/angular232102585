import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const otentikasiGuard: CanActivateFn = (route, state) => {
  console.log('Otentikasi Berhasil');

  var userId = inject(CookieService).get('userId');
  console.log('userId: ' + userId);

  if (userId == null) {
    // Anggap belum Login
  } else if (userId == undefined) {
    // Anggap belum Login
  } else if (userId == '') {
    // Anggap belum Login
  } else {
    return true; // sudah login
  }

  inject(Router).navigate(['/login']);
  return false;
};
