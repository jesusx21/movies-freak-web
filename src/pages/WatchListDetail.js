import React from 'react';

import { WithoutSessionCard } from '../components';
import Session from '../models/Session';
import { WatchList } from '../views';

function WatchListDetail() {
  const session = Session.get();

  return (
    <>
      <WithoutSessionCard show={!session}/>
      <div hidden={!session}><WatchList show={!!session} session={session}/></div>
    </>
  )
}

export default WatchListDetail;
