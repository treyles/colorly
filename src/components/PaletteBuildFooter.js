import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from '../utils/Icon';
import {
  setCheckedColor,
  setPaletteTitle,
  clearPalette,
  addCardToLibrary
} from '../actions';

class PaletteBuildFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitAlert: false
    };

    this.handleTitleIconClick = this.handleTitleIconClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setTitleInputRef = this.setTitleInputRef.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.submitAlertTimer);
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

  handleSaveClick() {
    const { palette, title, history } = this.props;

    if (!Object.keys(palette).length || !title.length) {
      this.activateSubmitAlert();
      return;
    }

    this.props.addCardToLibrary(history);
  }

  activateSubmitAlert() {
    const { palette } = this.props;
    let { submitAlert } = this.state;

    if (!Object.keys(palette).length) {
      submitAlert = 'Palette Is Empty!';
    } else {
      submitAlert = 'Title Required!';
    }

    this.setState({ submitAlert });
    this.resetSubmitAlert();
  }

  resetSubmitAlert() {
    this.submitAlertTimer = setTimeout(() => {
      this.setState({ submitAlert: false });
    }, 1500);
  }

  // TODO: save for last (if have time), loop palette color markup
  render() {
    const { submitAlert } = this.state;
    const {
      palette,
      checked,
      title,
      library,
      clearPalette,
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
          <button className="clear" onClick={() => clearPalette()}>
            RESET
          </button>
          <button className="save" onClick={this.handleSaveClick}>
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
  history: PropTypes.object.isRequired, // eslint-disable-line
  // action creators
  setCheckedColor: PropTypes.func.isRequired,
  setPaletteTitle: PropTypes.func.isRequired,
  clearPalette: PropTypes.func.isRequired,
  addCardToLibrary: PropTypes.func.isRequired,
  // from store
  library: PropTypes.arrayOf(PropTypes.object).isRequired,
  checked: PropTypes.string.isRequired,
  palette: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  library: state.data.library,
  checked: state.build.checked,
  palette: state.build.card.palette,
  title: state.build.card.title
});

export default withRouter(
  connect(mapStateToProps, {
    setCheckedColor,
    setPaletteTitle,
    clearPalette,
    addCardToLibrary
  })(PaletteBuildFooter)
);
