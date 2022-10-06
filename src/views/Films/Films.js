import React, { useEffect, useState } from 'react';

import * as api from './api';
import { FilmCard, Search } from '../../components';
import { notifyError } from '.././../toast';
import './Films.css';
import MoviesFreakPagination from '../../components/Pagination/Pagination';

function Films() {
  const [films, setFilms] = useState([]);
  const [totalFilms, setTotalFilms] = useState([]);
  const [query, setQuery] = useState('');

  const fetchFilms = async (query = {}) => {
    try {
      const {items, totalItems } = await api.getFilms(query);

      setFilms(items);
      setTotalFilms(totalItems);
    } catch (error) {
      notifyError('Error fetching films');
    }
  };

  const onPageClick = async (pagination) => {
    await fetchFilms({ q: query, ...pagination })
  };

  const onSearchChange = async (value) => {
    await fetchFilms({ q: value })
    setQuery(value);
  }

  useEffect(() => {
    fetchFilms();
  }, [])

  return (
    <>
      <Search onChange={onSearchChange} placeholder='Type to search films' />
      <div className='films-cards'>
        {
          films.map((film) => {
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
              />
            );
          })
        }
      </div>
      <MoviesFreakPagination onPageClick={onPageClick} totalItems={totalFilms} />
    </>
  )
}

export default Films;
