import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../../core/services/auth.service';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthUserInterface } from '../../types/users.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../../../core/services/storage.service';
import { Router } from '@angular/router';
import { authActions } from './action';

@Injectable()
export class RegisterEffect {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly storage = inject(StorageService);
  private readonly router = inject(Router);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) =>
        this.authService.register(request).pipe(
          map((user: AuthUserInterface) => {
            this.storage.set('accessToken', user.token);
            return authActions.registerSuccess({ currentUser: user });
          }),
          catchError((error: HttpErrorResponse) =>
            of(authActions.registerFailure({ errors: error.error.errors }))
          )
        )
      )
    )
  );

  success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.registerSuccess),
        tap(() => this.router.navigate(['/demos']))
      ),
    { dispatch: false }
  );
}
