import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import firebase from 'firebase';
import Icon from '../utils/Icon';
import ClickOutside from '../utils/ClickOutside';
import { closeNewUserDialog } from '../actions';

class Header extends React.Component {
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

  /* eslint-disable class-methods-use-this */
  handleSignOutClick() {
    firebase
      .auth()
      .signOut()
      .then(() => {
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

    this.props.history.push('/palettebuild');
  }

  closeDialog() {
    this.setState({
      profileOpen: false
    });
  }

  render() {
    const { profileOpen } = this.state;
    const { userPhoto, userName, library, animateHeader } = this.props;

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

    const headerLogo = (
      <div className="header-logo">
        <h2>Colorly</h2>
        <span>
          <Icon icon="logo" />
        </span>
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
              {userPhoto && <img src={userPhoto} alt="avatar" />}
            </div>
            <button onClick={this.handleDialogToggleClick}>
              {userName}
            </button>
            <button onClick={this.handleDialogToggleClick}>
              <Icon icon="down" />
            </button>
            <ClickOutside
              elementIsOpen={profileOpen}
              onRequestClose={this.closeDialog}
            >
              {profileDialog}
            </ClickOutside>
          </div>
          <button className="add" onClick={this.handleAddPaletteClick}>
            ADD PALETTE
          </button>
        </div>
        <CSSTransitionGroup
          transitionName="header-logo"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {!animateHeader && headerLogo}
        </CSSTransitionGroup>
      </header>
    );
  }
}

Header.defaultProps = {
  userName: '',
  userPhoto: null
};

Header.propTypes = {
  isNewUser: PropTypes.bool.isRequired,
  closeNewUserDialog: PropTypes.func.isRequired,
  userPhoto: PropTypes.string,
  userName: PropTypes.string,
  library: PropTypes.arrayOf(PropTypes.object).isRequired,
  animateHeader: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

const mapStateToProps = state => ({
  library: state.data.library,
  userPhoto: state.user.currentUser.photoURL,
  userName: state.user.currentUser.displayName,
  isNewUser: state.user.isNewUser
});

export default connect(mapStateToProps, { closeNewUserDialog })(Header);
