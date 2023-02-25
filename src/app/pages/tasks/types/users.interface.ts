export interface UserStateInterface {
  users: UserInterface[];
  isLoading: boolean;
  search: boolean;
  error: string | null;
}

export interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string;
}
