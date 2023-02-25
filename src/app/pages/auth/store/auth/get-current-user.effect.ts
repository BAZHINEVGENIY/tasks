import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../../core/services/auth.service';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthUserInterface } from '../../types/users.interface';
import { StorageService } from '../../../../core/services/storage.service';

import { Router } from '@angular/router';
import { authActions } from './action';

@Injectable()
export class GetCurrentUserEffect {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly storage = inject(StorageService);
  private readonly router = inject(Router);

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        if (!this.storage.get('accessToken'))
          return of(authActions.getCurrentUserFailure());

        return this.authService.getCurrentUser.pipe(
          map((currentUser: AuthUserInterface) =>
            authActions.getCurrentUserSuccess({ currentUser })
          ),
          catchError(() => of(authActions.getCurrentUserFailure()))
        );
      })
    )
  );

  failure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.getCurrentUserFailure),
        tap(() => {
          this.storage.clear();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
