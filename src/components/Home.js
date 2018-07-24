import React from 'react';
import { auth, googleAuth } from '../utils/base';
// import { Link } from 'react-router-dom';
// import base from '../utils/base';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    auth.signInWithPopup(googleAuth);
  }

  render() {
    return <button onClick={this.handleClick}>Sign In</button>;
  }
}
