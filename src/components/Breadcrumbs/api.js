import api from '../../api';

export async function getWatchListById(watchListId) {
  const { data } = await api.get(`watchLists/${watchListId}`);

  return data;
}
