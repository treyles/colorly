// native way to set space between grid?
// change color of text light or dark based on bg color
// refactor toggleCopy setTimeout

import React from 'react';
import ClickOutside from '../utils/ClickOutside';
import Icon from '../utils/Icon';
import Swatch from './Swatch';

export default class PaletteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsOpen: false,
      copyAlert: false
    };

    this.handleDialogToggle = this.handleDialogToggle.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.activateCopyAlert = this.activateCopyAlert.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.copyAlertTimer);
  }

  handleDialogToggle() {
    this.setState({
      optionsOpen: !this.state.optionsOpen
    });
  }

  handleDialogClose() {
    this.setState({
      optionsOpen: false
    });
  }

  activateCopyAlert() {
    this.setState({ copyAlert: true });
    this.resetCopyAlert();
  }

  resetCopyAlert() {
    this.copyAlertTimer = setTimeout(() => {
      this.setState({ copyAlert: false });
    }, 1500);
  }

  render() {
    const { optionsOpen, copyAlert } = this.state;
    const { title, palette, url } = this.props.data;

    const optionsDialog = (
      <div className="options-dialog">
        <button
          className="image-view-btn"
          onClick={() => this.props.handleImageSource(url)}
        >
          VIEW IMAGE
        </button>
        <button
          className="delete-btn"
          onClick={() => this.props.deleteCardFromLibrary(this.props.data)}
        >
          DELETE
        </button>
      </div>
    );

    return (
      <div className="palette-card">
        <div className="palette-colors">
          {Object.keys(palette).map((el, index) => (
            <Swatch
              key={index}
              color={palette[el]}
              activateCopyAlert={this.activateCopyAlert}
            />
          ))}
        </div>
        <div className="palette-footer">
          {title}
          <button className="options" onClick={this.handleDialogToggle}>
            <Icon icon="options" />
          </button>
          <ClickOutside
            elementIsOpen={optionsOpen}
            onRequestClose={this.handleDialogClose}
          >
            {optionsDialog}
          </ClickOutside>
          {copyAlert && (
            <div className="copy-alert">Copied to Clipboard</div>
          )}
        </div>
      </div>
    );
  }
}
