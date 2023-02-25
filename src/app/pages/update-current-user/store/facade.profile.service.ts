import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthStateInterface,
  UpdateUserInputInterface,
} from '../../auth/types/users.interface';
import { profileActions } from './action';
import {
  errorsAuthSelector,
  isLoadingAuthSelector,
  isLoggedInAuthSelector,
  usersAuthSelector,
} from '../../auth/store/share/selectors';

@Injectable({ providedIn: 'root' })
export class FacadeProfileService {
  private readonly store = inject(Store<AuthStateInterface>);

  readonly isLoading$ = this.store.select(isLoadingAuthSelector);
  readonly isLoggedIn$ = this.store.select(isLoggedInAuthSelector);
  readonly users$ = this.store.select(usersAuthSelector);
  readonly errors$ = this.store.select(errorsAuthSelector);

  readonly update = (request: UpdateUserInputInterface) =>
    this.store.dispatch(profileActions.updateCurrentUser({ request }));
}
