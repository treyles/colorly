import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';
import { googleAuth } from '../utils/base';

export default function Home({ signInUser }) {
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
            <button className="twitter-login">Connect with Twitter</button>
            <button
              className="google-login"
              onClick={() => signInUser(googleAuth)}
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
  signInUser: PropTypes.func.isRequired
};
