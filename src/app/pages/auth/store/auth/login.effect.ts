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
export class LoginEffect {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly storage = inject(StorageService);
  private readonly router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) =>
        this.authService.login(request).pipe(
          map((currentUser: AuthUserInterface) => {
            this.storage.set('accessToken', currentUser.token);
            return authActions.loginSuccess({ currentUser });
          }),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return of(authActions.loginFailure({ errors: error.error.errors }));
          })
        )
      )
    )
  );

  success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(() => this.router.navigate(['/demos']))
      ),
    { dispatch: false }
  );
}
