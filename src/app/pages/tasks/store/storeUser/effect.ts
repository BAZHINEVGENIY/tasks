import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from '../../../../core/services/user.service';
import * as Action from './action';
import { UserInterface } from '../../types/users.interface';

@Injectable()
export class GetUsersEffect {
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Action.getUsers),
      switchMap(() => {
        return this.userService.getUsers$.pipe(
          delay(2000),
          map((users: UserInterface[]) => Action.getUsersSuccess({ users }))
        );
      }),
      catchError((error) => {
        console.log('Error:', error);
        return of(Action.getUsersFailure({ error: error.message }));
      })
    )
  );
}
