import React from 'react';
import PropTypes from 'prop-types';

export default class DropZoneContent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.handleImageDrop();
  }

  render() {
    const { imageAlert } = this.props;

    return (
      <div className="drop-zone-content">
        <label htmlFor="file-browse" className={imageAlert && 'alert'}>
          {imageAlert ? (
            <h1>{imageAlert}</h1>
          ) : (
            <div>
              <h1>Drag and Drop Image Here</h1>
              <h3>JPG, GIF, PNG or SVG no larger than 3 MB</h3>
            </div>
          )}
        </label>
        <input
          id="file-browse"
          type="file"
          accept="image/*"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

DropZoneContent.defaultProps = {
  imageAlert: null
};

DropZoneContent.propTypes = {
  imageAlert: PropTypes.string,
  handleImageDrop: PropTypes.func.isRequired
};
