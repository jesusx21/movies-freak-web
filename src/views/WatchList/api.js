import api from '../../api';

export async function getWatchListById(watchListId, session) {
  api.setSession(session);

  const { data } = await api.get(`watchLists/${watchListId}`);

  return data;
}

export async function addFilm(watchListId, payload, session) {
  api.setSession(session);

  const { data } = await api.post(`watchLists/${watchListId}/films`, payload);

  return data;
}

export async function addFilmsFromWatchList(watchListTargetId, watchListSourceId, session) {
  api.setSession(session);

  const { data } = await api.post(
    `watchLists/${watchListTargetId}/films-from-lists/${watchListSourceId}`
  );

  return data;
}

export async function getFilms(watchListId, query, session) {
  api.setSession(session);

  const { data } = await api.get(`watchLists/${watchListId}/films`, query);

  return data;
}

export async function getRandomFilms(watchListId, params, session) {
  api.setSession(session);

  const { data } = await api.get(`watchLists/${watchListId}/films/random`, params);

  return data;
}

export async function markFilmAsWatched(watchListId, filmId, session) {
  api.setSession(session);

  const { data } = await api.post(`watchLists/${watchListId}/films/${filmId}/mark-as-watched`);

  return data;
}

export async function markFilmAsNotWatched(watchListId, filmId, session) {
  api.setSession(session);

  const { data } = await api.post(`watchLists/${watchListId}/films/${filmId}/mark-as-not-watched`);

  return data;
}

export async function fetchFilmOnIMDB(query, session) {
  api.setSession(session);

  const { data } = await api.get('films/imdb', query);

  return data;
}
