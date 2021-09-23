import api from '../../api';

export async function getFilms() {
  const { data } = await api.get('films');

  return data;
}
