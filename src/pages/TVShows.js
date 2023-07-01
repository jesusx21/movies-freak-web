import React from 'react';

import Session from '../models/Session';
import { TVShows as TVShowCards } from '../views';

function TVShows() {
  const session = Session.get();

  return (
    <TVShowCards session={session}/>
  )
}

export default TVShows;
