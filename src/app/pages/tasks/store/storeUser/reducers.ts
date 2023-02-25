import { Action, createReducer, on } from '@ngrx/store';
import { UserStateInterface } from '../../types/users.interface';
import { getUser, getUsers, getUsersFailure, getUsersSuccess } from './action';

export function userReducers(state: UserStateInterface, action: Action) {
  return userReducer(state, action);
}

const initialState: UserStateInterface = {
  users: [],
  isLoading: false,
  search: false,
  error: null,
};

const userReducer = createReducer(
  initialState,
  on(getUsers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getUser, (state) => ({
    ...state,
    search: !state.search,
  })),
  on(getUsersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: action.users,
  })),
  on(getUsersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
