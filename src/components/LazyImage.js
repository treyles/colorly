import React from 'react';
// import PropTypes from 'prop-types'

export default class LazyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false
    };

    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    this.img = new Image();
    this.img.onload = this.handleLoad;
    this.img.src = this.props.url;
  }

  handleLoad() {
    this.setState({
      imageLoaded: true
    });
  }

  render() {
    const preloader = (
      <div className="preloader-wrapper">
        <span className="preloader">Loading</span>
      </div>
    );

    return this.state.imageLoaded ? (
      <img className="image" src={this.props.url} alt="" />
    ) : (
      preloader
    );
  }
}
