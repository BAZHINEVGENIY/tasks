import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actionTypes';
import { UserInterface } from '../../types/users.interface';

export const getUsers = createAction(ActionTypes.GET_USERS);
export const getUser = createAction(ActionTypes.GET_USER);

export const getUsersSuccess = createAction(
  ActionTypes.GET_USERS_SUCCESS,
  props<{ users: UserInterface[] }>()
);

export const getUsersFailure = createAction(
  ActionTypes.GET_USERS_FAILURE,
  props<{ error: string }>()
);
