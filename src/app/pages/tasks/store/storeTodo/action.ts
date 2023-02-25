import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actionTypes';
import { TodoInterface } from '../../types/todo.interface';

export const getTodos = createAction(ActionTypes.GET_TODOS);
export const getTodo = createAction(ActionTypes.GET_TODO);

export const getTodosSuccess = createAction(
  ActionTypes.GET_TODOS_SUCCESS,
  props<{ todos: TodoInterface[] }>()
);

export const getTodosFailure = createAction(
  ActionTypes.GET_TODOS_FAILURE,
  props<{ error: string }>()
);
