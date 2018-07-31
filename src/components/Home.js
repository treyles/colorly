import React from 'react';
import { googleAuth } from '../utils/base';
// import { Link } from 'react-router-dom';
// import base from '../utils/base';

/* eslint-disable */
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    // this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <button onClick={() => this.props.signInUser(googleAuth)}>
        Sign In
      </button>
    );
  }
}

// .then(result => console.log(result.additionalUserInfo.isNewUser));
