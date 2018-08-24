import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';
import { googleAuth, twitterAuth } from '../utils/base';

import { connect } from 'react-redux';
import { signIn } from '../actions';

function Home({ signIn }) {
  return (
    <div className="home">
      <div className="hero-text-container">
        <div className="content">
          <h1>Colorly</h1>
          <span className="logo">
            <Icon icon="logo" />
          </span>
          <h3 className="pitch">
            A simple color extraction tool. Save custom palettes to your
            collection along with the source image for future reference!
          </h3>
          <div className="buttons">
            <button
              className="twitter-login"
              onClick={() => signIn(twitterAuth)}
            >
              Connect with Twitter
            </button>
            <button
              className="google-login"
              onClick={() => signIn(googleAuth)}
            >
              Connect with Google
            </button>
          </div>
        </div>
      </div>
      <div className="hero-image" />
    </div>
  );
}

Home.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default connect(null, { signIn })(Home);
