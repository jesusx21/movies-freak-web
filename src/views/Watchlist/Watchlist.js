import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';

import MoviesFreakPagination from '../../components/Pagination/Pagination';
import * as api from './api';
import { notifyError, notifySuccess } from '../../toast';
import {
  AddFilmModal,
  AddFilmsFromWatchListModal,
  FilmCard,
  FilmsOnWatchList,
  Search
} from '../../components';
import './WatchList.css';


function WatchList() {
  const params = useParams();
  const [watchList, setWatchList] = useState({})
  const [query, setQuery] = useState('');
  const [films, setFilms] = useState([]);
  const [totalFilms, setTotalFilms] = useState([]);
  const [randomFilms, setRandomFilms] = useState([]);
  const [showAddFilmModal, setShowAddFilmModal] = useState(false);
  const [showAddFromWatchListModal, setShowAddFromWatchListModal] = useState(false);
  const [showSeeRandomFilmsModal, setShowSeeRandomFilmssModal] = useState(false);

  const onSearchChange = async (value) => {
    await fetchFilms({ q: value });
    setQuery(value);
  }

  const fetchWatchList = async () => {
    try {
      const { data } = await api.getWatchListById(params.id);

      setWatchList(data);
    } catch (error) {
      const {data } = error.response;

      if (data.code === 'LIST_NOT_FOUND') {
        return notifyError('Watch list was not found.')
      }

      notifyError()
    }
  };

  const fetchFilms = async (query) => {
    try {
      const { items, totalItems } = await api.getFilms(params.id, query);

      setFilms(items)
      setTotalFilms(totalItems)
    } catch (error) {
      notifyError();
    }
  };

  const onPageClick = async (pagination) => {
    await fetchFilms({ q: query, ...pagination })
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

      setFilms([ data, ...films ])

      notifySuccess('Film added succesfully');
      return data;
    } catch(error) {
      notifyError('Error adding the film');
    };
  }

  const onIMDBFetch = async (value) => {
    const query = { name: value };

    try {
      const { data } = await api.fetchFilmOnIMDB(query);

      return data;
    } catch(error) {
      console.info(error?.response?.data);
      return [];
    };
  }

  const onAddFromWatchList = async (watchListId) => {
    if (isEmpty(watchListId)) {
      return notifyError('Id is invalid')
    }

    try {
      const { data } = await api.addFilmsFromWatchList(params.id, watchListId);

      setFilms([ ...films, ...data ])
      return data;
    } catch(error) {
      notifyError();
    }
  }

  const markFilmAsWatched = async (filmId, watched) => {
    const updateWatchStatus = watched ? api.markFilmAsNotWatched : api.markFilmAsWatched;

    try {
      const { data } = updateWatchStatus(params.id, filmId);

      return data;
    } catch(error) {
      notifyError();
    }
  }

  const onSeeRandomFilmsClick = async () => {
    await fetchRandomFilms();
    setShowSeeRandomFilmssModal(true);
  };

  useEffect(() => {
    fetchWatchList();
    fetchFilms();
  });

  return (
    <>
      <div>
        <div className='detail-title'>{watchList.name}</div>
        <div className='detail-subtitle'>{watchList.description}</div>
        <div className='films-menu'>
          <Button variant='light' onClick={() => setShowAddFilmModal(true)}>Add Film</Button>{' '}
          <Button variant='light' onClick={() => setShowAddFromWatchListModal(true)}>
            Add Film From Watch List
          </Button>{' '}
          <Button variant='light' onClick={onSeeRandomFilmsClick}>See Random Films</Button>{' '}
          <Button variant='light' disabled >Mark Films as Watched</Button>{' '}
          <Button variant='light' disabled >Mark Films as not Watched</Button>{' '}

          <Search onChange={onSearchChange} placeholder='Search your film' />
        </div>
        <div className='films-cards'>
          {
            films.map(({ film, watched }) => {
              return (
                <FilmCard
                  id={film.id}
                  name={film.name}
                  poster={film.poster}
                  year={film.year}
                  rated={film.rated}
                  genre={film.genre}
                  plot={film.plot}
                  rating={film.rating}
                  locations={film.locations}
                  watched={watched}
                  onMarkFilmAsWatched={markFilmAsWatched}
                />
              )
            })
          }
        </div>
      </div>

      <AddFilmModal
        show={showAddFilmModal}
        onHide={() => setShowAddFilmModal(false)}
        onIMDBFetch={onIMDBFetch}
        onAddFilm={onAddFilm}
      />
      <AddFilmsFromWatchListModal
        show={showAddFromWatchListModal}
        onHide={() => setShowAddFromWatchListModal(false)}
        onAddFromWatchList={onAddFromWatchList}
      />
      <FilmsOnWatchList
        watchListName={watchList.name}
        show={showSeeRandomFilmsModal}
        onHide={() => setShowSeeRandomFilmssModal(false)}
        filmsOnWatchList={randomFilms}
        onMarkFilmAsWatched={markFilmAsWatched}
      />
      <MoviesFreakPagination onPageClick={onPageClick} totalItems={totalFilms} />
    </>
  )
}

export default WatchList;
