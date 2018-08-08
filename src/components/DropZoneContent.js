import React from 'react';
import PropTypes from 'prop-types';

export default function DropZoneContent({ imageAlert, handleImageDrop }) {
  return (
    <div className="drop-zone-content">
      <label htmlFor="file-browse" className={`${imageAlert && 'alert'}`}>
        {imageAlert ? (
          <h1>{imageAlert}</h1>
        ) : (
          <div>
            <h1>Browse or Drop Image Here</h1>
            <h3>JPG, GIF, PNG or SVG no larger than 3 MB</h3>
          </div>
        )}
      </label>
      <input
        id="file-browse"
        type="file"
        accept="image/*"
        onChange={e => handleImageDrop(e)}
      />
    </div>
  );
}

DropZoneContent.propTypes = {
  imageAlert: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    .isRequired,
  handleImageDrop: PropTypes.func.isRequired
};
