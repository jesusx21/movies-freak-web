import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Image, Row } from 'react-bootstrap';

import AddItemModal from '../AddItemModal/AddItemModal';

function AddMovieModal(props) {
  const { show, onHide } = props;

  const [imdbId, setImdbId] = useState(null);
  const [note, setNote] = useState(null);
  const [preview, setPreview] = useState(false);
  const [addAnotherMovie, setAddAnotherMovie] = useState(false);

  const imdbIdRef = createRef();
  const noteRef = createRef();
  const posterRef = createRef();
  const movieNameRef = createRef();
  const ratedRef = createRef();
  const genreRef = createRef();
  const yearRef = createRef();
  const plotRef = createRef();

  const onAddMovie = async () => {
    const data = await props.onAddMovie({ imdbId, note });

    if (addAnotherMovie) {
      imdbIdRef.current.value = '';
      noteRef.current.value = '';

      posterRef.current.src = data.film.poster;
      movieNameRef.current.value = data.film.title || data.film.name;
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
      onCreate={onAddMovie}
    >
      <Form>
        <Form.Group className='mb-3' controlId='formImdbId'>
          <Form.Label>IMDB Id</Form.Label>
          <Form.Control
            ref={imdbIdRef}
            type='text'
            placeholder='tt12749596'
            onChange={(input) => setImdbId(input.target.value)}
          />
          <Form.Text className='text-muted'>
            Usaremos el id de IMDB para buscar la película y agregarla a tu lista
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formNote'>
          <Form.Label>Nota</Form.Label>
          <Form.Control
            as='textarea'
            ref={noteRef}
            rows={2}
            onChange={(input) => setNote(input.target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='preview'>
          <Form.Check
            type='checkbox'
            default={preview}
            label='Preview'
            onClick={() => setPreview(!preview)}
          />
        </Form.Group>

        <Form hidden={!preview}>
          <Row className='mb-3'>
            <Col xs={6} md={4}>
              <Image ref={posterRef} thumbnail={true} />
            </Col>
            <Form.Group as={Col}>
              <Form.Label className='text-muted'>Nombre:</Form.Label>
              <Form.Control ref={movieNameRef} type='text' disabled />
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
          <Form.Check
          type='checkbox'
          label='Agregar otra película'
          onChange={(input) => setAddAnotherMovie(input.target.checked)}/>
        </Form.Group>
      </Form>
    </AddItemModal>
  )
}

AddMovieModal.defaultProps = {
  show: false,
  onHide: () => console.log('Hidden'),
  onAddMovie: (movie) => console.info(movie)
};

AddMovieModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onAddMovie: PropTypes.func
};

export default AddMovieModal
