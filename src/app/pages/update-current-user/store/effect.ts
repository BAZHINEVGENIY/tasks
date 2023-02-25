import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../core/services/auth.service';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthUserInterface } from '../../auth/types/users.interface';
import { profileActions } from './action';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../../core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class UpdateCurrentUserEffect {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly storage = inject(StorageService);

  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileActions.updateCurrentUser),
      switchMap(({ request }) =>
        this.authService.updateUser(request).pipe(
          map((currentUser: AuthUserInterface) => {
            this.storage.set('accessToken', currentUser.token);
            return profileActions.updateCurrentUserSuccess({ currentUser });
          }),
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return of(
              profileActions.updateCurrentUserFailure({
                errors: error.error.errors,
              })
            );
          })
        )
      )
    )
  );
}
