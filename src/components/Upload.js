/* eslint-disable */
import React from 'react';
import { storage } from '../utils/base';
import PaletteBuildFooter from './PaletteBuildFooter';
import Icon from '../utils/Icon';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      mousePosition: {},
      colorPicker: false,
      dropZoneHover: false,
      showPreloader: false,
      currentColor: null
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleColorAndPosition = this.handleColorAndPosition.bind(this);
    this.handleColorPick = this.handleColorPick.bind(this);
    this.handleCanvasHover = this.handleCanvasHover.bind(this);
  }

  handleDrop(e) {
    e.preventDefault();

    this.setState({
      showPreloader: true
    });

    const file = e.dataTransfer.files[0];
    const storageRef = storage.ref('images/' + file.name);
    const task = storageRef.put(file);

    task.then(() => {
      this.drawCanvasImage();
    });
  }

  handleColorAndPosition(e) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const actualX = Math.floor(e.clientX - rect.left);
    const actualY = Math.floor(e.clientY - rect.top);
    const pixelData = ctx.getImageData(actualX, actualY, 1, 1);
    const data = pixelData.data;
    const pixelColor = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`;

    this.setState({
      currentColor: pixelColor,
      mousePosition: { x: actualX, y: actualY }
    });
  }

  handleColorPick() {
    const { currentColor } = this.state;
    this.child.makePalette(currentColor);
  }

  handleCanvasHover() {
    this.setState({
      colorPicker: !this.state.colorPicker
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

  drawCanvasImage() {
    const storageRef = storage.ref();
    const testerRef = storageRef.child('images').child('tester.jpg');

    testerRef.getDownloadURL().then(url => {
      this.setState({ data: url });

      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.crossOrigin = 'anonymous';

      image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        let imgWidth = image.width;

        if (imgWidth > 525) {
          imgWidth = 525;
          canvas.width = 525;
          canvas.height = imgWidth * image.height / image.width;
        }

        ctx.drawImage(
          image,
          0,
          0,
          imgWidth,
          imgWidth * image.height / image.width
        );
      };

      image.src = url;
    });
  }

  render() {
    const {
      data,
      dropZoneHover,
      showPreloader,
      mousePosition,
      colorPicker
    } = this.state;

    const placeholder = (
      <div className="placeholder">
        <h1>Drag and Drop Image</h1>
        <h3>JPG, SVG, or PNG no larger than 900kb</h3>
      </div>
    );

    const preloader = (
      <div className="preloader">
        <div>preloading</div>
      </div>
    );

    const dropZone = (
      <div
        className={`drop-zone ${dropZoneHover ? 'dragover' : ''}`}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
        {showPreloader ? preloader : placeholder}
      </div>
    );

    const dropImage = (
      <div className="canvas-container">
        <div className="canvas-wrapper">
          <canvas
            ref="canvas"
            width={550}
            height={550}
            onMouseMove={this.handleColorAndPosition}
            onMouseEnter={this.handleCanvasHover}
            onMouseLeave={this.handleCanvasHover}
            onClick={this.handleColorPick}
          />
          <div
            style={{
              visibility: colorPicker ? 'visible' : 'hidden',
              position: 'absolute',
              width: '10px',
              height: '10px',
              background: 'red',
              left: mousePosition.x + 10 + 'px',
              top: mousePosition.y - 10 + 'px'
            }}
          />
        </div>
        <PaletteBuildFooter
          ref={instance => {
            this.child = instance;
          }}
        />
      </div>
    );

    return (
      <div className="upload-section">{!data ? dropZone : dropImage}</div>
    );
  }
}
