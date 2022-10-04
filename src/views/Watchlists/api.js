import api from '../../api';

export async function getWatchlists(query = {}) {
  const { data } = await api.get('watchlists', query);

  return data;
}

export async function addMovie(watchlistId, payload) {
  const { data } = await api.post(`watchlists/${watchlistId}/films`, payload);

  return data;
}

export async function getMoviesOnWatchist(watchlistId, params) {
  const { data } = await api.get(`watchlists/${watchlistId}/films`, params);

  return data;
}

export async function getRandomMovies(watchlistId, params) {
  const { data } = await api.get(`watchlists/${watchlistId}/films/random`, params);

  return data;
}

export async function markMovieAsWatched(watchlistId, movieId) {
  const { data } = await api.post(`watchlists/${watchlistId}/films/${movieId}/mark-as-watched`);

  return data;
}

export async function markMovieAsNotWatched(watchlistId, movieId) {
  const { data } = await api.post(`watchlists/${watchlistId}/films/${movieId}/mark-as-not-watched`);

  return data;
}

export async function createWatchlist(payload) {
  const { data } = await api.post('watchlists', payload);

  return data;
}
