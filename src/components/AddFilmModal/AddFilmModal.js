import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import './AddFilmModal.css'
import AddItemModal from '../AddItemModal';

function AddFilmModal(props) {
  const { show, onHide } = props;

  const [imdbId, setImdbId] = useState(null);
  const [note, setNote] = useState(null);
  const [preview, setPreview] = useState(false);
  const [addAnotherMovie, setAddAnotherMovie] = useState(false);

  const imdbIdRef = createRef();
  const noteRef = createRef();
  const posterRef = createRef();
  const filmNameRef = createRef();
  const ratedRef = createRef();
  const genreRef = createRef();
  const yearRef = createRef();
  const plotRef = createRef();

  const watchPreview = () => setPreview(!preview);

  const OnAddAnotherFilmChange = (input) => {
    setAddAnotherMovie(input.target.checked);
  }

  const onImdbIdChange = (input) => {
    setImdbId(input.target.value);
  }

  const onNoteChange = (input) => {
    setNote(input.target.value);
  }

  const onAddFilm = async () => {
    const data = await props.onAddFilm({ imdbId, note });

    if (addAnotherMovie) {
      imdbIdRef.current.value = '';
      noteRef.current.value = '';

      posterRef.current.src = data.film.poster;
      filmNameRef.current.value = data.film.title || data.film.name;
      ratedRef.current.value = data.film.rated;
      genreRef.current.value = data.film.genre;
      yearRef.current.value = data.film.year;
      plotRef.current.value = data.film.plot;
    } else {
      onHide();
    }
  }

  return (
    <AddItemModal
      show={show}
      onHide={onHide}
      createLabel='Agregar'
      title='Agregar Película'
      onCreate={onAddFilm}
    >
      <Form>
        <Form.Group className='mb-3' controlId='formImdbId'>
          <Form.Label>IMDB Id</Form.Label>
          <Form.Control ref={imdbIdRef} type='text' placeholder='tt12749596' onChange={onImdbIdChange} />
          <Form.Text className='text-muted'>
            Usaremos el id de IMDB para buscar la película y agregarla a tu lista
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formNote'>
          <Form.Label>Nota</Form.Label>
          <Form.Control as='textarea' ref={noteRef} rows={2} onChange={onNoteChange} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='preview'>
          <Form.Check type='checkbox' default={preview} label='Preview' onClick={watchPreview} />
        </Form.Group>

        <Form hidden={!preview}>
          <Row className='mb-3'>
            <Col xs={6} md={4}>
              <Image ref={posterRef} thumbnail={true} />
            </Col>
            <Form.Group as={Col}>
              <Form.Label className='text-muted'>Nombre:</Form.Label>
              <Form.Control ref={filmNameRef} type='text' disabled />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md='3'>
              <Form.Label className='text-muted'>Clasificacion:</Form.Label>
              <Form.Control ref={ratedRef} type='text' disabled />
            </Form.Group>
            <Form.Group as={Col} md='5'>
              <Form.Label className='text-muted'>Genero:</Form.Label>
              <Form.Control ref={genreRef} type='text' disabled />
            </Form.Group>
            <Form.Group as={Col} md='4'>
              <Form.Label className='text-muted'>Año:</Form.Label>
              <Form.Control ref={yearRef} type='text' disabled />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label className='text-muted'>Sinopsis:</Form.Label>
              <Form.Control as='textarea' rows={3} ref={plotRef} disabled />
            </Form.Group>
          </Row>
        </Form>

        <Form.Group className='mb-3' controlId='formCheckbox'>
          <Form.Check type='checkbox' label='Agregar otra película' onChange={OnAddAnotherFilmChange}/>
        </Form.Group>
      </Form>
    </AddItemModal>
  );
}

AddFilmModal.defaultProps = {
  show: false,
  onHide: () => console.log('Hidden'),
  onAddFilm: (film) => console.info(film)
};

AddFilmModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onAddFilm: PropTypes.func
};

export default AddFilmModal
