import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function NotFound({ history }) {
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
  history: PropTypes.object.isRequired // eslint-disable-line
};

export default withRouter(NotFound);
