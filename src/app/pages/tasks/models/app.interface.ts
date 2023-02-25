import { TodosStateInterface } from '../types/todo.interface';
import { UserStateInterface } from '../types/users.interface';
import { AuthStateInterface } from '../../auth/types/users.interface';

export interface AppStateInterface {
  todos: TodosStateInterface;
  users: UserStateInterface;
  auth: AuthStateInterface;
}
