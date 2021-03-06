import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addColorToPalette } from '../actions';

export class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mousePosition: {},
      canvasImageLoaded: false,
      colorPreview: false,
      currentColor: null,
      winWidth: null,
      winHeight: null
    };

    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.handleColorPreviewMove = this.handleColorPreviewMove.bind(this);
    this.handleCanvasLeave = this.handleCanvasLeave.bind(this);
    this.handleColorClick = this.handleColorClick.bind(this);
    this.updateBrowserSize = this.updateBrowserSize.bind(this);
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.updateBrowserSize();
    window.addEventListener('resize', this.updateBrowserSize);
    this.drawCanvasImage();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateBrowserSize);
  }

  setCanvasRef(ref) {
    this.canvas = ref;
  }

  handleColorPreviewMove(e) {
    const { canvasImageLoaded } = this.state;

    const rect = this.canvas.getBoundingClientRect();
    const actualX = Math.floor(e.clientX - rect.left);
    const actualY = Math.floor(e.clientY - rect.top);

    const pixelData = this.ctx.getImageData(actualX, actualY, 1, 1);
    const { data } = pixelData;
    const pixelColor = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;

    if (canvasImageLoaded) {
      this.setState({
        currentColor: pixelColor,
        mousePosition: { x: actualX, y: actualY },
        colorPreview: true
      });
    }
  }

  handleCanvasLeave() {
    this.setState({
      colorPreview: false
    });
  }

  handleColorClick() {
    const { currentColor } = this.state;
    this.props.addColorToPalette(currentColor);
  }

  updateBrowserSize() {
    this.setState({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight
    });

    // redraw image on resize
    if (this.state.canvasImageLoaded) {
      this.drawCanvasImage();
    }
  }

  optimizeScale(image) {
    const heightPadding = 200;
    const widthPadding = 60;
    const containerWidth = this.state.winWidth - widthPadding;
    const containerHeight = this.state.winHeight - heightPadding;

    let imageWidth = image.width;
    let imageHeight = image.height;

    // if any part of the image's original dimensions overflow
    // the container, shrink dimensions and maintain aspect ratio
    // modified from 1owk3y: https://bit.ly/2JiYzHz
    if (imageWidth > containerWidth || imageHeight > containerHeight) {
      const wFits = containerWidth / imageWidth;
      const hFits = containerHeight / imageHeight;
      const minFits = wFits > hFits ? hFits : wFits;

      imageWidth *= minFits;
      imageHeight *= minFits;
    }

    return {
      width: imageWidth,
      height: imageHeight
    };
  }

  drawCanvasImage() {
    const image = new Image();
    const url = window.URL || window.webkitURL;
    const source = url.createObjectURL(this.props.imageSource);
    image.src = source;

    image.onload = () => {
      const { width, height } = this.optimizeScale(image);

      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx.drawImage(image, 0, 0, width, height);
      url.revokeObjectURL(source);

      this.setState({
        canvasImageLoaded: true
      });
    };
  }

  render() {
    const { mousePosition, colorPreview, currentColor } = this.state;

    const containerStyle = {
      top: `${mousePosition.y}px`,
      left: `${mousePosition.x}px`
    };

    const colorStyle = {
      background: currentColor
    };

    return (
      <div className="canvas-wrapper">
        <canvas
          ref={this.setCanvasRef}
          onMouseMove={this.handleColorPreviewMove}
          onMouseLeave={this.handleCanvasLeave}
          onClick={this.handleColorClick}
        />
        {colorPreview && (
          <div className="preview-container" style={containerStyle}>
            <div className="preview-color" style={colorStyle} />
          </div>
        )}
      </div>
    );
  }
}

Canvas.propTypes = {
  addColorToPalette: PropTypes.func.isRequired,
  imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired
};

export default connect(null, { addColorToPalette })(Canvas);
