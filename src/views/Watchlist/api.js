import api from '../../api';

export async function getWatchListById(watchListId) {
  const { data } = await api.get(`watchLists/${watchListId}`);

  return data;
}

export async function addFilm(watchListId, payload) {
  const { data } = await api.post(`watchLists/${watchListId}/films`, payload);

  return data;
}

export async function addFilmsFromWatchList(watchListTargetId, watchListSourceId) {
  const { data } = await api.post(`watchLists/${watchListTargetId}/films-from-lists/${watchListSourceId}`);

  return data;
}

export async function getFilms(watchListId, query) {
  const { data } = await api.get(`watchLists/${watchListId}/films`, query);

  return data;
}

export async function getRandomFilms(watchListId, params) {
  const { data } = await api.get(`watchLists/${watchListId}/films/random`, params);

  return data;
}

export async function markFilmAsWatched(watchListId, filmId) {
  const { data } = await api.post(`watchLists/${watchListId}/films/${filmId}/mark-as-watched`);

  return data;
}

export async function markFilmAsNotWatched(watchListId, filmId) {
  const { data } = await api.post(`watchLists/${watchListId}/films/${filmId}/mark-as-not-watched`);

  return data;
}

export async function fetchFilmOnIMDB(query) {
  const { data } = await api.get('films/imdb', query);

  return data;
}
