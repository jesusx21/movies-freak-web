import api from '../../api';

export async function getWatchlistById(watchlistId) {
  const { data } = await api.get(`watchlists/${watchlistId}`);

  return data;
}

export async function addFilm(watchlistId, payload) {
  const { data } = await api.post(`watchlists/${watchlistId}/films`, payload);

  return data;
}

export async function addFilmsFromWatchlist(watchlistTargetId, watchlistSourceId) {
  const { data } = await api.post(`watchlists/${watchlistTargetId}/films-from-lists/${watchlistSourceId}`);

  return data;
}

export async function getFilms(watchlistId, params) {
  const { data } = await api.get(`watchlists/${watchlistId}/films`, params);

  return data;
}

export async function getRandomFilms(watchlistId, params) {
  const { data } = await api.get(`watchlists/${watchlistId}/films/random`, params);

  return data;
}

export async function markFilmAsWatched(watchlistId, filmId) {
  const { data } = await api.post(`watchlists/${watchlistId}/films/${filmId}/mark-as-watched`);

  return data;
}

export async function markFilmAsNotWatched(watchlistId, filmId) {
  const { data } = await api.post(`watchlists/${watchlistId}/films/${filmId}/mark-as-not-watched`);

  return data;
}
