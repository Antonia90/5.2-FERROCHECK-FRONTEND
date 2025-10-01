import api from '../lib/axios';

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type LoginPayload = { email: string; password: string };

export async function apiRegister(payload: RegisterPayload) {
  const { data } = await api.post('/api/register', payload);
  return data as { user: any; token: string };
}

export async function apiLogin(payload: LoginPayload) {
  const { data } = await api.post('/api/login', payload);
  return data as { user: any; token: string };
}

export async function apiLogout() {
  await api.post('/api/logout');
}

export async function apiMe() {
  const { data } = await api.get('/api/user');
  return data;
}
