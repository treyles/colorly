import React from 'react';
import PropTypes from 'prop-types';
import { rgbToHex, parseRgb } from '../utils/helpers';

export default class Swatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textColor: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
  }

  componentDidMount() {
    this.setTextContrast();
  }

  setInputRef(ref) {
    this.hexInput = ref;
  }

  // sets sufficient contrast between text and background color
  setTextContrast() {
    const rgb = parseRgb(this.props.color);
    const brightnessThreshold = 220;

    // algorithm to determine color brightness
    // https://www.w3.org/TR/AERT/#color-contrast
    const brightness = Math.round(
      (Number(rgb[0]) * 299 +
        Number(rgb[1]) * 587 +
        Number(rgb[2]) * 114) /
        1000
    );

    if (brightness > brightnessThreshold) {
      this.setState({ textColor: '#666' });
    }
  }

  handleClick() {
    this.hexInput.select();
    document.execCommand('copy');
    this.props.activateCopyAlert();
  }

  render() {
    const hex = rgbToHex(this.props.color);

    return (
      <button
        className="swatch"
        style={{ background: `${hex}` }}
        onClick={this.handleClick}
      >
        <div className="pop-up" style={{ background: `${hex}` }} />
        <input
          ref={this.setInputRef}
          style={{ color: `${this.state.textColor}` }}
          value={`${hex}`}
          readOnly
        />
      </button>
    );
  }
}

Swatch.propTypes = {
  activateCopyAlert: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired
};
