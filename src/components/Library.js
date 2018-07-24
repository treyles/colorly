import React from 'react';
import Header from './Header';
import PaletteCard from './PaletteCard';
import BackButton from './BackButton';
import LazyImage from './LazyImage';

export default class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null
    };

    this.handleImageSource = this.handleImageSource.bind(this);
    this.handleCloseImage = this.handleCloseImage.bind(this);
  }

  handleImageSource(url) {
    this.setState({
      imageSource: url
    });
  }

  handleCloseImage() {
    this.setState({
      imageSource: null
    });
  }

  render() {
    const { imageSource } = this.state;
    const { library, currentUser } = this.props;

    const viewImage = (
      <div className="image-view">
        <BackButton onClick={this.handleCloseImage} />
        <LazyImage url={imageSource} />
      </div>
    );

    return (
      <div className="library">
        <Header currentUser={currentUser} library={library} />
        {library.map(palette => (
          <PaletteCard
            key={palette.id}
            data={palette}
            handleImageSource={this.handleImageSource}
            deleteCardFromLibrary={this.props.deleteCardFromLibrary}
          />
        ))}
        {imageSource && viewImage}
      </div>
    );
  }
}
