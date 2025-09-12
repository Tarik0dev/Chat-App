import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
      if (decodedToken.exp < currentTime) {
        // Token expiré
        localStorage.removeItem('token');
        router.navigate(['/login']);
        return false;
      }
      return true; // Token valide
    } catch (error) {
      // Token malformé ou invalide
      localStorage.removeItem('token');
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};