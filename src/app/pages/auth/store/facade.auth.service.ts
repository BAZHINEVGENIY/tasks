import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RegisterInterface } from '../types/register.interface';
import { AuthStateInterface } from '../types/users.interface';

import { LoginInterface } from '../types/login.interface';
import { authActions } from './auth/action';
import {
  errorsAuthSelector,
  isLoadingAuthSelector,
  isLoggedInAuthSelector,
  usersAuthSelector,
} from './share/selectors';

@Injectable({ providedIn: 'root' })
export class FacadeAuthService {
  private readonly store = inject(Store<AuthStateInterface>);

  readonly isLoading$ = this.store.select(isLoadingAuthSelector);
  readonly isLoggedIn$ = this.store.select(isLoggedInAuthSelector);
  readonly users$ = this.store.select(usersAuthSelector);
  readonly errors$ = this.store.select(errorsAuthSelector);

  readonly getCurrentUser = () =>
    this.store.dispatch(authActions.getCurrentUser());

  readonly getCurrentUserFailure = () =>
    this.store.dispatch(authActions.getCurrentUserFailure());

  readonly register = (request: RegisterInterface) =>
    this.store.dispatch(authActions.register({ request }));

  readonly login = (request: LoginInterface) =>
    this.store.dispatch(authActions.login({ request }));
}
