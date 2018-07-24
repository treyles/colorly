/* eslint-disable */
import React from 'react';
import Icon from '../utils/Icon';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import ClickOutside from '../utils/ClickOutside';
// import Icon from '../utils/Icon';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileOpen: false
    };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleDialogToggle = this.handleDialogToggle.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleDialogToggle() {
    this.setState({
      profileOpen: !this.state.profileOpen
    });
  }

  handleDialogClose() {
    this.setState({
      profileOpen: false
    });
  }

  handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('signed out');
        localStorage.setItem('authenticated', false);
      });
  }

  render() {
    const { profileOpen } = this.state;
    const { currentUser, library } = this.props;

    const profileDialog = (
      <div className="profile-dialog">
        <div className="palette-count">
          <span className="count">{library.length}</span>
          {library.length !== 1 ? 'PALETTES' : 'PALETTE'}
        </div>
        <button className="sign-out" onClick={this.handleSignOut}>
          SIGN OUT
        </button>
      </div>
    );

    return (
      <header>
        <div className="header-top">
          <div className="profile">
            <div className="profile-image">
              {currentUser.photoURL && <img src={currentUser.photoURL} />}
            </div>
            <span onClick={this.handleDialogToggle}>
              {currentUser.displayName}
            </span>
            <span onClick={this.handleDialogToggle}>
              <Icon icon="down" />
            </span>
            <ClickOutside
              elementIsOpen={profileOpen}
              onRequestClose={this.handleDialogClose}
            >
              {profileDialog}
            </ClickOutside>
          </div>
          <Link to="/upload">
            <button className="add">
              {/* <span>
                <Icon icon="add" />
              </span> */}
              ADD PALETTE
            </button>
          </Link>
        </div>
        <div className="header-logo">
          <h2>Colorly</h2>
          <span>
            <Icon icon="logo" />
          </span>
        </div>
      </header>
    );
  }
}
