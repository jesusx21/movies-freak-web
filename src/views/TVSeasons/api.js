import api from '../../api';

export async function getTVShow(tvShowId) {
  const { data } = await api.get(`tv-shows/${tvShowId}`);

  return data;
}

export async function getTVShowSeasons(tvShowId) {
  const { data } = await api.get(`tv-shows/${tvShowId}/tv-seasons`);

  return data;
}

export async function getTVSeasonEpisodes(tvShowId, tvSeasonId) {
  const { data } = await api.get(`tv-shows/${tvShowId}/tv-seasons/${tvSeasonId}/tv-episodes`);

  return data;
}
