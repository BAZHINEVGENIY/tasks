import { BackendErrorsInterface } from './errors.interface';

export interface UpdateUserInputInterface extends AuthUserInterface {
  password: string;
}

export interface AuthStateInterface {
  isLoading: boolean;
  isLoggedIn?: boolean;
  currentUser?: AuthUserInterface;
  errors?: BackendErrorsInterface;
}

export interface AuthUserInterface {
  id: number;
  username: string;
  email: string;
  token: string;
  image?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}
