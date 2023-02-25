import { Pipe, PipeTransform } from '@angular/core';
import { TodoInterface } from '../../pages/tasks/types/todo.interface';

@Pipe({ name: 'searchTodo', standalone: true })
export class SearchTodoPipe implements PipeTransform {
  transform(todos: TodoInterface[], search = ''): TodoInterface[] {
    if (!search.trim()) {
      return todos;
    }

    return todos.filter((todo) => {
      return todo.title.toLowerCase().includes(search.toLowerCase());
    });
  }
}
