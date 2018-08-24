// Loop input/label jsx elements
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';

import { connect } from 'react-redux';
import {
  setCheckedColor,
  setPaletteTitle,
  clearPalette
} from '../actions';

class PaletteBuildFooter extends React.Component {
  constructor(props) {
    super(props);

    this.handleTitleIconClick = this.handleTitleIconClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setTitleInputRef = this.setTitleInputRef.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  setTitleInputRef(ref) {
    this.titleInput = ref;
  }

  handleTitleIconClick() {
    this.titleInput.focus();
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.titleInput.blur();
    }
  }

  handleButtonClick(e) {
    const button = e.target.className;

    if (button === 'save') {
      this.props.savePalette();
    }
    if (button === 'clear') {
      this.props.clearPalette();
    }
  }

  render() {
    const {
      palette,
      checked,
      title,
      library,
      submitAlert,
      setCheckedColor,
      setPaletteTitle
    } = this.props;

    return (
      <div className="footer">
        <div className="palette-name">
          <span
            onClick={this.handleTitleIconClick}
            onKeyDown={this.handleTitleIconClick}
            role="button"
            tabIndex="0"
          >
            <Icon icon="pencil" />
          </span>
          <input
            ref={this.setTitleInputRef}
            onChange={e => setPaletteTitle(e)}
            value={title}
            className="palette-input"
            type="text"
            placeholder={`Color Palette #${library.length + 1}`}
            maxLength="24"
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <div className="palette-colors">
          <input
            type="radio"
            id="color1"
            checked={checked === 'color1'}
            onChange={e => setCheckedColor(e)}
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
            onChange={e => setCheckedColor(e)}
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
            onChange={e => setCheckedColor(e)}
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
            onChange={e => setCheckedColor(e)}
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
            onChange={e => setCheckedColor(e)}
          />
          <label
            className="radio"
            htmlFor="color5"
            style={{ background: palette.color5 }}
          />
        </div>
        <div className="palette-buttons">
          <button className="clear" onClick={this.handleButtonClick}>
            RESET
          </button>
          <button className="save" onClick={this.handleButtonClick}>
            SAVE PALETTE
            <div className={`submit-alert ${submitAlert ? 'active' : ''}`}>
              {submitAlert}
            </div>
          </button>
        </div>
      </div>
    );
  }
}

PaletteBuildFooter.propTypes = {
  setCheckedColor: PropTypes.func.isRequired,
  setPaletteTitle: PropTypes.func.isRequired,
  savePalette: PropTypes.func.isRequired,
  // clearPalette: PropTypes.func.isRequired,
  palette: PropTypes.objectOf(PropTypes.string).isRequired,
  checked: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  library: PropTypes.arrayOf(PropTypes.object).isRequired,
  submitAlert: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    .isRequired
};

const mapStateToProps = state => ({
  library: state.data.library,
  checked: state.build.checked,
  palette: state.build.card.palette,
  title: state.build.card.title
});

export default connect(mapStateToProps, {
  setCheckedColor,
  setPaletteTitle,
  clearPalette
})(PaletteBuildFooter);
