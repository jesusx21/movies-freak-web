import React from 'react';
import PropTypes from 'prop-types';
import './PlaylistCard'
import PlaylistMenu from './PlaylistMenu';
import { Card } from 'react-bootstrap';

function PlaylistCard(props) {
  const { name, type, numberOfFilms } = props;
  const description = props.description || 'Lista sin desripción';

  const mapType = {
    marathon: 'Lista para maratonear'
  };

  const typeDescription = mapType[type] || 'Lista para ver películas';

  return (
    <Card>
      <PlaylistMenu />

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

PlaylistCard.defaultProps = {
  description: '',
  numberOfFilms: 0
};

PlaylistCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string.isRequired,
  numberOfFilms: PropTypes.number
};

export default PlaylistCard
