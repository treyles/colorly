import React from 'react';
import PropTypes from 'prop-types';
import ClickOutside from '../utils/ClickOutside';
import Icon from '../utils/Icon';
import Swatch from './Swatch';

import { connect } from 'react-redux';
import { deleteCard } from '../actions';
import { databaseRef, storageRef } from '../utils/base';

class PaletteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsOpen: false,
      copyAlert: false
    };

    this.handleDialogToggleClick = this.handleDialogToggleClick.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.activateCopyAlert = this.activateCopyAlert.bind(this);
    this.deleteCardFromLibrary = this.deleteCardFromLibrary.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.copyAlertTimer);
  }

  handleDialogToggleClick() {
    this.setState({
      optionsOpen: !this.state.optionsOpen
    });
  }

  deleteCardFromLibrary() {
    const { uid, data } = this.props;

    if (!data.demo) {
      storageRef
        .child(uid)
        .child(data.id)
        .delete();
    }

    databaseRef
      .child(uid)
      .child(data.id)
      .remove();
  }

  closeDialog() {
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
    const { data, setImageSource } = this.props;

    const optionsDialog = (
      <div className="options-dialog">
        <button
          className="image-view-btn"
          onClick={() => setImageSource(data.url)}
        >
          VIEW IMAGE
        </button>
        <button
          className="delete-btn"
          onClick={this.deleteCardFromLibrary}
        >
          DELETE
        </button>
      </div>
    );

    return (
      <div className="palette-card">
        <div className="palette-swatches">
          {Object.keys(data.palette).map((el, index) => (
            <Swatch
              key={index}
              color={data.palette[el]}
              activateCopyAlert={this.activateCopyAlert}
            />
          ))}
        </div>
        <div className="palette-footer">
          {data.title}
          <button
            className="options"
            onClick={this.handleDialogToggleClick}
          >
            <Icon icon="options" />
          </button>
          <ClickOutside
            elementIsOpen={optionsOpen}
            onRequestClose={this.closeDialog}
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

PaletteCard.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string,
    palette: PropTypes.object,
    title: PropTypes.string
  }).isRequired,
  setImageSource: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  uid: state.user.currentUser.uid
});

export default connect(mapStateToProps, { deleteCard })(PaletteCard);
