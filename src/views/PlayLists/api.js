import api from '../../api';

export async function getLists() {
  const { data } = await api.get('lists');

  return data;
}

export async function addFilm(listId, payload) {
  const { data } = await api.post(`lists/${listId}/films`, payload);

  return data;
}
