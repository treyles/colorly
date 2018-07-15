// /* eslint-disable */
import React from 'react';
import Icon from '../utils/Icon';

export default class PaletteBuildFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footerActive: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
  }

  setInputRef(ref) {
    this.input = ref;
  }

  handleChange(e) {
    this.props.handlePaletteSelect(e);
  }

  handleInputFocus() {
    this.input.focus();
  }

  handleInputBlur(e) {
    if (e.keyCode === 13) {
      this.input.blur();
    }
  }

  render() {
    // const { footerActive } = this.state;
    const { palette, checked } = this.props;

    return (
      <div className="footer">
        {/* <div className={`footer ${footerActive ? 'active' : ''}`}> */}
        <div className="palette-name">
          <span
            onClick={this.handleInputFocus}
            onKeyDown={this.handleInputFocus}
            role="button"
            tabIndex="0"
          >
            <Icon icon="pencil" />
          </span>
          <input
            ref={this.setInputRef}
            className="palette-input"
            type="text"
            placeholder="Color Palette #001"
            maxLength="24"
            onKeyDown={this.handleInputBlur}
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
