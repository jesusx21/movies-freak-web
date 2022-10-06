import api from '../../api';

export async function createWatchList(watchList) {
  const { data } = await api.post('watchlists', watchList);

  return data;
}

export async function getWatchLists(query = {}) {
  const { data } = await api.get('watchlists', query);

  return data;
}
