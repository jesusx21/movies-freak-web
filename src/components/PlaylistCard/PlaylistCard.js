import React from 'react';
import PropTypes from 'prop-types';
import PlaylistMenu from './PlaylistMenu';
import { Card } from 'react-bootstrap';
import './PlaylistCard.css'

function PlaylistCard(props) {
  const { name, description, type, numberOfFilms, onAddFilm, onSeeFilms } = props;

  return (
    <Card>
      <PlaylistMenu
        onAddFilm={onAddFilm}
        onSeeFilms={onSeeFilms}
      />

      <Card.Body>
        <Card.Title className='card-title'>{name}</Card.Title>
        <Card.Subtitle className='card-subtitle'>{type}</Card.Subtitle>
        <Card.Text className='card-text'>
          {`-> ${description}`}
          <br />
          {`-> Esta lista tiene ${numberOfFilms} película(s) agregada(s)`}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

PlaylistCard.defaultProps = {
  description: '',
  numberOfFilms: 0,
  onAddFilm: (film) => console.info(film),
  onSeeFilms: (setFilms) => console.info(setFilms)
};

PlaylistCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string.isRequired,
  numberOfFilms: PropTypes.number,
  onAddFilm: PropTypes.func,
  onSeeFilms: PropTypes.func
};

export default PlaylistCard
