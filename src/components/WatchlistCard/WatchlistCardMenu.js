// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Dropdown } from 'react-bootstrap';

// import './WatchlistCard.css';

// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//   <a
//     href=''
//     className='menu-header'
//     ref={ref}
//     onClick={(e) => {
//       e.preventDefault();
//       onClick(e);
//     }}
//   >
//     {children}
//     &#x25bc;
//   </a>
// ));

// const CustomMenu = React.forwardRef(
//   ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
//     const [value, setValue] = useState('');

//     return (
//       <div
//         ref={ref}
//         style={style}
//         className={className}
//         aria-labelledby={labeledBy}
//       >
//         <ul className='list-unstyled'>
//           {React.Children.toArray(children).filter(
//             (child) => !value || child.props.children.toLowerCase().startsWith(value),
//           )}
//         </ul>
//       </div>
//     );
//   },
// );

// function WatchlistCardMenu(props) {
//   const { onAddFilm, onSeeFilms, watchlistName } = props;

//   const [filmsOnWatchlist, setFilmsOnWatchlist] = useState([]);
//   const [showSeeFilmsModal, setShowSeeFilmssModal] = useState(false);
//   const [showSeeRandomFilmsModal, setShowSeeRandomFilmssModal] = useState(false);
//   const [showAddFilmModal, setShowAddFilmModal] = useState(false);

//   const onSelect = async (option) => {
//     if (option === 'add-film') {
//       setShowAddFilmModal(true);
//     }

//     if (option === 'see-films') {
//       const films  = await onSeeFilms();
//       setFilmsOnWatchlist(films);

//       setShowSeeFilmssModal(true);
//     }

//     if (option === 'see-random-films') {
//       const films = await onSeeFilms({ random: true, limit: 3 });
//       setFilmsOnWatchlist(films);

//       setShowSeeRandomFilmssModal(true);
//     }
//   }

//   return (
//     <>
//       <Dropdown className='options' onSelect={onSelect}>
//         <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
//           Opciones
//         </Dropdown.Toggle>

//         <Dropdown.Menu as={CustomMenu} className='options-items'>
//           <Dropdown.Item eventKey='add-movie'>Agregar película</Dropdown.Item>
//           <Dropdown.Item eventKey='add-movie-from-list'>Agregar película desde lista</Dropdown.Item>
//           <Dropdown.Divider />
//           <Dropdown.Item eventKey='see-movies'>Ver películas</Dropdown.Item>
//           <Dropdown.Item eventKey='see-random-movies'>Ver películas aleatorios</Dropdown.Item>
//           <Dropdown.Divider />
//           <Dropdown.Item eventKey='mark-as-watched'>Marcar todos los películas como vistos</Dropdown.Item>
//           <Dropdown.Item eventKey='mark-as-unwatched'>Marcar todos los películas como no vistos</Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>
//       {/* <AddMovieModal
//         show={showAddMovieModal}
//         onHide={() => setShowAddMovieModal(false)}
//         onAddMovie={onAddMovie}
//       />
//       <MoviesOnWatchlist
//         watchlistName={watchlistName}
//         show={showSeeMoviesModal}
//         onHide={() => setShowSeeMoviessModal(false)}
//         moviesOnWatchlist={moviesOnWatchlist}
//         onMarkMovieAsWatched={props.onMarkMovieAsWatched}
//       />
//       <MoviesOnWatchlist
//         watchlistName={watchlistName}
//         show={showSeeRandomMoviesModal}
//         onHide={() => setShowSeeRandomMoviessModal(false)}
//         moviesOnWatchlist={moviesOnWatchlist}
//         onMarkMovieAsWatched={props.onMarkMovieAsWatched}
//       /> */}
//     </>
//   )
// }

// WatchlistCardMenu.defaultProps = {
//   onAddMovie: (movie) => console.info(movie)
// };

// WatchlistCardMenu.propTypes = {
//   watchlistName: PropTypes.string,
//   onAddFilm: PropTypes.func,
//   onSeeFilms: PropTypes.func,
//   onMarkFilmAsWatched: PropTypes.func
// };

// export default WatchlistCardMenu


import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu


function WatchlistCardMenu() {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
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

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Orange
        </Dropdown.Item>
        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default WatchlistCardMenu;
