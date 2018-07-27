// signs out after refresh on drop zone page
// too long? break up into components?
// rename alerts

/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid';
import { storage } from '../utils/base';
import PaletteBuildFooter from './PaletteBuildFooter';
import BackButton from './BackButton';
import Canvas from './Canvas';
import rgbToHex from '../utils/rgbToHex';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null,
      dropZoneHover: false,
      showPreloader: false,
      // refactor as one object? when adding can pass one value
      id: uuidv4(),
      palette: [],
      checked: 'color1',
      title: '',
      submitAlert: null,
      imageAlert: null
    };

    // TODO: organize/clean this up
    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.makePalette = this.makePalette.bind(this);
    this.handlePaletteSelect = this.handlePaletteSelect.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.submitAlertTimer);
    clearTimeout(this.imageAlertTimer);
  }

  handleDragOver(e) {
    e.preventDefault();

    this.setState({
      dropZoneHover: true
    });
  }

  handleDragLeave(e) {
    e.preventDefault();

    this.setState({
      dropZoneHover: false
    });
  }

  // TODO: not 'handle'?, makePalette, handleTitle does same thing?
  handlePaletteSelect(e) {
    this.setState({
      checked: e.target.id
    });
  }

  // TODO: figure out these method names, in child component too.
  handleTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  clearPalette() {
    this.setState({
      palette: {},
      checked: 'color1'
    });
  }

  handleImageLoad(e) {
    e.preventDefault();

    // change scope based on image 'dropped' or 'selected'
    const imageFile = e.dataTransfer
      ? e.dataTransfer.files[0]
      : e.target.files[0];

    // 1 megabyte limit
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
    const newColor = { [checked]: rgbToHex(color) };

    this.setState({
      palette: { ...palette, ...newColor }
    });
  }

  savePalette() {
    const { palette, title, id, imageSource } = this.state;
    const { currentUser } = this.props;

    // check for empty values
    if (!Object.keys(palette).length || !title.length) {
      this.activateAlert();
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

  activateAlert() {
    const { palette } = this.state;

    let alert;
    if (!Object.keys(palette).length) {
      alert = 'Palette Is Empty!';
    } else {
      alert = 'Title Required!';
    }

    this.setState({
      submitAlert: alert
    });

    this.resetSubmitAlert();
  }

  resetSubmitAlert() {
    this.submitAlertTimer = setTimeout(() => {
      this.setState({
        submitAlert: null
      });
    }, 1500);
  }

  resetImageLoadAlert() {
    this.imageAlertTimer = setTimeout(() => {
      this.setState({
        imageAlert: null
      });
    }, 1500);
  }

  render() {
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

    const placeholder = (
      <div className="placeholder">
        <label htmlFor="file-browse" className={imageAlert && 'alert'}>
          {imageAlert ? (
            <h1>{imageAlert}</h1>
          ) : (
            <div>
              <h1>Drag and Drop Image Here</h1>
              <h3>JPG, GIF, PNG or SVG no larger than 3 MB</h3>
            </div>
          )}
        </label>
        <input
          id="file-browse"
          type="file"
          accept="image/*"
          onChange={this.handleImageLoad}
        />
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
            onDrop={this.handleImageLoad}
          >
            {!showPreloader && placeholder}
          </div>
        ) : (
          <div className="canvas-container">
            <Canvas
              makePalette={this.makePalette}
              imageSource={imageSource}
            />
            <PaletteBuildFooter
              palette={palette}
              handlePaletteSelect={this.handlePaletteSelect}
              checked={checked}
              handleTitle={this.handleTitle}
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
