import { CommentInterface } from './comment.interface';

export interface TodosStateInterface {
  todos: TodoInterface[];
  isLoading: boolean;
  search: boolean;
  error: string | null;
}

export interface TodoInterface {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  comments: CommentInterface[];
  reporterId: number;
  assigneesId: number;
  created: Date;
  updated: Date;
}
