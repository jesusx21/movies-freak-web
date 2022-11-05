import React from 'react';
import {Navigate} from 'react-router-dom';

import Session from '../models/Session';
import User from '../models/User';

function SignOut() {
  Session.remove();
  User.remove();

  return (
    <>
      <Navigate to='/' />
    </>
  );
}

export default SignOut;
