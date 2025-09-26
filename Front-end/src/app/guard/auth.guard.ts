import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthApiService);

  return authService.verify().pipe(
    // requête renvoit un 200 : mapper le résultat en true
    map(() => true),
    // requête renvoie un 401/403 : Erreur
    catchError(() =>
      of(router.createUrlTree(['/login']))
    )
  );
};