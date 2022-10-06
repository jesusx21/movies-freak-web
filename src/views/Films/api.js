import api from '../../api';

export async function getFilms(query) {
  const { data } = await api.get(`films`, query);

  return data;
}
