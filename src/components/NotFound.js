import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ history }) => (
  <div className="not-found">
    <h1>404</h1>
    <h2>Sorry, Page Not Found!</h2>
    <button
      className="home-btn"
      onClick={() => {
        history.push('/');
      }}
    >
      HOMEPAGE
    </button>
  </div>
);

NotFound.propTypes = {
  history: PropTypes.object // eslint-disable-line
};

export default NotFound;
