import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import AddItemModal from '../AddItemModal/AddItemModal';

function AddFilmsFromWashlistModal(props) {
  const { show, onHide } = props;

  const watchlistIdRef = createRef();

  const onAddFromWatchlist = async () => {
    await props.onAddFromWatchlist(watchlistIdRef.current.value);

    onHide();
  }


  return (
    <AddItemModal
      show={show}
      onHide={onHide}
      onCreate={onAddFromWatchlist}
    >
      <Form>
        <Form.Label>Watchlist Id</Form.Label>
        <Form.Control
          ref={watchlistIdRef}
          type='text'
          placeholder='Id of the watchlist where films are'
        />
      </Form>
    </AddItemModal>
  )
}

AddFilmsFromWashlistModal.defaultProps = {
  show: false,
  onHide: () => console.log('Hidden'),
  onAddMovie: (movie) => console.info(movie)
};

AddFilmsFromWashlistModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onAddMovie: PropTypes.func
};

export default AddFilmsFromWashlistModal;
