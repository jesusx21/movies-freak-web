import React from 'react';
import PropTypes from 'prop-types';

import { Col, Modal, Row } from 'react-bootstrap';
import { chunk, isEmpty, isNil } from 'lodash';

import MovieCard from '../MovieCard/MovieCard'

function MoviesOnWatchlist(props) {
  const { show, onHide, watchlistName, moviesOnWatchlist, onMarkMovieAsWatched } = props;

  const hasMovies = !isEmpty(moviesOnWatchlist);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Películas en {watchlistName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { hasMovies && cards(moviesOnWatchlist, onMarkMovieAsWatched) }
      </Modal.Body>
    </Modal>
  )
}

MoviesOnWatchlist.defaultProps = {
  watchlistName: 'la Lista',
  show: false,
  onHide: () => console.log('Hidden'),
};

MoviesOnWatchlist.propTypes = {
  watchlistName: PropTypes.string,
  moviesOnWatchlist: PropTypes.array.isRequired,
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onMarkMovieAsWatched: PropTypes.func
};

function cards(moviesOnWatchlist, onMarkMovieAsWatched) {
  const sliced =  chunk(moviesOnWatchlist, 2);

  return sliced
    .map((items) => {
      return (
        <Row>
          <Col className='col-sm' >
            <MovieCard
              id={items[0].film.id}
              name={items[0].film.name}
              poster={items[0].film.poster}
              year={items[0].film.year}
              rated={items[0].film.rated}
              genre={items[0].film.genre}
              plot={items[0].film.plot}
              rating={items[0].film.imdbRating}
              locations={items[0].film.locations}
              watched={items[0].watched}
              onMarkMovieAsWatched={onMarkMovieAsWatched}
            />
          </Col>
          <Col className='col-sm' >
            { !!items[1] && (
              <MovieCard
                id={items[1].film.id}
                name={items[1].film.name}
                poster={items[1].film.poster}
                year={items[1].film.year}
                rated={items[1].film.rated}
                genre={items[1].film.genre}
                plot={items[1].film.plot}
                rating={items[1].film.imdbRating}
                locations={items[1].film.locations}
                watched={items[1].watched}
                onMarkMovieAsWatched={onMarkMovieAsWatched}
              />
            )}
          </Col>
        </Row>
      )
    });
}

export default MoviesOnWatchlist
