import React, { useEffect, useState } from 'react';
import SearchField from 'react-search-field';
import { chunk, isEmpty } from 'lodash';
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Menu from './Menu';
import toastParams from '../../toastParams';
import WatchlistCard from '../../components/WatchlistCard/WatchlistCard';
import * as api from '../api';
import '../../style.css'
import './Watchlists.css'

function Watchlists() {
  const [watchlists, setWatchLists] = useState([]);
  const showCard = !isEmpty(watchlists);

  const createWatchlist = async (watchlist) => {
    try {
      const { data } = await api.createWatchlist(watchlist)

      setWatchLists([...watchlists, data]);
      toast.success('Watchlist created successfully', toastParams);
    } catch(error) {
      console.error(error);
      toast.error('There\'s a problem wi¡th the server, please contact support', toastParams);
    }
  }

  const loadWatchlists = async (query = {}) => {
    try {
      const { data } = await api.getWatchlists(query);

      setWatchLists(data)
    } catch (error) {
      console.log(error);
      toast.error('There\'s a problem wi¡th the server, please contact support', toastParams);
    }
  }

  useEffect(() => {
    loadWatchlists();
  }, []);

  const onSearchChange = (input) => {
    loadWatchlists({ q: input })
  }

  const addFilm = () => {}
  const getFilms = () => {}
  const onSeeFilms = () => {}
  const markFilmAsWatched = () => {}

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
      {showCard && cards(watchlists, addFilm, onSeeFilms, markFilmAsWatched)}
      <Menu onCreateWatchlist={createWatchlist}/>
    </Container>
  );
}

function cards(watchlists, onAddFilm, onSeeFilms, markFilmAsWatched) {
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
              onAddFilm={(movie) => onAddFilm(items[0].id, movie)}
              onSeeFilms={(options) => onSeeFilms(items[0].id, options)}
              onMarkFilmAsWatched={
                (movieId, watched) => markFilmAsWatched(items[0].id, movieId, watched)
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
                onAddFilm={(movie) => onAddFilm(items[1].id, movie)}
                onSeeFilms={(options) => onSeeFilms(items[1].id, options)}
                onMarkFilmAsWatched={
                  (movieId, watched) => markFilmAsWatched(items[1].id, movieId, watched)
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
                onAddFilm={(movie) => onAddFilm(items[2].id, movie)}
                onSeeFilms={(options) => onSeeFilms(items[2].id, options)}
                onMarkFilmAsWatched={
                  (movieId, watched) => markFilmAsWatched(items[2].id, movieId, watched)
                }
              />
            )}
          </Col>
        </Row>
      )
    })
}

export default Watchlists
