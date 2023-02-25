import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../models/app.interface';
import * as Selector from './storeUser/selectors';
import * as Action from './storeUser/action';
import { UsersAndUserStore } from '../components/demos-page/search-bar/search-bar.component';
import { FetchUsersStore } from '../components/demos-page/demos-page.component';
import { isLoadingUserStore } from '../components/demos-page/column-todo/card-todo/card-todo.component';

@Injectable({ providedIn: 'root' })
export class FacadeUser
  implements UsersAndUserStore, FetchUsersStore, isLoadingUserStore
{
  private readonly store = inject(Store<AppStateInterface>);

  readonly isLoading$ = this.store.pipe(select(Selector.isLoadingSelector));
  readonly error$ = this.store.pipe(select(Selector.errorSelector));
  readonly users$ = this.store.pipe(select(Selector.usersSelector));

  readonly fetchUsers = () => this.store.dispatch(Action.getUsers());
  readonly userSearch = () => this.store.dispatch(Action.getUser());

  readonly searchUser$ = (id: number) =>
    this.store.pipe(select(Selector.searchSelector(id)));
}
