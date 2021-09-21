import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import AddFilmModal from '../AddFilmModal/AddFilmModal';
import './PlaylistCard.css'

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
  const onHideAddFilmModal = () => setShowAddFilmModal(false);
  const { onAddFilm } = props;

  const onSelect = (option) => {
    if (option === 'add-film') {
      setShowAddFilmModal(true);
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
        onHide={onHideAddFilmModal}
        onAddFilm={onAddFilm}
      />
    </>
  )
}

PlaylistMenu.defaultProps = {
  onAddFilm: (film) => console.info(film)
};

PlaylistMenu.propTypes = {
  onAddFilm: PropTypes.func
};

export default PlaylistMenu
