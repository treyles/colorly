import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';

const BackButton = ({ onClick }) => (
  <button className="back" onClick={onClick}>
    <Icon icon="back" />
    <span>BACK TO PALETTES</span>
  </button>
);

BackButton.defaultProps = {
  onClick: () => {}
};

BackButton.propTypes = {
  onClick: PropTypes.func
};

export default BackButton;
