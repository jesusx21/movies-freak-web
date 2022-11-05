import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as AiIcons from 'react-icons/ai';
import { Button, Form } from 'react-bootstrap';

import './PasswordButton.css';

function PasswordButton(props) {
  const [showPasword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const onChangePassword = (input) => {
    setPassword(input.target.value);
    props.onChange(input);
  }

  return (
    <>
      <div className='password'>
        <Form.Control
          type='password'
          onChange={onChangePassword}
          className={props.className}
          onClick={props.onClick}
          placeholder='Password'
        />
        <Button
          variant='outline-secondary'
          onClick={() => setShowPassword(!showPasword)}
        >
          <AiIcons.AiOutlineEye hidden={showPasword} />
          <AiIcons.AiOutlineEyeInvisible hidden={!showPasword} />
        </Button>
      </div>
      <p hidden={showPasword} className='password-value'>({password})</p>
    </>
  )
}

PasswordButton.defaultProps = {
  className: '',
  onChange: (input) => console.log('It Changed with:', input.target.value),
  onClick: () => console.log('Clicked')
};

PasswordButton.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  onClick: PropTypes.func
};



export default PasswordButton;
