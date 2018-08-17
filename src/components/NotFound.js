import React from 'react';
import PropTypes from 'prop-types';

export default function NotFound({ history }) {
  return (
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
}

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};
