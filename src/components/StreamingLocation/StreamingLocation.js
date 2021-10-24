import React from 'react';
import PropTypes from 'prop-types';

function StreamingLocation(props) {
  const { name, icon, url} = props;

  return (
    <a href={url}>
      <img src={icon} />
    </a>
  )
}

Location.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  url: PropTypes.string
};

export default StreamingLocation
