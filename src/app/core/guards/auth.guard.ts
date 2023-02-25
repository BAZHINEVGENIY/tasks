import { inject, Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { FacadeAuthService } from '../../pages/auth/store/facade.auth.service';

export interface isLoggedIn {
  isLoggedIn$: Observable<boolean>;
}

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private readonly authStore: isLoggedIn = inject(FacadeAuthService);

  canActivate(): Observable<boolean> {
    return this.authStore.isLoggedIn$.pipe(
      filter((isLoggenIn) => isLoggenIn !== null)
    );
  }
}
