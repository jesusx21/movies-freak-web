import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import './PlaylistCard.css'


function PlaylistMenu() {
  return (
    <NavDropdown id='list-menu' title='Opciones' menuVariant='dark' className='menu-header'>
      <NavDropdown.Item href='#/add'>Agregar filme</NavDropdown.Item>
      <NavDropdown.Item href='#/add-from-list'>Agregar filme desde lista</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href='#/films'>Ver Filmes</NavDropdown.Item>
      <NavDropdown.Item href='#/random-films'>Ver filmes aleatorios</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href='#'>Marcar todos los filmes como vistos</NavDropdown.Item>
      <NavDropdown.Item href='#'>Marcar todos los filmes como no vistos</NavDropdown.Item>
    </NavDropdown>
  )
}

export default PlaylistMenu
