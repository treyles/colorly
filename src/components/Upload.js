// group palette card data into one object in state
// signs out after refresh on drop zone page??

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid';
import { storage } from '../utils/base';
import PaletteBuildFooter from './PaletteBuildFooter';
import BackButton from './BackButton';
import Canvas from './Canvas';
import DropZoneContent from './DropZoneContent';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null,
      dropZoneHover: false,
      showPreloader: false,
      // TODO: refactor as one object? when adding can pass one value
      id: uuidv4(),
      palette: [],
      checked: 'color1',
      title: '',
      submitAlert: null,
      imageAlert: null
    };

    this.setCheckedColor = this.setCheckedColor.bind(this);
    this.setPaletteTitle = this.setPaletteTitle.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.makePalette = this.makePalette.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.submitAlertTimer);
    clearTimeout(this.imageAlertTimer);
  }

  setCheckedColor(e) {
    this.setState({ checked: e.target.id });
  }

  setPaletteTitle(e) {
    this.setState({ title: e.target.value });
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

  makePalette(color) {
    const { palette, checked } = this.state;
    const newColor = { [checked]: color };

    this.setState({
      palette: { ...palette, ...newColor }
    });
  }

  clearPalette() {
    this.setState({
      palette: {},
      checked: 'color1'
    });
  }

  savePalette() {
    const { palette, title, id, imageSource } = this.state;
    const { currentUser } = this.props;

    // check for empty values
    if (!Object.keys(palette).length || !title.length) {
      this.activateSubmitAlert();
      return;
    }

    const storageRef = storage.ref(`users/${currentUser.uid}/${id}`);
    const upload = storageRef.put(imageSource);

    upload
      .then(() => {
        storageRef.getDownloadURL().then(url => {
          this.props.addCardToLibrary({ url, palette, id, title });
          // navigate to homepage
          this.props.history.push('/');
        });
      })
      .catch(err => {
        alert(err.code);
        // navigate to homepage
        this.props.history.push('/');
      });

    this.setState({
      imageSource: false,
      showPreloader: true
    });
  }

  activateSubmitAlert() {
    const { palette } = this.state;

    let alert;
    if (!Object.keys(palette).length) {
      alert = 'Palette Is Empty!';
    } else {
      alert = 'Title Required!';
    }

    this.setState({ submitAlert: alert });
    this.resetSubmitAlert();
  }

  resetSubmitAlert() {
    this.submitAlertTimer = setTimeout(() => {
      this.setState({ submitAlert: null });
    }, 1500);
  }

  resetImageLoadAlert() {
    this.imageAlertTimer = setTimeout(() => {
      this.setState({ imageAlert: null });
    }, 1500);
  }

  render() {
    // TODO: destructure palette object
    const {
      imageSource,
      dropZoneHover,
      showPreloader,
      palette,
      checked,
      title,
      submitAlert,
      imageAlert
    } = this.state;

    const preloader = (
      <div className="preloader-wrapper">
        <span className="preloader">Loading</span>
      </div>
    );

    return (
      <div className="upload-section">
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
              palette={palette}
              setCheckedColor={this.setCheckedColor}
              checked={checked}
              setPaletteTitle={this.setPaletteTitle}
              title={title}
              savePalette={this.savePalette}
              clearPalette={this.clearPalette}
              library={this.props.library}
              submitAlert={submitAlert}
            />
          </div>
        )}
        {showPreloader && preloader}
      </div>
    );
  }
}

Upload.propTypes = {
  library: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentUser: PropTypes.shape({ uid: PropTypes.string }).isRequired,
  addCardToLibrary: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired // eslint-disable-line
};
