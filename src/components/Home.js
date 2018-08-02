import React from 'react';
import Icon from '../utils/Icon';
import { googleAuth } from '../utils/base';

/* eslint-disable */
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    // this.handleClick = this.handleClick.bind(this);
  }

  render() {
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
              <button className="twitter-login">
                Connect with Twitter
              </button>
              <button
                className="google-login"
                onClick={() => this.props.signInUser(googleAuth)}
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
}

// .then(result => console.log(result.additionalUserInfo.isNewUser));

{
  /* <button onClick={() => this.props.signInUser(googleAuth)}>
        Sign In
      </button> */
}
