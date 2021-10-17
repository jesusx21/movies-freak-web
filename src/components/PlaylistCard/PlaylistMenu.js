import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Dropdown } from 'react-bootstrap';
import AddFilmModal from '../AddFilmModal/AddFilmModal';
import './PlaylistCard.css'
import FilmsOnList from '../FilmsOnList';
import Film from '../../views/Films/Film';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
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

function PlaylistMenu(props) {
  const [showAddFilmModal, setShowAddFilmModal] = useState(false);
  const [showSeeFilmsModal, setShowSeeFilmsModal] = useState(false);
  const [showSeeRandomFilmsModal, setShowSeeRandomFilmsModal] = useState(false);
  const [films, setFilms] = useState([]);
  const { onAddFilm, onSeeFilms } = props;

  const onSelect = async (option) => {
    if (option === 'add-film') {
      setShowAddFilmModal(true);
    }
    if (option === 'see-films') {
      const films = await onSeeFilms();
      setFilms(films);

      setShowSeeFilmsModal(true)
    }
    if (option === 'see-random-films') {
      const films = await onSeeFilms({ random: true, limit: 3 });
      setFilms(films);

      setShowSeeRandomFilmsModal(true)
    }
  }

  return (
    <>
      <Dropdown className='options' onSelect={onSelect}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          Opciones
        </Dropdown.Toggle>

        <Dropdown.Menu className='options-items'>
          <Dropdown.Item eventKey='add-film'>Agregar película</Dropdown.Item>
          <Dropdown.Item eventKey='add-film-from-list'>Agregar película desde lista</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey='see-films'>Ver películas</Dropdown.Item>
          <Dropdown.Item eventKey='see-random-films'>Ver películas aleatorios</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey='mark-as-watched'>Marcar todos los películas como vistos</Dropdown.Item>
          <Dropdown.Item eventKey='mark-as-unwatched'>Marcar todos los películas como no vistos</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <AddFilmModal
        show={showAddFilmModal}
        onHide={() => setShowAddFilmModal(false)}
        onAddFilm={onAddFilm}
      />
      <FilmsOnList
        show={showSeeFilmsModal}
        onHide={() => setShowSeeFilmsModal(false)}
        filmsOnList={films}
      />
      <FilmsOnList
        show={showSeeRandomFilmsModal}
        onHide={() => setShowSeeRandomFilmsModal(false)}
        filmsOnList={films}
      />
    </>
  )
}

PlaylistMenu.defaultProps = {
  onAddFilm: (film) => console.info(film)
};

PlaylistMenu.propTypes = {
  onAddFilm: PropTypes.func,
  onSeeFilms: PropTypes.func
};

export default PlaylistMenu
