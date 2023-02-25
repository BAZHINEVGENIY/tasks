import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoInterface, TodosStateInterface } from '../../types/todo.interface';

export const todoFeatureSelector =
  createFeatureSelector<TodosStateInterface>('todos');
// export const todoFeatureSelector = (state: AppStateInterface) => state.todos;

export const isLoadingSelector = createSelector(
  todoFeatureSelector,
  (todoState: TodosStateInterface) => todoState.isLoading
);

export const todosSelector = createSelector(
  todoFeatureSelector,
  (todoState: TodosStateInterface) => todoState.todos
);

export const errorSelector = createSelector(
  todoFeatureSelector,
  (todoState: TodosStateInterface) => todoState.error
);

export const searchSelector = (id: string) =>
  createSelector(todosSelector, (todoState: TodoInterface[]) =>
    todoState.find((todo) => todo.id === id)
  );
