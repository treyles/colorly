// padding on bottom for dialog space
// set media queries for grid breaks

import React from 'react';
import Header from './Header';
import Icon from '../utils/Icon';
import PaletteCard from './PaletteCard';
import BackButton from './BackButton';
import LazyImage from './LazyImage';

export default class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null
      // isNewUser: true
    };

    this.setImageSource = this.setImageSource.bind(this);
    this.handleCloseImageClick = this.handleCloseImageClick.bind(this);
  }

  setImageSource(url) {
    this.setState({ imageSource: url });
  }

  handleCloseImageClick() {
    this.setState({ imageSource: null });
  }

  render() {
    const { imageSource } = this.state;
    const {
      library,
      currentUser,
      loading,
      isNewUser,
      history
    } = this.props;

    const viewImage = (
      <div className="image-view">
        <BackButton onClick={this.handleCloseImageClick} />
        <LazyImage url={imageSource} />
      </div>
    );

    const emptyLibrary = (
      <div className="empty-library">
        <h3>Empty Palette Collection!</h3>
      </div>
    );

    const newUser = (
      <div className="new-user">
        <Icon icon="handWave" />
        <h3>Hey! It Looks Like You’re New</h3>
        <h4>
          To get started making color palettes, load an image by clicking
          the Add Palette button on the top right corner.
        </h4>
        <button
          className="dismiss-btn"
          onClick={() => this.props.closeNewUserDialog()}
        >
          DISMISS
        </button>
        <button
          className="lazy-btn"
          onClick={() => this.props.addDemoPalettes()}
        >
          FEELING LAZY?
        </button>
      </div>
    );

    return (
      <div className="library">
        <Header
          currentUser={currentUser}
          library={library}
          isNewUser={isNewUser}
          history={history}
          closeNewUserDialog={this.props.closeNewUserDialog}
        />
        {library.map(palette => (
          <PaletteCard
            key={palette.id}
            data={palette}
            setImageSource={this.setImageSource}
            deleteCardFromLibrary={this.props.deleteCardFromLibrary}
          />
        ))}
        {imageSource && viewImage}
        {!library.length && !loading && emptyLibrary}
        {isNewUser && newUser}
      </div>
    );
  }
}
