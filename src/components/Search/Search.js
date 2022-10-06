import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import * as FiIcons from 'react-icons/fi';
import './Search.css'


function Search(props) {
  const { placeholder } = props;
  const hasSearchButton = !!props.onClick;
  const hasAddButton = !!props.onPlusClick;

  const fieldSearch = createRef();

  const onChange = () => {
    props.onChange(fieldSearch.current.value);
  }

  const onClick = () => {
    props.onClick(fieldSearch.current.value);
  }

  return (
    <div className='search-form'>
      <InputGroup>
        <Form.Control
          ref={fieldSearch}
          id='search-focus'
          type='search'
          placeholder={placeholder}
          onChange={onChange}
        />
        <ButtonGroup>
          {
            hasSearchButton && (
              <Button variant='secondary' onClick={onClick}>
                <FiIcons.FiSearch />
              </Button>
            )
          }
          {
            hasAddButton && (
              <Button variant='secondary' onClick={props.onPlusClick}>
                <FiIcons.FiPlus />
              </Button>
            )
          }
        </ButtonGroup>
      </InputGroup>
    </div>
  );
}

Search.defaultProps = {
  placeholder: 'Search',
  onChange: (value) => console.log('It Changed with:', value),
};

Search.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onPlusClick: PropTypes.func
};

export default Search;
