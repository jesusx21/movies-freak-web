import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';

import FilmCard from '../FilmCard/FilmCard';
import './FilmsOnWatchList.css';

function FilmsOnWatchList(props) {
  const { show, onHide, watchListName, filmsOnWatchList, onMarkFilmAsWatched } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Películas en {watchListName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='films-on-watchlist-cards'>
          {
            filmsOnWatchList.map((filmOnWatchList) => {
              const { film, watched } = filmOnWatchList;
              return (
                <FilmCard
                    id={film.id}
                    name={film.name}
                    poster={film.poster}
                    year={film.year}
                    rated={film.rated}
                    genre={film.genre}
                    plot={film.plot}
                    rating={film.rating}
                    locations={film.locations}
                    watched={watched}
                    onMarkFilmAsWatched={onMarkFilmAsWatched}
                  />
              );
            })
          }
        </div>
      </Modal.Body>
    </Modal>
  )
}

FilmsOnWatchList.defaultProps = {
  watchListName: 'La Lista',
  show: false,
  onHide: () => console.log('Hidden'),
};

FilmsOnWatchList.propTypes = {
  watchListName: PropTypes.string,
  filmsOnWatchList: PropTypes.array.isRequired,
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onMarkFilmAsWatched: PropTypes.func
};

export default FilmsOnWatchList
