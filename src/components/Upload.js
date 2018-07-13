// /* eslint-disable */
import React from 'react';
import { storage } from '../utils/base';
import PaletteBuildFooter from './PaletteBuildFooter';
import Canvas from './Canvas';
import guid from '../utils/guid';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      imageName: null,
      dropZoneHover: false,
      showPreloader: false,
      palette: {}
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.makePalette = this.makePalette.bind(this);
  }

  handleDrop(e) {
    e.preventDefault();

    this.setState({
      showPreloader: true
    });

    const file = e.dataTransfer.files[0];
    const name = guid();
    const storageRef = storage.ref(`images/${name}`);
    const task = storageRef.put(file);

    task.then(() => {
      this.setState({
        imageLoaded: true,
        imageName: name
      });
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

  makePalette(color) {
    const { palette } = this.state;
    const { checked } = this.child.state;

    const newColor = { [checked]: color };

    this.setState({
      palette: { ...palette, ...newColor }
    });
  }

  // makeObject(url) {
  //   const { palette } = this.state;
  //   const { inputValue } this.child.state;
  // }

  render() {
    const {
      imageLoaded,
      imageName,
      dropZoneHover,
      showPreloader,
      palette
    } = this.state;

    const placeholder = (
      <div className="placeholder">
        <h1>Drag and Drop Image</h1>
        <h3>JPG, SVG, or PNG no larger than 900kb</h3>
      </div>
    );

    const preloader = <span className="preloader">Loading&#8230;</span>;

    return (
      <div className="upload-section">
        {!imageLoaded ? (
          <div
            className={`drop-zone ${dropZoneHover ? 'dragover' : ''}`}
            onDragOver={this.handleDragOver}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleDrop}
          >
            {showPreloader ? preloader : placeholder}
          </div>
        ) : (
          <div className="canvas-container">
            <Canvas makePalette={this.makePalette} imageName={imageName} />
            <PaletteBuildFooter
              ref={ref => {
                this.child = ref;
              }}
              palette={palette}
            />
          </div>
        )}
      </div>
    );
  }
}
