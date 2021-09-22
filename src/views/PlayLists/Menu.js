import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as BsIcon from 'react-icons/bs';
import * as IoIcon from 'react-icons/io';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';
import './Menu.css';
import AddListModal from '../../components/AddListModal/AddListModal';

function Menu(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddList, setShowAddList] = useState(false);

  return (
    <>
      <FloatingMenu
        slideSpeed={500}
        direction="up"
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
          label='CrearLista'
          onClick={() => setShowAddList(true)}
          size={40}
        />
      </FloatingMenu>

      <AddListModal
        show={showAddList}
        onCreateList={props.onCreateList}
        onHide={() => setShowAddList(!showAddList)}
      />
    </>
  )
}

Menu.propTypes = {
  onCreateList: PropTypes.func
};

export default Menu
