import React from 'react';
import PropTypes from 'prop-types';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import * as api from './api';

function Playlist(props) {
  const { id: listId, name, type, numberOfFilms } = props;
  const description = props.description || 'Lista sin desripción';

  const mapType = {
    marathon: 'Lista para maratonear'
  };

  const typeDescription = mapType[type] || 'Lista para ver películas';

  const addFilm = async (film) => {
    try {
      const { data } = await api.addFilm(listId, film);

      return data;
    } catch(error) {
      console.error(error);
    }
  }

  const getFilms = (options = {}) => {
    if (options.random) {
      return api.getRandomFilms(listId, { limit: options.limit });
    }

    return api.getFilmsOnList(listId);
  }

  const onSeeFilms = async (options = {}) => {
    try {
      const { data } = await getFilms(options);

      return data;
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <PlaylistCard
      name={name}
      description={description}
      type={typeDescription}
      numberOfFilms={numberOfFilms}
      onAddFilm={addFilm}
      onSeeFilms={onSeeFilms}
    />
  )
}

Playlist.defaultProps = {
  description: '',
  numberOfFilms: 0
};

Playlist.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string.isRequired,
  numberOfFilms: PropTypes.number
};

export default Playlist
