import React from 'react';

import { WithoutSessionCard } from '../components';
import Session from '../models/Session';
import User from '../models/User';

function Home() {
  const session = Session.get();
  const user = User.get();

  return (
    <>
      <WithoutSessionCard show={!session}/>
      <h1 hidden={!session}>Bienvenido {user?.name}!</h1>
    </>
  );
}

export default Home;
