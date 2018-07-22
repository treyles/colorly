// /* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid';
import { storage } from '../utils/base';
import PaletteBuildFooter from './PaletteBuildFooter';
import Canvas from './Canvas';
import Icon from '../utils/Icon';
import rgbToHex from '../utils/rgbToHex';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      imageSource: null,
      dropZoneHover: false,
      showPreloader: false,
      id: uuidv4(),
      palette: [],
      checked: 'color1',
      title: ''
    };

    // TODO: organize/clean this up
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.makePalette = this.makePalette.bind(this);
    this.handlePaletteSelect = this.handlePaletteSelect.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  handleDrop(e) {
    e.preventDefault();

    this.setState({
      imageSource: e.dataTransfer.files[0],
      imageLoaded: true
    });
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

  makePalette(color) {
    const { palette, checked } = this.state;
    const newColor = { [checked]: rgbToHex(color) };

    this.setState({
      palette: { ...palette, ...newColor }
    });
  }

  savePalette() {
    const { palette, title, id } = this.state;
    const file = this.state.imageSource;
    const storageRef = storage.ref(`images/${id}`);
    const upload = storageRef.put(file);

    this.setState({
      imageLoaded: false,
      showPreloader: true
    });

    upload.then(() => {
      storageRef.getDownloadURL().then(url => {
        this.props.addPaletteToLibrary({ url, palette, title, id });
        // navigate to homepage
        this.props.history.push('/');
      });
    });
  }

  render() {
    const {
      imageLoaded,
      imageSource,
      dropZoneHover,
      showPreloader,
      palette,
      checked,
      title
    } = this.state;

    const placeholder = (
      <div className="placeholder">
        <h1>Drag and Drop Image Here</h1>
        <h3>JPG, SVG, or PNG no larger than 900kb</h3>
      </div>
    );

    const preloader = (
      <div className="preloader-wrapper">
        <span className="preloader">Loading</span>
      </div>
    );

    return (
      <div className="upload-section">
        <Link to="/">
          <button className="back">
            <Icon icon="back" />
            <span>BACK TO PALETTES</span>
          </button>
        </Link>
        {!imageLoaded ? (
          <div
            className={`drop-zone ${dropZoneHover ? 'dragover' : ''}`}
            onDragOver={this.handleDragOver}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleDrop}
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
            />
          </div>
        )}
        {showPreloader && preloader}
      </div>
    );
  }
}
