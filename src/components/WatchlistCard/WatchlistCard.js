import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import WatchlistCardMenu from './WatchlistCardMenu';
import './WatchlistCard.css';

function WatchlistCard(props) {
  const {
    name,
    type,
    numberOfFilms,
    description = 'Lista sin descripción'
  } = props;

  const mapType = {
    marathon: 'Lista para maratonear',
    saga: 'Saga'
  };

  const typeDescription = mapType[type] || 'Lista para ver películas';

  return (
    <Card >
    <WatchlistCardMenu
      watchlistName={name}
      onAddFilm={props.onAddFilm}
      onSeeFilms={props.onSeeFilms}
      onMarkFilmAsWatched={props.onMarkFilmAsWatched}
    />

      <Card.Body>
        <Card.Title className='card-title'>{name}</Card.Title>
        <Card.Subtitle className='card-subtitle'>{typeDescription}</Card.Subtitle>
        <Card.Text className='card-text'>
          {`-> ${description}`}
          <br />
          {`-> Esta lista tiene ${numberOfFilms} película(s) agregada(s)`}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

WatchlistCard.defaultProps = {
  description: '',
  numberOfFilms: 0,
  onAddFilm: (film) => console.info(film),
}

WatchlistCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string.isRequired,
  numberOfFilms: PropTypes.number,
  onAddFilm: PropTypes.func,
  onSeeFilms: PropTypes.func,
  onMarkFilmAsWatched: PropTypes.func
}

export default WatchlistCard
