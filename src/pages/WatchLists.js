import React from 'react';

import Session from '../models/Session';
import { WithoutSessionCard } from '../components';
import { WatchLists as WatchListsCards } from '../views';

function WatchLists() {
  const session = Session.get();

  return (
    <>
      <WithoutSessionCard show={!session}/>
      <div hidden={!session}><WatchListsCards session={session}/></div>
    </>
  );
}

export default WatchLists;
