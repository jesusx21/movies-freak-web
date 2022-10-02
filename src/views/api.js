import api from '../api';

export async function createWatchlist(payload) {
  const { data } = await api.post('watchlists', payload);

  return data;
}

export async function getWatchlists(query = {}) {
  const { data } = await api.get('watchlists', query);

  return data;
}
