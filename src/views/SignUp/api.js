import api from '../../api';

export async function signUp(payload) {
  const { data } = await api.post('sign-up', payload);

  return data;
}