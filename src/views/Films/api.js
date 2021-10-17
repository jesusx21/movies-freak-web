import api from '../../api';

export async function getFilms() {
  const { data } = await api.get('films');

  return data;
}

export async function getFilmsOnList(listId) {
  const { data } = await api.get(`lists/${listId}/films`);

  return data;
}
