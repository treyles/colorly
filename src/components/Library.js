import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { demoRef, databaseRef } from '../utils/base';
import Header from './Header';
import Icon from '../utils/Icon';
import PaletteCard from './PaletteCard';
import BackButton from './BackButton';
import LazyImage from '../utils/LazyImage';
import { closeNewUserDialog, fetchLibrary } from '../actions';

export class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null,
      animateHeader: false
    };

    this.setImageSource = this.setImageSource.bind(this);
    this.handleCloseImageClick = this.handleCloseImageClick.bind(this);
    this.scrollPosition = this.scrollPosition.bind(this);
    this.addDemoPalettes = this.addDemoPalettes.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollPosition);
  }

  setImageSource(url) {
    this.setState({
      imageSource: url
    });
  }

  handleCloseImageClick() {
    this.setState({
      imageSource: null
    });
  }

  addDemoPalettes() {
    const { uid, closeNewUserDialog } = this.props;
    demoRef
      .once('value')
      .then(snapshot => snapshot.val())
      .then(palettes => {
        databaseRef.child(uid).set(palettes);
      });

    closeNewUserDialog();
  }

  scrollPosition() {
    let { animateHeader } = this.state;

    if (window.scrollY > 40) {
      animateHeader = true;
    } else {
      animateHeader = false;
    }

    this.setState({ animateHeader });
  }

  render() {
    const { imageSource, animateHeader } = this.state;
    const { library, loading, isNewUser } = this.props;

    const placeholders = [...Array(10)].map((_, index) => (
      <div key={index} className="placeholder" />
    ));

    const viewImage = (
      <div className="image-view">
        <BackButton onClick={this.handleCloseImageClick} />
        <LazyImage url={imageSource} />
      </div>
    );

    const emptyMessage = (
      <div className="empty-library">
        <h3>Empty Palette Collection!</h3>
      </div>
    );

    const newUserDialog = (
      <div className="new-user">
        <Icon icon="handWave" />
        <h3>Hey! It Looks Like You’re New</h3>
        <h4>
          To get started making color palettes, load an image by clicking
          the Add Palette button on the top right corner.
        </h4>
        <button
          className="dismiss-btn"
          onClick={() => this.props.closeNewUserDialog()}
        >
          DISMISS
        </button>
        <button
          className="lazy-btn"
          onClick={() => this.addDemoPalettes()}
        >
          FEELING LAZY?
        </button>
      </div>
    );

    return (
      <div className="library">
        <Header animateHeader={animateHeader} />
        {library.map(palette => (
          <PaletteCard
            key={palette.id}
            data={palette}
            setImageSource={this.setImageSource}
          />
        ))}
        {loading && !isNewUser && placeholders}
        {imageSource && viewImage}
        {!library.length && !loading && emptyMessage}
        {isNewUser && newUserDialog}
      </div>
    );
  }
}

Library.defaultProps = {
  uid: null
};

Library.propTypes = {
  uid: PropTypes.string,
  library: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  isNewUser: PropTypes.bool.isRequired,
  closeNewUserDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  library: state.data.library,
  loading: state.data.loading,
  isNewUser: state.user.isNewUser,
  uid: state.user.currentUser.uid
});

export default connect(mapStateToProps, {
  closeNewUserDialog,
  fetchLibrary
})(Library);
