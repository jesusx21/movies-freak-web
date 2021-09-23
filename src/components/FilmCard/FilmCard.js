import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import './FilmCard.css'

function FilmCard(props) {
  const { poster, year, genre, plot, rating } = props;
  const rated = `Calificación: ${props.rated || 'No Disponible'}`;

  let title = props.name;

  if (year) {
    title += ` (${year})`
  }

  const locations = props.locations.map((location) => (
    <Col>
      <Location
        name={location.name}
        icon={location.icon}
        url={location.url}
      />
    </Col>
  ));

  return (
    <Card className='card'>
      <Card.Header>
        <Row>
          <Col><Card.Img className='poster' variant='top' src={`${poster}/50px90`} /></Col>
          <Col>
            <Card.Title className='card-title'>{title}</Card.Title>
            <Card.Subtitle className='card-subtitle'>{rated}</Card.Subtitle>
            <Card.Subtitle className='card-subtitle'>Género: {genre}</Card.Subtitle>
            <Card.Subtitle className='card-subtitle'>IMDB Rating: {rating}</Card.Subtitle>
            <Card.Subtitle className='card-subtitle'>
              <Row>{locations}</Row>
            </Card.Subtitle>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Text>{plot}</Card.Text>
      </Card.Body>
    </Card>
  )
}

FilmCard.propTypes = {
  name: PropTypes.string.isRequired,
  poster: PropTypes.string,
  year: PropTypes.string,
  rated: PropTypes.string,
  genre: PropTypes.string,
  plot: PropTypes.string,
  rating: PropTypes.string,
  locations: PropTypes.array
};

function Location(props) {
  const { name, icon, url} = props;

  return (

    <a href={url}>
      <img src={icon} />
    </a>
  )
}

Location.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  url: PropTypes.string
};

export default FilmCard
