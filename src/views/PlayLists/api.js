import api from '../../api';

export async function getLists() {
  const { data } = await api.get('lists');

  return data;
}

export async function addFilm(listId, payload) {
  const { data } = await api.post(`lists/${listId}/films`, payload);

  return data;
}

export async function getFilmsOnList(listId) {
  const { data } = await api.get(`lists/${listId}/films`);

  return data;
}

export async function getRandomFilms(listId, params) {
  const { data } = await api.get(`lists/${listId}/films/random`, params);

  return data;
}

export async function createList(payload) {
  const { data } = await api.post('lists', payload);

  return data;
}
