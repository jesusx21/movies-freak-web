import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';
import './WatchlistCard.css'

function WatchlistCard(props) {
  const { id, name, type, numberOfFilms } = props;

  const description = props.description || 'Lista sin desripción';

  const mapType = {
    marathon: 'Lista para maratonear',
    saga: 'Saga'
  };

  const typeDescription = mapType[type] || 'Lista para ver películas';

  return (
    <Card >
      <Card.Body>
        <Card.Title className='card-title'>
          <Link to={`/watchlists/${id}`}>{name}</Link>
        </Card.Title>
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
  onAddMovie: (film) => console.info(film),
};

WatchlistCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string.isRequired,
  numberOfFilms: PropTypes.number,
  onAddMovie: PropTypes.func,
  onSeeMovies: PropTypes.func,
  onMarkMovieAsWatched: PropTypes.func
};

export default WatchlistCard