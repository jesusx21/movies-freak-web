import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal, ModalBody } from 'react-bootstrap';
import './AddFilmModal.css'

function AddFilmModal(props) {
  const { show, onHide } = props;

  const [imdbId, setImdbId] = useState(null);
  const [addAnotherMovie, setAddAnotherMovie] = useState(false)

  const OnAddAnotherFilmChange = (input) => {
    setAddAnotherMovie(input.target.checked);
  }

  const onImdbIdChange = (input) => {
    setImdbId(input.target.value);
  }

  const onAddFilm = () => {
    console.log({imdbId, addAnotherMovie});
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Filme</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formImdbId'>
            <Form.Label>IMDB Id</Form.Label>
            <Form.Control type='text' placeholder='tt12749596' onChange={onImdbIdChange} />
            <Form.Text className='text-muted'>
              Usaremos el id de IMDB para buscar la película y agregarla a tu lista
            </Form.Text>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formCheckbox'>
            <Form.Check type='checkbox' label='Agregar otra película' onChange={OnAddAnotherFilmChange}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant='outline-secondary' onClick={onHide}>Cerrar</Button>
          <Button variant='outline-success' onClick={onAddFilm}>Agregar</Button>
      </Modal.Footer>
    </Modal>
  )
}

AddFilmModal.defaultProps = {
  show: false,
  onHide: () => console.log('Hidden')
};

AddFilmModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func
};

export default AddFilmModal
