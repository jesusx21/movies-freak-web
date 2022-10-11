import React, { createRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { Button, Col, Form, Card, Row } from 'react-bootstrap';

import * as api from './api';
import './SignUp.css';
import { notifyError, notifySuccess } from '../../toast';
import User from '../../models/User';
import Session from '../../models/Session';

const USERNAME_ALREADY_REGISTERED = 'USERNAME_ALREADY_REGISTERED';

function SignUp() {
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showToolTip, setShowToolTip] = useState(false);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const nameRef = createRef();
  const lastNameRef = createRef();
  const emailRef = createRef();
  const usernameRef = createRef();
  const birthdateRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const termsAndConditionsRef = createRef();

  const navigate = useNavigate();

  const passwordRegex = /^(?=.*\d{1})(?=.*[a-z]{1})(?=.*[A-Z]{1})[a-zA-Z0-9]{6,24}$/g;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const onSuccessClick = async () => {
    try {
      await createUser();

      nameRef.current.value = '';
      lastNameRef.current.value = '';
      emailRef.current.value = '';
      usernameRef.current.value = '';
      birthdateRef.current.value = '';
      passwordRef.current.value = '';
      passwordConfirmationRef.current.value = '';
      termsAndConditionsRef.current.checked = false;

      navigate('/');
    } catch(error) {
      const { data } = error.response;

      if (data.code === 'USERNAME_ALREADY_REGISTERED') {
        notifyError('Username already in used');
      } else if (data.code === 'EMAIL_ALREADY_REGISTERED') {
        notifyError('Email already in used');
      } else {
        notifyError();
      }
    }
  };

  const createUser = async () => {
    const payload = {
      name,
      lastName,
      email,
      username,
      birthdate,
      password
    };

    const result = await api.signUp(payload);
    notifySuccess('You have signed up succesfully!');

    const user = new User(result.user);
    const session = new Session({ ...result, user });

    user.save();
    session.save();
  };

  const enableSignUpButton = () => {
    return name &&
      lastName &&
      email &&
      username &&
      birthdate &&
      password &&
      passwordConfirmation &&
      isEmailValid &&
      isPasswordValid &&
      password === passwordConfirmation &&
      termsAndConditions;
  };

  const onChangePassword = (input) => {
    const passwordValue = input.target.value;
    
    setPassword(passwordValue);
    setIsPasswordValid(!!passwordRegex.exec(passwordValue))
  }

  const onChangeEmail = (input) => {
    const emailValue = input.target.value;
    
    setEmail(emailValue);
    setIsEmailValid(!!emailRegex.exec(emailValue))
  }

  const emailClassNames = classnames({
    'invalid': !isEmailValid
  });

  const passwordClassNames = classnames({
    'invalid': !isPasswordValid
  });

  const passwordConfirmationClassNames = classnames({
    'invalid': passwordConfirmation !== password
  });

  return (
    <div className='sign-up-card'>
      <Card border='secondary' id='sign-up-card'>
        <Card.Header>Sign up to Movies Freak</Card.Header>
        <Card.Body>
          <Card.Title>Please enter your info</Card.Title>
          <Form>
            <Row>
              <Form.Group as={Col} controlId='name'>
                <Form.Label>Name(s)</Form.Label>
                <Form.Control
                  ref={nameRef}
                  type='text'
                  onChange={(input) => setName(input.target.value)}
                  placeholder='Please enter here your first and middle name'
                />
              </Form.Group>
              <Form.Group as={Col} controlId='last-name'>
                <Form.Label>Last Name(s)</Form.Label>
                <Form.Control
                  ref={lastNameRef}
                  type='text'
                  onChange={(input) => setLastName(input.target.value)}
                  placeholder='Please enter here your last name(s)'
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  ref={emailRef}
                  className={emailClassNames}
                  type='email'
                  onChange={onChangeEmail}
                  placeholder='jon.doe@gmail.com'
                />
              </Form.Group>
              <Form.Group as={Col} controlId='username'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  ref={usernameRef}
                  type='text'
                  onChange={(input) => setUsername(input.target.value)}
                  placeholder='jon.doe'
                />
              </Form.Group>
              <Form.Group as={Col} controlId='birthdate'>
                <Form.Label>Birthdate</Form.Label>
                <Form.Control
                  ref={birthdateRef}
                  type='date'
                  onChange={(input) => setBirthdate(input.target.value)}
                  placeholder='Bithdate'
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  ref={passwordRef}
                  type='password'
                  onChange={onChangePassword}
                  className={passwordClassNames}
                  onClick={() => setShowToolTip(!showToolTip)}
                  placeholder='Password'
                />
                <span className='password-validation'>
                      Your password must be 6-24 characters long, contain at least
                      one letter upper case and one letter lower case and numbers,
                      and must not contain spaces, special characters, or emoji.
                </span>
                <Form.Text id="passwordHelpBlock" muted>
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId='password-confirmation'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  ref={passwordConfirmationRef}
                  className={passwordConfirmationClassNames}
                  type='password'
                  onChange={(input) => setPasswordConfirmation(input.target.value)}
                  placeholder='Password Confirmation'
                />
              </Form.Group>
            </Row>
            <Form.Group className='mb-3' id='checkbox'>
              <Form.Check
                ref={termsAndConditionsRef}
                type='checkbox'
                onClick={(input) => setTermsAndConditions(input.target.checked)}
                label='Accept terms and conditions'
              />
            </Form.Group>
            <div className='sign-up-buttons'>
              <Button variant='success' disabled={!enableSignUpButton()} onClick={onSuccessClick}>Sign Up</Button>
              <Button variant='outline-secondary' href='/'>Cancelar</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SignUp;
