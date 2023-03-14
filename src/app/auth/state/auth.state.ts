import { User } from 'src/app/models/user.model';

export interface AuthData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};
