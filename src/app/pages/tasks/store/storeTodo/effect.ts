import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as Action from './action';
import { TodoService } from '../../../../core/services/todo.service';
import { TodoInterface } from '../../types/todo.interface';

@Injectable()
export class GetTodosEffect {
  private readonly actions$ = inject(Actions);
  private readonly todoService = inject(TodoService);

  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Action.getTodos),
      switchMap(() => {
        return this.todoService.todos$.pipe(
          map((todos: TodoInterface[]) => Action.getTodosSuccess({ todos }))
        );
      }),
      catchError((error) => {
        console.log('Error:', error);
        return of(Action.getTodosFailure({ error: error.message }));
      })
    )
  );
}
