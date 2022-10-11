import React from 'react';
import { Button, Card } from 'react-bootstrap';

import './WithoutSessionCard.css';

function WithoutSessionCard(props) {
  return (
    <div hidden={!props.show} className='no-session-card'>
      <Card className='text-center'>
        <Card.Header>Recuerda que para ver tus listas, debes tener una cuenta.</Card.Header>
        <Card.Body>
          <Card.Title>Aun no has iniciado sessión.</Card.Title>
          <Card.Text>
            Inicia sesión o crea una cuenta nueva.
          </Card.Text>
          <Button variant='outline-primary' href='/sign-in'>Inicia Sesión</Button>
          <Button variant='outline-primary' href='/sign-up'>Crea una Cuenta Nueva</Button>
        </Card.Body>
        <Card.Footer className="text-muted">Movies Freak</Card.Footer>
      </Card>
    </div>
  )
}

export default WithoutSessionCard;
