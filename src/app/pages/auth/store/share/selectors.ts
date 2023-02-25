import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateInterface } from '../../types/users.interface';

export const authFeatureSelector =
  createFeatureSelector<AuthStateInterface>('auth');

export const isLoadingAuthSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoading
);

export const isLoggedInAuthSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
);

export const usersAuthSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser
);

export const errorsAuthSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.errors
);
