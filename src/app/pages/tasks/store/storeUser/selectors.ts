import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInterface, UserStateInterface } from '../../types/users.interface';

export const userFeatureSelector =
  createFeatureSelector<UserStateInterface>('users');
// export const userFeatureSelector = (state: AppStateInterface) => state.users;

export const isLoadingSelector = createSelector(
  userFeatureSelector,
  (usersState: UserStateInterface) => usersState.isLoading
);

export const usersSelector = createSelector(
  userFeatureSelector,
  (usersState: UserStateInterface) => usersState.users
);

export const errorSelector = createSelector(
  userFeatureSelector,
  (usersState: UserStateInterface) => usersState.error
);

export const searchSelector = (id: number) =>
  createSelector(usersSelector, (usersState: UserInterface[]) =>
    usersState.find((user) => user.id === id)
  );
