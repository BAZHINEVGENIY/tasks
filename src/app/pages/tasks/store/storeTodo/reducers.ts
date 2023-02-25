import { Action, createReducer, on } from '@ngrx/store';
import { getTodo, getTodos, getTodosFailure, getTodosSuccess } from './action';
import { TodosStateInterface } from '../../types/todo.interface';

export function todoRedusers(state: TodosStateInterface, action: Action) {
  return todoReducer(state, action);
}

const initialState: TodosStateInterface = {
  todos: [],
  isLoading: false,
  search: false,
  error: null,
};

const todoReducer = createReducer(
  initialState,
  on(getTodos, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getTodo, (state) => ({
    ...state,
    search: !state.search,
  })),
  on(getTodosSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    todos: action.todos,
  })),
  on(getTodosFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
