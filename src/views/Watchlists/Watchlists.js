import React, { useState, useEffect } from 'react';
import SearchField from 'react-search-field';
import { Col, Container, Row } from 'react-bootstrap';
import { chunk, isEmpty } from 'lodash';

import Menu from './Menu';
import WatchlistCard from '../../components/WatchlistCard/WatchlistCard';
import * as api from './api';

function Watchlists() {
  const [watchlists, setWatchLists] = useState([]);
  const showCard = !isEmpty(watchlists);

  const createWatchlist = async (watchlist) => {
    try {
      const { data } = await api.createWatchlist(watchlist)

      setWatchLists([...watchlists, data]);
    } catch(error) {
      console.error(error);
    }
  }

  const fetchWatchlists = async (query = {}) => {
    try {
      const { data: items } = await api.getWatchlists(query);

      setWatchLists(items)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWatchlists();
  }, [])

  const onSearchChange = (input) => {
    fetchWatchlists({ q: input })
  }

  const addMovie = async (watchlistId, movie) => {
    try {
      const { data } = await api.addMovie(watchlistId, movie);

      return data;
    } catch(error) {
      console.error(error);
    }
  }

  const getMovies = (watchlistId, options = {}) => {
    const { random, ...params } = options;

    if (random) {
      return api.getRandomMovies(watchlistId, { limit: options.limit });
    }

    return api.getMoviesOnWatchist(watchlistId, params);
  }

  const onSeeMovies = async (watchlistId, options) => {
    try {
      const { data } = await getMovies(watchlistId, options);

      return data;
    } catch(error) {
      console.error(error);
    }
  }

  const markMovieAsWatched = async (watchlistId, movieId, watched) => {
    const updateWatchStatus = watched ? api.markMovieAsNotWatched : api.markMovieAsWatched;

    try {

      const { data } = updateWatchStatus(watchlistId, movieId);

      return data;
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Row>
        <Col className='col-sm' >
          <SearchField
            placeholder='Search...'
            onChange={onSearchChange}
          />
        </Col>
      </Row>
      {showCard && cards(watchlists, addMovie, onSeeMovies, markMovieAsWatched)}
      <Menu onCreateWatchlist={createWatchlist}/>
    </Container>
  )
}

function cards(watchlists, onAddMovie, onSeeMovies, markMovieAsWatched) {
  return chunk(watchlists, 3)
    .map((items) => {
      return (
        <Row>
          <Col className='col-sm' >
            <WatchlistCard
              id={items[0].id}
              name={items[0].name}
              description={items[0].description}
              type={items[0].type}
              numberOfFilms={items[0].numberOfFilms}
              onAddMovie={(movie) => onAddMovie(items[0].id, movie)}
              onSeeMovies={(options) => onSeeMovies(items[0].id, options)}
              onMarkMovieAsWatched={
                (movieId, watched) => markMovieAsWatched(items[0].id, movieId, watched)
              }
            />
          </Col>
          <Col className='col-sm' >
            { !!items[1] && (
              <WatchlistCard
                id={items[1].id}
                name={items[1].name}
                description={items[1].description}
                type={items[1].type}
                numberOfFilms={items[1].numberOfFilms}
                onAddMovie={(movie) => onAddMovie(items[1].id, movie)}
                onSeeMovies={(options) => onSeeMovies(items[1].id, options)}
                onMarkMovieAsWatched={
                  (movieId, watched) => markMovieAsWatched(items[1].id, movieId, watched)
                }
              />
            )}
          </Col>
          <Col className='col-sm' >
            { !!items[2] && (
              <WatchlistCard
                id={items[2].id}
                name={items[2].name}
                description={items[2].description}
                type={items[2].type}
                numberOfFilms={items[2].numberOfFilms}
                onAddMovie={(movie) => onAddMovie(items[2].id, movie)}
                onSeeMovies={(options) => onSeeMovies(items[2].id, options)}
                onMarkMovieAsWatched={
                  (movieId, watched) => markMovieAsWatched(items[2].id, movieId, watched)
                }
              />
            )}
          </Col>
        </Row>
      )
    })
}

export default Watchlists
