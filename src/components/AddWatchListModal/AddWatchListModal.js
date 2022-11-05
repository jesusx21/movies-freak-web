import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';

import AddItemModal from '../AddItemModal/AddItemModal';
import { Col, Form, Row } from 'react-bootstrap';

function AddWatchListModal(props) {
  const { show, onHide } = props;

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const nameRef = createRef();
  const typeRef = createRef();
  const descriptionRef = createRef();

  const onCreateWatchList = async () => {
    await props.onCreateWatchList({ name, description, type });

    onHide();
  }

  return (
    <AddItemModal
      show={show}
      onHide={onHide}
      onCreate={onCreateWatchList}
      title='Agregar Lista'
    >
      <Form>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formName'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              ref={nameRef}
              type='text'
              onChange={(input) => setName(input.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId='formType'>
            <Form.Label>Tipo de Lista</Form.Label>
            <Form.Control
              ref={typeRef}
              type='text'
              as='select'
              onChange={(input) => setType(input.target.value)}
            >
              <option>Elige el tipo de lista</option>
              <option value='marathon'>Lista para maratonear</option>
              <option value='saga'>Saga de Películas</option>
              <option value='cinematic-universe'>Universo Cinematográfico</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='description'>
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as='textarea'
              ref={descriptionRef}
              rows={2}
              onChange={(input) => setDescription(input.target.value)}
            />
          </Form.Group>
        </Row>
      </Form>
    </AddItemModal>
  )
}

AddWatchListModal.defaultProps = {
  show: false,
  onHide: () => console.log('Hidden'),
};

AddWatchListModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onCreateWatchList: PropTypes.func
};

export default AddWatchListModal
