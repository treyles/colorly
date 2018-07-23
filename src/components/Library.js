// Rename all image-view, view-image in state and css
// refactor toggleCopy setTimeout
// firefox execCommand(copy) not working

import React from 'react';
import Header from './Header';
import PaletteCard from './PaletteCard';
import BackButton from './BackButton';
import LazyImage from './LazyImage';

export default class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // copyAlert: false
      viewImage: false
      // imageLoaded: false
    };

    // this.toggleCopyAlert = this.toggleCopyAlert.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.addPaletteToLibrary = this.addPaletteToLibrary.bind(this);
    this.handleViewImage = this.handleViewImage.bind(this);
    this.handleCloseImage = this.handleCloseImage.bind(this);
    // this.handleOnLoad = this.handleOnLoad.bind(this);
  }

  handleViewImage(url) {
    console.log(url);
    this.setState({
      viewImage: url
    });
  }

  handleCloseImage() {
    this.setState({
      viewImage: false
    });
  }

  render() {
    const { viewImage } = this.state;
    const { library } = this.props;

    const imageViewer = (
      <div className="image-view">
        <BackButton onClick={this.handleCloseImage} />
        <LazyImage url={viewImage} />
      </div>
    );

    return (
      <div className="library">
        <Header />
        {library.map(palette => (
          <PaletteCard
            key={palette.id}
            data={palette}
            handleViewImage={this.handleViewImage}
          />
        ))}
        {viewImage && imageViewer}
      </div>
    );
  }
}
