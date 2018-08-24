import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storageRef, databaseRef } from '../utils/base';
import PaletteBuildFooter from './PaletteBuildFooter';
import BackButton from './BackButton';
import Canvas from './Canvas';
import DropZoneContent from './DropZoneContent';
import { resetBuild } from '../actions';

class PaletteBuild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null,
      dropZoneHover: false,
      showPreloader: false,
      submitAlert: false,
      imageAlert: false
    };

    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.addCardToLibrary = this.addCardToLibrary.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.submitAlertTimer);
    clearTimeout(this.imageAlertTimer);
    this.props.resetBuild();
  }

  handleDragOver(e) {
    e.preventDefault();
    this.setState({ dropZoneHover: true });
  }

  handleDragLeave(e) {
    e.preventDefault();
    this.setState({ dropZoneHover: false });
  }

  handleImageDrop(e) {
    e.preventDefault();
    // change scope based on image 'dropped' or 'selected'
    const imageFile = e.dataTransfer
      ? e.dataTransfer.files[0]
      : e.target.files[0];
    // 3 megabyte limit
    const sizeLimit = 1024 * 3;
    const fileSize = imageFile.size / 1024;
    const validTypes = [
      'image/jpeg',
      'image/gif',
      'image/png',
      'image/svg+xml'
    ];

    // check for valid image
    if (!validTypes.includes(imageFile.type)) {
      this.setState({
        imageAlert: 'Not a Valid File Type!',
        dropZoneHover: false
      });

      this.resetImageLoadAlert();
      return;
    }

    if (fileSize > sizeLimit) {
      this.setState({
        imageAlert: 'Image Must be Smaller Than 3 MB!',
        dropZoneHover: false
      });

      this.resetImageLoadAlert();
      return;
    }

    this.setState({ imageSource: imageFile });
  }

  // database.ref().child('users')
  addCardToLibrary(object) {
    const { uid } = this.props;
    databaseRef.child(uid).update({
      [object.id]: object
    });
  }

  savePalette() {
    const { uid, card } = this.props;
    const { imageSource } = this.state;

    // activate alert for empty values
    if (!Object.keys(card.palette).length || !card.title.length) {
      this.activateSubmitAlert();
      return;
    }

    const upload = storageRef
      .child(uid)
      .child(card.id)
      .put(imageSource);

    upload.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
      this.addCardToLibrary({ ...card, url });
      this.props.history.push('/');
    });

    this.setState({
      imageSource: false,
      showPreloader: true
    });
  }

  activateSubmitAlert() {
    const { card: { palette } } = this.props;
    let { submitAlert } = this.state;

    if (!Object.keys(palette).length) {
      submitAlert = 'Palette Is Empty!';
    } else {
      submitAlert = 'Title Required!';
    }

    this.setState({ submitAlert });
    this.resetSubmitAlert();
  }

  resetSubmitAlert() {
    this.submitAlertTimer = setTimeout(() => {
      this.setState({ submitAlert: false });
    }, 1500);
  }

  resetImageLoadAlert() {
    this.imageAlertTimer = setTimeout(() => {
      this.setState({ imageAlert: false });
    }, 1500);
  }

  render() {
    const {
      imageSource,
      dropZoneHover,
      showPreloader,
      submitAlert,
      imageAlert
    } = this.state;

    const preloader = (
      <div className="preloader-wrapper">
        <span className="preloader">Loading</span>
      </div>
    );

    return (
      <div className="palette-build">
        <Link to="/">
          <BackButton />
        </Link>
        {!imageSource ? (
          <div
            className={`drop-zone ${dropZoneHover ? 'dragover' : ''}`}
            onDragOver={this.handleDragOver}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleImageDrop}
          >
            {!showPreloader && (
              <DropZoneContent
                imageAlert={imageAlert}
                handleImageDrop={this.handleImageDrop}
              />
            )}
          </div>
        ) : (
          <div className="canvas-container">
            <Canvas
              makePalette={this.makePalette}
              imageSource={imageSource}
            />
            <PaletteBuildFooter
              savePalette={this.savePalette}
              submitAlert={submitAlert}
            />
          </div>
        )}
        {showPreloader && preloader}
      </div>
    );
  }
}

PaletteBuild.defaultProps = {
  uid: null
};

PaletteBuild.propTypes = {
  uid: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

const mapStateToProps = state => ({
  uid: state.user.currentUser.uid,
  card: state.build.card
});

export default connect(mapStateToProps, { resetBuild })(PaletteBuild);
