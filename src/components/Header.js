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

    this.handleSignOutClick = this.handleSignOutClick.bind(this);
    this.handleDialogToggleClick = this.handleDialogToggleClick.bind(this);
    this.handleAddPaletteClick = this.handleAddPaletteClick.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  handleSignOutClick() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('signed out');
        localStorage.setItem('authenticated', false);
      });
  }

  handleDialogToggleClick() {
    this.setState({
      profileOpen: !this.state.profileOpen
    });
  }

  handleAddPaletteClick() {
    if (this.props.isNewUser) {
      this.props.closeNewUserDialog();
    }

    this.props.history.push('/upload');
  }

  closeDialog() {
    this.setState({
      profileOpen: false
    });
  }

  render() {
    const { profileOpen } = this.state;
    const { currentUser, library, animateHeader } = this.props;

    const profileDialog = (
      <div className="profile-dialog">
        <div className="palette-count">
          <span className="count">{library.length}</span>
          {library.length !== 1 ? 'PALETTES' : 'PALETTE'}
        </div>
        <button className="sign-out" onClick={this.handleSignOutClick}>
          SIGN OUT
        </button>
      </div>
    );

    return (
      <header>
        <div
          className="header-top"
          style={{ backgroundColor: `${animateHeader ? '#fff' : ''}` }}
        >
          <div className="profile">
            <div className="profile-image">
              {currentUser.photoURL && <img src={currentUser.photoURL} />}
            </div>
            <span onClick={this.handleDialogToggleClick}>
              {currentUser.displayName}
            </span>
            <span onClick={this.handleDialogToggleClick}>
              <Icon icon="down" />
            </span>
            <ClickOutside
              elementIsOpen={profileOpen}
              onRequestClose={this.closeDialog}
            >
              {profileDialog}
            </ClickOutside>
          </div>
          {/* <Link to="/upload"> */}
          <button className="add" onClick={this.handleAddPaletteClick}>
            {/* <span>
                <Icon icon="add" />
              </span> */}
            ADD PALETTE
          </button>
          {/* </Link> */}
        </div>
        <div
          className="header-logo"
          style={{
            opacity: `${animateHeader ? 0 : ''}`,
            visibility: `${animateHeader ? 'hidden' : 'visible'}`
          }}
        >
          <h2>Colorly</h2>
          <span>
            <Icon icon="logo" />
          </span>
        </div>
      </header>
    );
  }
}

// style={{ background: `${animateHeader ? '#fff' : ''}` }}
// style={{ opacity: `${animateHeader ? 0 : ''}` }}
