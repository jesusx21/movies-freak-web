import React from 'react';

import { WithoutSessionCard } from '../components';
import { WatchLists as WatchListsCards } from '../views';
import Session from '../models/Session';

function WatchLists() {
  const session = Session.get();

  return (
    <>
      <WithoutSessionCard show={!session}/>
      <div hidden={!session}><WatchListsCards /></div>
    </>
  );
}

export default WatchLists;
