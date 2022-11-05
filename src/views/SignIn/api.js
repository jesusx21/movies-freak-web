import api from '../../api';

export async function signIn(payload) {
  const { data } = await api.post('sign-in', payload);

  return data;
}
