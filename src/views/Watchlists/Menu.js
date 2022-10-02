import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as BsIcon from 'react-icons/bs';
import * as IoIcon from 'react-icons/io';
import { ChildButton, FloatingMenu, MainButton } from 'react-floating-button-menu';

import AddWatchlistModal from '../../components/AddWatchlistModal/AddWatchlistModal';
import './Watchlists.css';

function Menu(props) {
  const[isOpen, setIsOpen] = useState(false);
  const [showAddWatchlist, setShowAddWatchlist] = useState(false);

  return (
    <>
      <FloatingMenu
        slideSpeed={500}
        direction='up'
        spacing={8}
        isOpen={isOpen}
        className='floating-menu'
      >
        <MainButton
          iconResting={<BsIcon.BsPlusCircleFill />}
          iconActive={<BsIcon.BsXCircleFill />}
          onClick={() => setIsOpen(!isOpen)}
          size={56}
        />
        <ChildButton
          icon={<IoIcon.IoMdCreate />}
          label='Crear Lista'
          onClick={() => setShowAddWatchlist(true)}
          size={40}
        />
      </FloatingMenu>

      <AddWatchlistModal
        show={showAddWatchlist}
        onCreateWatchlist={props.onCreateWatchlist}
        onHide={() => setShowAddWatchlist(!showAddWatchlist)}
      />
    </>
  )
}

Menu.propTypes = {
  onCreateWatchlist: PropTypes.func
};

export default Menu
