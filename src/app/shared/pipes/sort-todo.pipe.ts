import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoInterface } from '../../pages/tasks/types/todo.interface';

@Pipe({ name: 'sortTodo', standalone: true })
export class SortTodoPipe implements PipeTransform {
  transform(
    todos$: Observable<TodoInterface[]>,
    status = ''
  ): Observable<TodoInterface[]> {
    return todos$.pipe(
      map((todos) => {
        if (todos) return todos.filter((todo) => todo.status === status);
      })
    );
  }
}
