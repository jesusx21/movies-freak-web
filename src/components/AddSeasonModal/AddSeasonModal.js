import React from 'react';
import PropTypes from 'prop-types';
import AddItemModal from '../AddItemModal/AddItemModal';

function AddSeasonModal(props) {
  const { onAddSeason, onHide, show } = props;

  return (
    <AddItemModal
      show={show}
      onHide={onHide}
      createLabel='Add'
      title='Add TV Show Season'
      onCreate={onAddSeason}
    >

    </AddItemModal>
  );
}

AddSeasonModal.defaultProps = {
  show: false,
  onHide: () => console.log('Hidden'),
  onAddSeason: (season) => console.info(season)
};

AddSeasonModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onAddSeason: PropTypes.func
};

export default AddSeasonModal;
