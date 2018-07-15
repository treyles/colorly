import React from 'react';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mousePosition: {},
      imageLoaded: false,
      colorPreview: false,
      currentColor: null,
      winWidth: null,
      winHeight: null
    };

    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.handleColorPreview = this.handleColorPreview.bind(this);
    this.handleCanvasLeave = this.handleCanvasLeave.bind(this);
    this.handleColorPick = this.handleColorPick.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.drawCanvasImage();
  }

  setCanvasRef(ref) {
    this.canvas = ref;
  }

  handleColorPreview(e) {
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
        colorPreview: true
      });
    }
  }

  handleCanvasLeave() {
    this.setState({
      colorPreview: false
    });
  }

  handleColorPick() {
    const { currentColor } = this.state;
    this.props.makePalette(currentColor);
  }

  updateWindowDimensions() {
    this.setState({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight
    });
  }

  optimizeSize(image) {
    const heightPadding = 275;
    const widthPadding = 60;
    const containerWidth = this.state.winWidth - widthPadding;
    const containerHeight = this.state.winHeight - heightPadding;

    let imageWidth = image.width;
    let imageHeight = image.height;

    // if any part of the image (original dimensions) overflow
    // the container, shrink dimensions and maintain aspect ratio
    // algorithm modified from 1owk3y: https://bit.ly/2JiYzHz
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
    const { imageRef } = this.props;

    imageRef.getDownloadURL().then(url => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = url;

      image.onload = () => {
        const { width, height } = this.optimizeSize(image);

        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.drawImage(image, 0, 0, width, height);

        this.setState({
          imageLoaded: true
        });
      };
    });
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
          onMouseMove={this.handleColorPreview}
          onMouseLeave={this.handleCanvasLeave}
          onClick={this.handleColorPick}
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

// const imageFile = storage.ref(`images/${this.props.imageName}`);
// const imageFile = storage
//   .ref()
//   .child(`images/${this.props.imageName}`);
