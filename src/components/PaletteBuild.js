import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PaletteBuildFooter from './PaletteBuildFooter';
import BackButton from './BackButton';
import Canvas from './Canvas';
import DropZoneContent from './DropZoneContent';
import { resetBuild, setImageSource } from '../actions';

export class PaletteBuild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropZoneHover: false,
      imageAlert: false
    };

    this.handleImageDrop = this.handleImageDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
  }

  componentWillUnmount() {
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

    this.props.setImageSource(imageFile);
  }

  resetImageLoadAlert() {
    this.imageAlertTimer = setTimeout(() => {
      this.setState({ imageAlert: false });
    }, 1500);
  }

  render() {
    const { dropZoneHover, imageAlert } = this.state;
    const { imageSource, showPreloader } = this.props;

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
            <DropZoneContent
              imageAlert={imageAlert}
              handleImageDrop={this.handleImageDrop}
            />
          </div>
        ) : (
          <div className="canvas-container">
            <Canvas imageSource={imageSource} />
            <PaletteBuildFooter />
          </div>
        )}
        {showPreloader && preloader}
      </div>
    );
  }
}

PaletteBuild.propTypes = {
  resetBuild: PropTypes.func.isRequired,
  setImageSource: PropTypes.func.isRequired,
  imageSource: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
    .isRequired,
  showPreloader: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  imageSource: state.build.imageSource,
  showPreloader: state.build.showPreloader
});

export default connect(mapStateToProps, { resetBuild, setImageSource })(
  PaletteBuild
);
