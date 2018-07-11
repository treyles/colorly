// /* eslint-disable */
import React from 'react';
import Icon from '../utils/Icon';

export default class PaletteBuildFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footerActive: false,
      checked: 'color1',
      palette: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.blurInput = this.blurInput.bind(this);
  }

  handleChange(e) {
    this.setState({
      checked: e.target.id
    });
  }

  focusInput() {
    this.input.focus();
  }

  blurInput(e) {
    if (e.keyCode === 13) {
      this.input.blur();
    }
  }

  makePalette(color) {
    const { checked, palette } = this.state;
    const newColor = { [checked]: color };

    this.setState({
      palette: { ...palette, ...newColor }
    });
  }

  render() {
    const { footerActive, checked, palette } = this.state;

    return (
      <div className={`footer ${footerActive ? 'active' : ''}`}>
        <div className="palette-name">
          <span
            onClick={this.focusInput}
            onKeyDown={this.focusInput}
            role="button"
            tabIndex="0"
          >
            <Icon icon="pencil" />
          </span>
          <input
            ref={el => {
              this.input = el;
            }}
            className="palette-input"
            type="text"
            placeholder="Color Palette #001"
            maxLength="24"
            onKeyDown={this.blurInput}
          />
        </div>
        <div className="palette-colors">
          <input
            type="radio"
            id="color1"
            checked={checked === 'color1'}
            onChange={this.handleChange}
          />
          <label
            className="radio"
            htmlFor="color1"
            style={{ background: palette.color1 }}
          />
          <input
            type="radio"
            id="color2"
            checked={checked === 'color2'}
            onChange={this.handleChange}
          />
          <label
            className="radio"
            htmlFor="color2"
            style={{ background: palette.color2 }}
          />
          <input
            type="radio"
            id="color3"
            checked={checked === 'color3'}
            onChange={this.handleChange}
          />
          <label
            className="radio"
            htmlFor="color3"
            style={{ background: palette.color3 }}
          />
          <input
            type="radio"
            id="color4"
            checked={checked === 'color4'}
            onChange={this.handleChange}
          />
          <label
            className="radio"
            htmlFor="color4"
            style={{ background: palette.color4 }}
          />
          <input
            type="radio"
            id="color5"
            checked={checked === 'color5'}
            onChange={this.handleChange}
          />
          <label
            className="radio"
            htmlFor="color5"
            style={{ background: palette.color5 }}
          />
        </div>
        <div className="palette-buttons">
          <div className="cancel-btn">CANCEL</div>
          <button className="save-btn">SAVE PALETTE</button>
        </div>
      </div>
    );
  }
}
