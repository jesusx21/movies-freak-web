import React from 'react';
import PropTypes from 'prop-types';
import { Col, Modal } from 'react-bootstrap';
import Film from '../views/Films/Film';
import { isEmpty } from 'lodash';

function FilmsOnList(props) {
  const {  show, onHide, filmsOnList, listName } = props;

  const has_films = !isEmpty(filmsOnList)

  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{`Películas en ${listName}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {has_films && cards(filmsOnList)}
      </Modal.Body>
    </Modal>
  )
}

FilmsOnList.defaultProps = {
  listName: 'la Lista',
  show: false,
  onHide: () => console.log('Hidden'),
};

FilmsOnList.propTypes = {
  listName: PropTypes.string,
  filmsOnList: PropTypes.array.isRequired,
  show: PropTypes.bool,
  onHide: PropTypes.func
};

function cards(filmsOnList) {
  return filmsOnList.map(({ film }) => {
    return (
      <Col xs={6} md={5}>
        <Film
          id={film.id}
          name={film.name}
          title={film.title}
          poster={film.poster}
          year={film.year}
          rated={film.rated}
          genre={film.genre}
          plot={film.plot}
          rating={film.imdbRating}
          locations={film.locations}
        />
      </Col>
    );
  });
}

export default FilmsOnList
