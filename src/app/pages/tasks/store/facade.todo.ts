import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../models/app.interface';
import * as Selector from './storeTodo/selectors';
import * as Action from './storeTodo/action';
import { TodoStore } from '../components/edit-todo/edit-todo.component';
import { TodosStore } from '../components/demos-page/column-todo/column-todo.component';
import { FetchTodosStore } from '../components/demos-page/demos-page.component';
import { isLoadingTodoStore } from '../components/demos-page/search-bar/search-bar.component';

@Injectable({ providedIn: 'root' })
export class FacadeTodo
  implements TodoStore, TodosStore, FetchTodosStore, isLoadingTodoStore
{
  private readonly store = inject(Store<AppStateInterface>);

  readonly isLoading$ = this.store.pipe(select(Selector.isLoadingSelector));
  readonly error$ = this.store.pipe(select(Selector.errorSelector));
  readonly todos$ = this.store.pipe(select(Selector.todosSelector));

  readonly fetchTodos = () => this.store.dispatch(Action.getTodos());
  readonly todosSearch = () => this.store.dispatch(Action.getTodo());

  readonly searchTodo$ = (id: string) =>
    this.store.pipe(select(Selector.searchSelector(id)));
}
