import api from '../../api';

export async function createWatchList(watchList, session) {
  api.setSession(session);

  const { data } = await api.post('watchlists', watchList);

  return data;
}

export async function getWatchLists(query, session) {
  api.setSession(session);

  const { data } = await api.get('watchlists', query);

  return data;
}
