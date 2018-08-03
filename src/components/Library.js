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
      imageSource: null,
      animateHeader: false
      // isNewUser: true
    };

    this.setImageSource = this.setImageSource.bind(this);
    this.handleCloseImageClick = this.handleCloseImageClick.bind(this);
    this.scrollPosition = this.scrollPosition.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollPosition);
  }

  setImageSource(url) {
    this.setState({ imageSource: url });
  }

  handleCloseImageClick() {
    this.setState({ imageSource: null });
  }

  scrollPosition() {
    if (window.scrollY > 40) {
      this.setState({
        animateHeader: true
      });
    }

    if (window.scrollY < 40) {
      this.setState({
        animateHeader: false
      });
    }
  }

  render() {
    const { imageSource, animateHeader } = this.state;
    const {
      library,
      currentUser,
      loading,
      isNewUser,
      history
    } = this.props;

    const placeholders = [...Array(10)].map((_, i) => (
      <div key={i} className="placeholder" />
    ));

    const viewImage = (
      <div className="image-view">
        <BackButton onClick={this.handleCloseImageClick} />
        <LazyImage url={imageSource} />
      </div>
    );

    const emptyMessage = (
      <div className="empty-library">
        <h3>Empty Palette Collection!</h3>
      </div>
    );

    const newUserDialog = (
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
          animateHeader={animateHeader}
        />
        {library.map(palette => (
          <PaletteCard
            key={palette.id}
            data={palette}
            setImageSource={this.setImageSource}
            deleteCardFromLibrary={this.props.deleteCardFromLibrary}
          />
        ))}
        {loading && placeholders}
        {imageSource && viewImage}
        {!library.length && !loading && emptyMessage}
        {isNewUser && newUserDialog}
      </div>
    );
  }
}
