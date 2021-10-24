import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import AddMovieModal from '../AddMovieModal/AddMovieModal';
import MoviesOnWatchlist from '../MovieOnWatchlist/MoviesOnWatchlist';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=''
    className='menu-header'
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

function WatchlistCardMenu(props) {
  const { onAddMovie, onSeeMovies, watchlistName } = props;

  const [moviesOnWatchlist, setMoviesOnWatchlist] = useState([]);
  const [showSeeMoviesModal, setShowSeeMoviessModal] = useState(false);
  const [showSeeRandomMoviesModal, setShowSeeRandomMoviessModal] = useState(false);
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);

  const onSelect = async (option) => {
    if (option === 'add-movie') {
      setShowAddMovieModal(true);
    }

    if (option === 'see-movies') {
      const movies  = await onSeeMovies();
      setMoviesOnWatchlist(movies);

      setShowSeeMoviessModal(true);
    }

    if (option === 'see-random-movies') {
      const movies = await onSeeMovies({ random: true, limit: 3 });
      setMoviesOnWatchlist(movies);

      setShowSeeRandomMoviessModal(true);
    }
  }

  return (
    <>
      <Dropdown className='options' onSelect={onSelect}>
        <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
          Opciones
        </Dropdown.Toggle>

        <Dropdown.Menu className='options-items'>
          <Dropdown.Item eventKey='add-movie'>Agregar película</Dropdown.Item>
          <Dropdown.Item eventKey='add-movie-from-list'>Agregar película desde lista</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey='see-movies'>Ver películas</Dropdown.Item>
          <Dropdown.Item eventKey='see-random-movies'>Ver películas aleatorios</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey='mark-as-watched'>Marcar todos los películas como vistos</Dropdown.Item>
          <Dropdown.Item eventKey='mark-as-unwatched'>Marcar todos los películas como no vistos</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <AddMovieModal
        show={showAddMovieModal}
        onHide={() => setShowAddMovieModal(false)}
        onAddMovie={onAddMovie}
      />
      <MoviesOnWatchlist
        watchlistName={watchlistName}
        show={showSeeMoviesModal}
        onHide={() => setShowSeeMoviessModal(false)}
        moviesOnWatchlist={moviesOnWatchlist}
        onMarkMovieAsWatched={props.onMarkMovieAsWatched}
      />
      <MoviesOnWatchlist
        watchlistName={watchlistName}
        show={showSeeRandomMoviesModal}
        onHide={() => setShowSeeRandomMoviessModal(false)}
        moviesOnWatchlist={moviesOnWatchlist}
        onMarkMovieAsWatched={props.onMarkMovieAsWatched}
      />
    </>
  )
}

WatchlistCardMenu.defaultProps = {
  onAddMovie: (movie) => console.info(movie)
};

WatchlistCardMenu.propTypes = {
  watchlistName: PropTypes.string,
  onAddMovie: PropTypes.func,
  onSeeMovies: PropTypes.func,
  onMarkMovieAsWatched: PropTypes.func
};

export default WatchlistCardMenu
