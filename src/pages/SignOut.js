import React from 'react';
import {Navigate} from 'react-router-dom';

import Session from '../models/Session';
import User from '../models/User';

function SignOut() {
  const session = Session.get();
  const user = User.get();

  session.remove();
  user.remove();

  return (
    <>
      <Navigate to='/' />
    </>
  );
}

export default SignOut;
