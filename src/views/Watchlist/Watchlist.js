import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import AddFilmModal from '../../components/AddMovieModal/AddMovieModal';
import * as api from './api';
import { notifyError } from '../../toast';
import './Watchlist.css';
import MovieCard from '../../components/MovieCard/MovieCard';
import AddFilmsFromWashlistModal from '../../components/AddFromWashlistModal/AddFilmsFromWashlistModal';
import MoviesOnWatchlist from '../../components/MovieOnWatchlist/MoviesOnWatchlist';
import { isEmpty } from 'lodash';


function Watchlist() {
  const params = useParams();
  const [watchlist, setWatchList] = useState({})
  const [films, setFilms] = useState([]);
  const [randomFilms, setRandomFilms] = useState([]);
  const [showAddFilmModal, setShowAddFilmModal] = useState(false);
  const [showAddFromWatchlistModal, setShowAddFromWatchlistModal] = useState(false);
  const [showSeeRandomMoviesModal, setShowSeeRandomMoviessModal] = useState(false);

  const fetchWatchlist = async () => {
    try {
      const { data } = await api.getWatchlistById(params.id);

      setWatchList(data)
    } catch (error) {
      const { status } = error.response;

      notifyError()
    }
  };

  const fetchFilms = async () => {
    try {
      const { data } = await api.getFilms(params.id);

      setFilms(data)
    } catch (error) {
      notifyError();
    }
  };

  const fetchRandomFilms = async () => {
    try {
      const { data } = await api.getRandomFilms(params.id, { random: true, limit: 3 });

      setRandomFilms(data)
    } catch (error) {
      notifyError();
    }
  };

  const onAddFilm = async (film) => {
    try {
      const { data } = await api.addFilm(params.id, film);

      return data;
    } catch(error) {
      console.error(error);
      notifyError();
    }

    await fetchFilms();
  }

  const onAddFromWatchlist = async (watchlistId) => {
    if (isEmpty(watchlistId)) {
      return notifyError('Id is invalid')
    }

    try {
      const { data } = await api.addFilmsFromWatchlist(params.id, watchlistId);

      return data;
    } catch(error) {
      console.error(error);
      notifyError();
    }

    await fetchFilms();
  }

  const markFilmAsWatched = async (filmId, watched) => {
    const updateWatchStatus = watched ? api.markFilmAsNotWatched : api.markFilmAsWatched;

    try {
      const { data } = updateWatchStatus(params.id, filmId);

      return data;
    } catch(error) {
      console.error(error);
      notifyError();
    }
  }

  const onSeeRandomFilmsClick = async () => {
    await fetchRandomFilms();
    setShowSeeRandomMoviessModal(true);
  };

  useEffect(() => {
    fetchWatchlist();
    fetchFilms();
  }, []);

  return (
    <>
      <div>
        <div className='detail-title'>{watchlist.name}</div>
        <div className='detail-subtitle'>{watchlist.description}</div>
        <div className='films-menu'>
          <Button variant='light' onClick={() => setShowAddFilmModal(true)}>Add Film</Button>{' '}
          <Button variant='light' onClick={() => setShowAddFromWatchlistModal(true)}>
            Add Film From Watchlist
          </Button>{' '}
          <Button variant='light' onClick={onSeeRandomFilmsClick}>See Random Films</Button>{' '}
          <Button variant='light' disabled >Mark Films as Watched</Button>{' '}
          <Button variant='light' disabled >Mark Films as not Watched</Button>{' '}
        </div>
        <div className='films-cards'>
          {
            films.map(({ film }) => {
              return (
                <MovieCard
                  id={film.id}
                  name={film.name}
                  poster={film.poster}
                  year={film.year}
                  rated={film.rated}
                  genre={film.genre}
                  plot={film.plot}
                  rating={film.rating}
                  locations={film.locations}
                  watched={film.watched}
                  onMarkMovieAsWatched={markFilmAsWatched}
                />
              )
            })
          }
        </div>
      </div>

      <AddFilmModal
        show={showAddFilmModal}
        onHide={() => setShowAddFilmModal(false)}
        onAddMovie={onAddFilm}
      />
      <AddFilmsFromWashlistModal
        show={showAddFromWatchlistModal}
        onHide={() => setShowAddFromWatchlistModal(false)}
        onAddFromWatchlist={onAddFromWatchlist}
      />
      <MoviesOnWatchlist
        watchlistName={watchlist.name}
        show={showSeeRandomMoviesModal}
        onHide={() => setShowSeeRandomMoviessModal(false)}
        moviesOnWatchlist={randomFilms}
        onMarkMovieAsWatched={markFilmAsWatched}
      />
    </>
  )
}

export default Watchlist;
