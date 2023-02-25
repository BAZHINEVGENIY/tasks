import { AuthStateInterface } from '../../types/users.interface';
import { Action, createReducer, on } from '@ngrx/store';

import { authActions } from '../auth/action';
import { profileActions } from '../../../update-current-user/store/action';

export function reducers(state: AuthStateInterface, action: Action) {
  return reducer(state, action);
}

const initialState: AuthStateInterface = {
  currentUser: null,
  isLoading: false,
  isLoggedIn: null,
  errors: null,
};

const reducer = createReducer(
  initialState,
  on(
    authActions.getCurrentUser,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    authActions.getCurrentUserSuccess,
    (state, { currentUser }): AuthStateInterface => ({
      ...state,
      currentUser,
      isLoading: false,
      isLoggedIn: true,
    })
  ),
  on(
    authActions.getCurrentUserFailure,
    (state): AuthStateInterface => ({
      ...state,
      currentUser: null,
      isLoading: false,
      isLoggedIn: false,
    })
  ),
  on(
    authActions.login,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
      errors: null,
    })
  ),
  on(
    authActions.loginSuccess,
    (state, { currentUser }): AuthStateInterface => ({
      ...state,
      currentUser,
      isLoading: false,
      isLoggedIn: true,
    })
  ),
  on(
    authActions.loginFailure,
    (state, { errors }): AuthStateInterface => ({
      ...state,
      errors,
      isLoading: false,
      isLoggedIn: false,
    })
  ),
  on(
    authActions.register,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
      errors: null,
    })
  ),
  on(
    authActions.registerSuccess,
    (state, { currentUser }): AuthStateInterface => ({
      ...state,
      currentUser: currentUser,
      isLoading: false,
      isLoggedIn: true,
    })
  ),
  on(
    authActions.registerFailure,
    (state, { errors }): AuthStateInterface => ({
      ...state,
      errors: errors,
      isLoading: false,
      isLoggedIn: false,
    })
  ),
  on(
    profileActions.updateCurrentUser,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    profileActions.updateCurrentUserSuccess,
    (state, { currentUser }): AuthStateInterface => ({
      ...state,
      currentUser,
      isLoading: false,
    })
  ),
  on(
    profileActions.updateCurrentUserFailure,
    (state, { errors }): AuthStateInterface => ({
      ...state,
      errors,
      isLoading: false,
    })
  )
);
