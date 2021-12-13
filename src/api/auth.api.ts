import { api } from 'src/boot/axios';

interface Credentials {
  email: string;
  password: string;
}

interface Token {
  type: 'bearer';
  value: string;
}

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  email: string;
  emailVerified: boolean;
  googleProfileId: string | null;
}

interface LoginResponse {
  user: User;
  token: Token;
}

export async function apiLoginWithEmailAndPassword(
  credentials: Credentials
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('auth/login', credentials);
  return data;
}
