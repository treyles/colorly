import React from 'react';

export default class Swatch extends React.Component {
  constructor(props) {
    super(props);
    this.handleCopy = this.handleCopy.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
  }

  setInputRef(ref) {
    this.hex = ref;
  }

  handleCopy() {
    this.hex.select();
    document.execCommand('copy');
  }

  render() {
    const { color } = this.props;

    return (
      <div
        className="swatch"
        style={{ background: `${color}` }}
        onClick={this.handleCopy}
        onKeyDown={this.handleCopy}
        role="button"
        tabIndex={0}
      >
        <div className="pop-up" style={{ background: `${color}` }} />
        <input ref={this.setInputRef} value={`${color}`} readOnly />
      </div>
    );
  }
}
