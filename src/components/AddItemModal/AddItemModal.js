import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import './AddItemModal.css';

function AddItemModal(props) {
  const { closeLabel, createLabel, children, show, title, onHide, onCreate } = props;

  return (
    <Modal animation={true} show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>

      <Modal.Footer>
          <Button variant='outline-secondary' onClick={onHide}>{closeLabel}</Button>
          <Button variant='outline-success' onClick={onCreate}>{createLabel}</Button>
      </Modal.Footer>
    </Modal>
  )
}

AddItemModal.defaultProps = {
  createLabel: 'Crear',
  closeLabel: 'Cerrar',
  show: false,
  onHide: () => console.log('Hidden'),
  onCreate: () => console.info('Create')
};

AddItemModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  createLabel: PropTypes.string,
  closeLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onCreate: PropTypes.func
};

export default AddItemModal
