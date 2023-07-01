import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AddSeasonModal, TVShowCard } from '../../components';
import MoviesFreakPagination from '../../components/Pagination/Pagination';

import { notifyError } from '../../toast';
import * as api from './api';
import './TVSeasons.css';

function TVSeasons() {
  const params = useParams();

  const [tvShow, setTVShow] = useState([]);
  const [tvSeasons, setTVSeasons] = useState([]);
  const [totalSeasons, setTotalSeasons] = useState(0);
  const [tvEpisodes, setTVEpisodes] = useState([]);
  const [showAddSeasonModal, setShowAddSeasonModal] = useState(false);

  const onSeasonClick = async (input) => {
    const tvSeason = getSeasonByNumber(input.page);
    console.log(tvSeason)

    try {
      const { items } = await api.getTVSeasonEpisodes(params.tvShowId, tvSeason.id);
      setTVEpisodes(items);
    } catch (error) {
      notifyError();
    }
  };

  const getSeasonByNumber = (seasonNumber) => {
    console.log(tvSeasons)
    const result = tvSeasons.filter((item) => item.seasonNumber === seasonNumber);

    return result[0];
  }

  const fetchTVShow = async () => {
    try {
      const data = await api.getTVShow(params.tvShowId);

      setTVShow(data);
    } catch (error) {
      const { data } = error.response;

      if (data.code === 'TV_SHOW_NOT_FOUND') {
        return notifyError('TV Show was not found.')
      }

      notifyError()
    }
  };

  const fetchTVSeasons = async () => {
    try {
      const { items, totalItems } = await api.getTVShowSeasons(params.tvShowId);

      setTVSeasons(items);
      setTotalSeasons(totalItems);
    } catch (error) {
      notifyError();
    }
  };

  useEffect(() => {
    fetchTVShow();
    fetchTVSeasons();
  }, []);

  return (
    <>
      <div>
        <div className='detail-title'>{tvShow.name}</div>
        <div className='detail-subtitle'>{tvShow.plot}</div>
        <div className='films-menu'>
          <Button onClick={() => setShowAddSeasonModal(true)} variant='light'>Add Season</Button>{' '}
          <Button variant='light'>Add Episode</Button>{' '}
        </div>
        <MoviesFreakPagination onPageClick={onSeasonClick} numberOfPages={totalSeasons} />

        <div className='tv-episodes-cards'>
          {
            tvEpisodes.map((tvEpisode, index) => {
              return (
                <TVShowCard
                  id={tvEpisode.id}
                  name={tvEpisode.name}
                  poster={tvEpisode.poster}
                  years={tvEpisode.year}
                  rated={tvEpisode.rated}
                  imdbRating={tvEpisode.imdbRating}
                  genre={tvEpisode.genre}
                  plot={tvEpisode.plot}
                  episodeNumber={tvEpisode.episodeNumber}
                  key={index}
                  index={index}
                />
              );
            })
          }
        </div>
      </div>

      <AddSeasonModal
        show={showAddSeasonModal}
        onHide={() => setShowAddSeasonModal(false)}
        onAddSeason={(item) => console.log(item)}
      />
    </>
  )
}

export default TVSeasons;
