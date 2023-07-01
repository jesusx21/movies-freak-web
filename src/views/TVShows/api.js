import api from '../../api';

export async function createTVShow(tvShow, session) {
  api.setSession(session);

  const { data } = await api.post('tv-shows', tvShow);

  return data;
}

export async function getTVShows(query) {
  const { data } = await api.get('tv-shows', query);

 return data;
}
