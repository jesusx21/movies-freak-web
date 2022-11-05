import React, { createRef, useState } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PasswordButton from '../../components/PasswordButton/PasswordButton';
import Session from '../../models/Session';
import User from '../../models/User';
import { notifyError, notifySuccess } from '../../toast';

import * as api from './api';
import './SignIn.css';

function SignIn() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const usernameRef = createRef();
  const passwordRef = createRef();

  const navigate = useNavigate();

  const onSignInClick = async () => {
    try {
      const result = await api.signIn({ username, password });
      notifySuccess('You have signed in succesfully!');

      const user = new User(result.user);
      const session = new Session(result);

      user.save();
      session.save();

      usernameRef.current.value = '';
      passwordRef.current.value = '';

      navigate('/');
    } catch(error) {
      console.log(error)
      const { data } = error.response;

      if (data.code === 'USER_NOT_FOUND') {
        notifyError('User was not found');
      } else if (data.code === 'PASSWORD_DOES_NOT_MATCH') {
        notifyError('Password is incorrect');
      } else {
        notifyError();
      }
    }
  };

  const enableSignInButton = () => {
    return username && password;
  };

  return (
    <div className='sign-in-card'>
      <Card border='secondary'>
        <Card.Header>Sign in to Movies Freak</Card.Header>
        <Card.Body>
          <Card.Title>Please enter your session info</Card.Title>
          <Form>
            <Form.Group as={Col} controlId='username'>
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                ref={usernameRef}
                onChange={(input) => setUsername(input.target.value)}
                type='text'
                placeholder='Please enter your username or your email'
              />
            </Form.Group>
            <Form.Group as={Col} controlId='password'>
              <Form.Label>Password</Form.Label>
              {/* <PasswordButton
                onChange={(input) => setPassword(input.target.value)}
              /> */}
              <Form.Control
                ref={passwordRef}
                onChange={(input) => setPassword(input.target.value)}
                type='password'
                placeholder='Password'
              />
            </Form.Group>
            <div className='sign-in-button'>
              <Button
                variant='success'
                onClick={onSignInClick}
                disabled={!enableSignInButton()}
              >
                Sign In
              </Button>
            </div>
            <div className='create-account-legend'>
              <span>You don't have an account yet?</span>
              <br />
              <Link to='/sign-up'>click here</Link>
              <span> to create one</span>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignIn;
