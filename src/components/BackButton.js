import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';

export default function BackButton({ onClick }) {
  return (
    <button className="back" onClick={onClick}>
      <Icon icon="back" />
      <span>BACK TO PALETTES</span>
    </button>
  );
}

BackButton.defaultProps = {
  onClick: null
};

BackButton.propTypes = {
  onClick: PropTypes.func
};
