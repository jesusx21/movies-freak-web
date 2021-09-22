import React, { useState } from 'react';
import * as BsIcon from 'react-icons/bs';
import * as IoIcon from 'react-icons/io';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';
import './Menu.css';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
        backgroundColor='black'
        onClick={() => setIsOpen(!isOpen)}
        size={56}
      />
      <ChildButton
        icon={<IoIcon.IoMdCreate />}
        backgroundColor='white'
        label='CrearLista'
        size={40}
      />
    </FloatingMenu>
  )
}

export default Menu
