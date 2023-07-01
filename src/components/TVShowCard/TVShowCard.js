import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import { Button, Card, Col, Row } from 'react-bootstrap';

import './TVShowCard.css'
import { Link } from 'react-router-dom';

function TVShowCard(props) {
  const { id, poster, years, genre, plot, imdbRating, episodeNumber, totalSeasons } = props;
  const rated = props.rated || 'No Disponible';
  const [watched, setWatched] = useState(false);

  let title = props.name;

  if (years) {
    title += ` (${years})`
  }

  const onMarkAsWatched = async () => {
    await props.onMarkTVShowAsWatched(id, watched);

    setWatched(!watched);
  }

  useEffect(() => {
    setWatched(props.watched);
  }, [props.watched]);

  const totalSeasonsRender = (
    <><strong>Number of Seasons:</strong> {totalSeasons}</>
  );

  const numberEpisodeRender = (
    <><strong>Number of Episode:</strong> {episodeNumber}</>
  );

  return (
    <Card className='film-card' bg={watched ? 'secondary' : 'light'}>
      <Card.Header>
        <Row>
          <Link to={`/tv-shows/${id}`}>
            <Col><Card.Img className='poster' variant='top' src={`${poster}/50px90`} /></Col>
            <Col>
              <Card.Text>
                <strong>{title}</strong><br />
                <strong>Calificación:</strong> {rated}<br />
                <strong>Género:</strong> {genre} <br />
                <strong>IMDB Rating:</strong> {imdbRating} <br />
                {totalSeasons && totalSeasonsRender }
                {episodeNumber && numberEpisodeRender }
              </Card.Text>
            </Col>
          </Link>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text>{plot}</Card.Text>
      </Card.Body>
      <Button hidden={isNil(watched)} border='dark' variant='outline-dark' onClick={onMarkAsWatched}>
       {watched ? 'Marcar como no vista' : 'Marcar como vista'}
      </Button>
    </Card>
  )
}

TVShowCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  poster: PropTypes.string,
  years: PropTypes.string,
  rated: PropTypes.string,
  imdbRating: PropTypes.string,
  genre: PropTypes.array,
  totalSeasons: PropTypes.number,
  episodeNumber: PropTypes.number,
  plot: PropTypes.string,
  watched: PropTypes.bool,
  onMarkTVShowAsWatched: PropTypes.func
};

export default TVShowCard
