import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Collapse, Form, Image, Row } from 'react-bootstrap';

import AddItemModal from '../AddItemModal/AddItemModal';
import './AddFilmModal.css';
import { isEmpty } from 'lodash';

function AddFilmModal(props) {
  const { show, onHide, onIMDBFetch } = props;

  const [open, setOpen] = useState(false);
  const [imdbId, setImdbId] = useState(null);
  const [note, setNote] = useState(null);
  const [preview, setPreview] = useState(false);
  const [addAnotherFilm, setAddAnotherFilm] = useState(false);
  const [imdbFilms, setIMDBFilms] = useState([]);

  const imdbIdRef = createRef();
  const previewRef = createRef();
  const noteRef = createRef();
  const posterRef = createRef();
  const filmNameRef = createRef();
  const ratedRef = createRef();
  const genreRef = createRef();
  const yearRef = createRef();
  const plotRef = createRef();

  const onAddFilm = async () => {
    const data = await props.onAddFilm({ imdbId, note });

    if (addAnotherFilm) {
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

  const fetchFilmOnIMDB = async () => {
    const { value } = imdbIdRef.current;
    const data = await onIMDBFetch(value);

    if (!isEmpty(data)) {
      setIMDBFilms(data);
    } else {
      setImdbId(value);
    }
  }

  const onSelectIMDBFilm = (imdbFilm) => {
    setImdbId(imdbFilm.imdbId);
    setOpen(false);
    setPreview(true);

    previewRef.current.src = true;
    posterRef.current.src = imdbFilm.poster;
    filmNameRef.current.value = imdbFilm.title;
    ratedRef.current.value = imdbFilm.rated;
    genreRef.current.value = imdbFilm.genre;
    yearRef.current.value = imdbFilm.year;
    plotRef.current.value = imdbFilm.plot;
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
          <Form.Control
            ref={imdbIdRef}
            type='text'
            placeholder='tt12749596'
            onChange={fetchFilmOnIMDB}
            onClick={() => setOpen(!open)}
          />

          <div hidden={!open} style={{ minHeight: '150px' }}>
            <Collapse in={open} dimension='width'>
              <Card body style={{ width: '400px' }}>
                <ul className='list-unstyled'>
                  {
                    imdbFilms.map((imdbFilm) => {
                      return (
                        <li>
                          <div
                            className='imdb-film'
                            onClick={() => onSelectIMDBFilm(imdbFilm)}
                            >
                              {imdbFilm.title}
                            </div>
                        </li>
                      );
                    })
                  }
                </ul>
              </Card>
            </Collapse>
          </div>
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
            ref={previewRef}
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
          <Form.Check
          type='checkbox'
          label='Agregar otra película'
          onChange={(input) => setAddAnotherFilm(input.target.checked)}/>
        </Form.Group>
      </Form>
    </AddItemModal>
  )
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
