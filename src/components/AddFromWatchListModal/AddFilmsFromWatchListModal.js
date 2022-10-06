import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import AddItemModal from '../AddItemModal/AddItemModal';

function AddFilmsFromWatchListModal(props) {
  const { show, onHide } = props;

  const watchListIdRef = createRef();

  const onAddFromWatchList = async () => {
    await props.onAddFromWatchList(watchListIdRef.current.value);

    onHide();
  }


  return (
    <AddItemModal
      show={show}
      onHide={onHide}
      title='Add Film From Watch List'
      onCreate={onAddFromWatchList}
    >
      <Form>
        <Form.Label>Watch List Id</Form.Label>
        <Form.Control
          ref={watchListIdRef}
          type='text'
          placeholder='Id of the watch list where films are'
        />
      </Form>
    </AddItemModal>
  )
}

AddFilmsFromWatchListModal.defaultProps = {
  show: false,
  onHide: () => console.log('Hidden'),
  onAddFilm: (film) => console.info(film)
};

AddFilmsFromWatchListModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onAddFilm: PropTypes.func
};

export default AddFilmsFromWatchListModal;
