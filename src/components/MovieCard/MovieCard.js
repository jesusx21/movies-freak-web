import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row } from 'react-bootstrap';

import StreamingLocation from '../StreamingLocation/StreamingLocation';
import './MovieCard.css'

function MovieCard(props) {
  const { id, poster, year, genre, plot, rating } = props;
  const rated = `Calificación: ${props.rated || 'No Disponible'}`;
  const [watched, setWatched] = useState(props.watched)

  let title = props.name;

  if (year) {
    title += ` (${year})`
  }

  const onMarkAsWatched = async () => {
    await props.onMarkMovieAsWatched(id, watched);

    setWatched(!watched);
  }

  const locations = props.locations.map((location) => (
    <Col>
      <StreamingLocation
        name={location.name}
        icon={location.icon}
        url={location.url}
      />
    </Col>
  ));

  return (
    <Card className='movie-card' bg={watched ? 'secondary' : 'light'}>
      <Card.Header>
        <Row>
          <Col><Card.Img className='poster' variant='top' src={`${poster}/50px90`} /></Col>
          <Col>
            <Card.Text>{title}</Card.Text>
            <Card.Text>{rated}</Card.Text>
            <Card.Text>Género: {genre}</Card.Text>
            <Card.Text>IMDB Rating: {rating}</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Text>
              <Row>{locations}</Row>
            </Card.Text>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text>{plot}</Card.Text>
      </Card.Body>
      <Button border='dark' variant='outline-dark' onClick={onMarkAsWatched}>
       {watched ? 'Marcar como no vista' : 'Marcar como vista'}
      </Button>
    </Card>
  )
}

MovieCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  poster: PropTypes.string,
  year: PropTypes.string,
  rated: PropTypes.string,
  genre: PropTypes.string,
  plot: PropTypes.string,
  rating: PropTypes.string,
  locations: PropTypes.array,
  watched: PropTypes.bool,
  onMarkMovieAsWatched: PropTypes.func
};

export default MovieCard
