/* eslint-disable */
import React from 'react';
import { storage } from '../utils/base';
import PaletteBuildFooter from './PaletteBuildFooter';
import Icon from '../utils/Icon';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: true,
      data: true,
      progress: 0,
      dropZoneHover: false,
      showPreloader: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleCanvasHover = this.handleCanvasHover.bind(this);
    this.handleColorPick = this.handleColorPick.bind(this);
  }

  doImage() {
    var storageRef = storage.ref();
    var testerRef = storageRef.child('images').child('tester.jpg');

    testerRef.getDownloadURL().then(url => {
      console.log('url gotten');
      this.setState({ data: url });

      // TODO: keep dry
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      const image = new Image();

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
      image.crossOrigin = 'anonymous';
    });
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  handleCanvasHover(e) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    const actualX = Math.floor(e.clientX - rect.left);
    const actualY = Math.floor(e.clientY - rect.top);

    const pixelData = ctx.getImageData(actualX, actualY, 1, 1);
    const data = pixelData.data;
    const pixelColor = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`;
  }

  handleColorPick() {
    console.log('color picked');
  }

  handleDrop(e) {
    // console.log('dropped');
    e.preventDefault();

    this.setState({
      dropZoneHover: false,
      showPreloader: true
    });

    var file = e.dataTransfer.files[0];
    var storageRef = storage.ref('images/' + file.name);

    var task = storageRef.put(file);

    task.then(() => {
      this.doImage();
    });

    task.on(
      'state_changed',
      function progress(snapshot) {
        var percentage =
          snapshot.bytesTransferred / snapshot.totalBytes * 100;

        this.setState({ progress: percentage });
      }.bind(this)
    );
  }

  handleDragOver(e) {
    e.preventDefault();
    console.log('handle drag over');
    this.setState({
      dropZoneHover: true
    });
  }

  handleDragLeave(e) {
    e.preventDefault();
    console.log('handle drag leave');
    this.setState({
      dropZoneHover: false
    });
  }

  render() {
    const {
      clicked,
      data,
      progress,
      dropZoneHover,
      showPreloader
    } = this.state;

    // const colorPalette = (
    //   <div className="color-palette">
    //     <div className="color-1" />
    //     <div className="color-2" />
    //     <div className="color-3" />
    //     <div className="color-4" />
    //     <div className="color-5" />
    //     <div className="color-6" />
    //   </div>
    // );

    const placeholder = (
      <div className="placeholder">
        <h1>Drag and Drop Image</h1>
        <h3>JPG, SVG, or PNG no larger than 900kb</h3>
      </div>
    );

    const preloader = (
      <div className="preloader">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>
    );

    var dropZone = (
      <div
        className={`drop-zone ${dropZoneHover ? 'dragover' : ''}`}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
        {showPreloader ? preloader : placeholder}
      </div>
    );

    var dropImage = (
      <div className="canvas-container">
        <canvas
          ref="canvas"
          width={550}
          height={550}
          onMouseMove={this.handleCanvasHover}
          onClick={this.handleColorPick}
        />
        <PaletteBuildFooter />
      </div>
    );

    return (
      <div className="upload-section">{!data ? dropZone : dropImage}</div>
    );
  }
}
