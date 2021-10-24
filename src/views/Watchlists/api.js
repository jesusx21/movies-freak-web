import api from '../../api';

export async function getWatchlists(query = {}) {
  const { data } = await api.get('lists', query);

  return data;
}

export async function addMovie(watchlistId, payload) {
  const { data } = await api.post(`lists/${watchlistId}/films`, payload);

  return data;
}

export async function getMoviesOnWatchist(watchlistId, params) {
  const { data } = await api.get(`lists/${watchlistId}/films`, params);

  return data;
}

export async function getRandomMovies(watchlistId, params) {
  const { data } = await api.get(`lists/${watchlistId}/films/random`, params);

  return data;
}

export async function markMovieAsWatched(watchlistId, movieId) {
  const { data } = await api.post(`lists/${watchlistId}/films/${movieId}/mark-as-watched`);

  return data;
}

export async function markMovieAsNotWatched(watchlistId, movieId) {
  const { data } = await api.post(`lists/${watchlistId}/films/${movieId}/mark-as-not-watched`);

  return data;
}

export async function createWatchlist(payload) {
  const { data } = await api.post('lists', payload);

  return data;
}
