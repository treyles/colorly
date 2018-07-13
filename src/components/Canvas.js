import React from 'react';
import { storage } from '../utils/base';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mousePosition: {},
      imageLoaded: false,
      previewColor: false,
      currentColor: null,
      winWidth: null,
      winHeight: null
    };

    this.handleColorAndPosition = this.handleColorAndPosition.bind(this);
    this.handleCanvasLeave = this.handleCanvasLeave.bind(this);
    this.handleColorPick = this.handleColorPick.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.getImageFile();
  }

  updateWindowDimensions() {
    this.setState({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight
    });
  }

  // TODO: name handleColorPreview ???
  handleColorAndPosition(e) {
    const { imageLoaded } = this.state;

    const rect = this.canvas.getBoundingClientRect();
    const actualX = Math.floor(e.clientX - rect.left);
    const actualY = Math.floor(e.clientY - rect.top);

    const pixelData = this.ctx.getImageData(actualX, actualY, 1, 1);
    const { data } = pixelData;
    const pixelColor = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`;

    if (imageLoaded) {
      this.setState({
        currentColor: pixelColor,
        mousePosition: { x: actualX, y: actualY },
        previewColor: true
      });
    }
  }

  handleCanvasLeave() {
    this.setState({
      previewColor: false
    });
  }

  handleColorPick() {
    const { currentColor } = this.state;
    this.props.makePalette(currentColor);
  }

  drawCanvasImage(image) {
    const heightPadding = 275;
    const widthPadding = 60;
    const containerWidth = this.state.winWidth - widthPadding;
    const containerHeight = this.state.winHeight - heightPadding;
    let imageWidth = image.width;
    let imageHeight = image.height;

    // if any part of the image (original dimensions) overflow
    // the container, shrink dimensions and maintain aspect ratio
    if (imageWidth > containerWidth || imageHeight > containerHeight) {
      // algorithm modified from 1owk3y: https://bit.ly/2JiYzHz
      const wFits = containerWidth / imageWidth;
      const hFits = containerHeight / imageHeight;
      const minFits = wFits > hFits ? hFits : wFits;

      imageWidth *= minFits;
      imageHeight *= minFits;
    }

    this.canvas.width = imageWidth;
    this.canvas.height = imageHeight;

    // TODO: check if this works
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
  }

  getImageFile() {
    const imageFile = storage
      .ref()
      .child(`images/${this.props.imageName}`);

    imageFile.getDownloadURL().then(url => {
      const image = new Image();
      image.crossOrigin = 'anonymous';

      image.onload = () => {
        this.drawCanvasImage(image);
        this.setState({ imageLoaded: true });
      };

      image.src = url;
    });
  }

  render() {
    const { mousePosition, previewColor, currentColor } = this.state;

    const containerStyle = {
      top: `${mousePosition.y}px`,
      left: `${mousePosition.x + 10}px`
    };

    const colorStyle = {
      background: currentColor
    };

    return (
      <div className="canvas-wrapper">
        <canvas
          ref={ref => {
            this.canvas = ref;
          }}
          // width={800}
          // height={550}
          onMouseMove={this.handleColorAndPosition}
          onMouseLeave={this.handleCanvasLeave}
          onClick={this.handleColorPick}
        />
        {previewColor && (
          <div className="preview-container" style={containerStyle}>
            <div className="preview-color" style={colorStyle} />
          </div>
        )}
      </div>
    );
  }
}
