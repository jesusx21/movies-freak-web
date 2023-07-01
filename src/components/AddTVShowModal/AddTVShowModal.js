import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Image, Row } from 'react-bootstrap';

import AddItemModal from '../AddItemModal/AddItemModal';

function AddTVShowModal(props) {
  const { show, onHide } = props;

  const [imdbId, setImdbId] = useState('');
  const [preview, setPreview] = useState(false);
  const [addAnotherTVShow, setAddAnotherTVShow] = useState(false);

  const imdbIdRef = createRef();
  const genreRef = createRef();
  const nameRef = createRef();
  const posterRef = createRef();
  const previewRef = createRef();
  const ratedRef = createRef();
  const yearsRef = createRef();
  const plotRef = createRef();

  const onCreateTVShow = async () => {
    const data = await props.onCreateTVShow({ imdbId });

    if (!data) {
      return;
    }

    if (!addAnotherTVShow) {
      onHide();
    } else {
      imdbIdRef.current.value = '';
      posterRef.current.src = data.poster;
      nameRef.current.value = data.name;
      ratedRef.current.value = data.rated;
      genreRef.current.value = data.genre;
      yearsRef.current.value = data.years;
      plotRef.current.value = data.plot;
    }
  }

  return (
    <AddItemModal
      show={show}
      onHide={onHide}
      onCreate={onCreateTVShow}
      createLabel='Agregar'
      title='Agregar Serie'
    >
      <Form>
        <Form.Group className='mb-3'  controlId='formImdbId'>
          <Form.Label>IMDB Id</Form.Label>
          <Form.Control
            ref={imdbIdRef}
            type='text'
            onChange={(input) => setImdbId(input.target.value)}
            placeholder='tt0458290'
          />
        </Form.Group>
        <Form.Text className='text-muted'>
          Usaremos el id de IMDB para buscar la serie y agregarla
        </Form.Text>

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
              <Form.Control ref={nameRef} type='text' disabled />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md='3'>
              <Form.Label className='text-muted'>Clasificacion:</Form.Label>
              <Form.Control ref={ratedRef} type='text' disabled />
            </Form.Group>
            <Form.Group as={Col} md='5'>
              <Form.Label className='text-muted'>Generos:</Form.Label>
              <Form.Control ref={genreRef} type='text' disabled />
            </Form.Group>
            <Form.Group as={Col} md='4'>
              <Form.Label className='text-muted'>Años:</Form.Label>
              <Form.Control ref={yearsRef} type='text' disabled />
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
          label='Agregar otra serie'
          onChange={(input) => setAddAnotherTVShow(input.target.checked)}/>
        </Form.Group>
      </Form>
    </AddItemModal>
  )
}

AddTVShowModal.defaultProps = {
  show: false,
  onHide: () => console.log('Hidden'),
};

AddTVShowModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCreateTVShow: PropTypes.func
};

export default AddTVShowModal
