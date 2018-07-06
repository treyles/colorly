import React from 'react';

export default class PaletteBuildFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footerActive: false
    };
  }

  render() {
    const { footerActive } = this.state;

    return (
      <div className={`footer ${footerActive ? 'active' : ''}`}>
        <div className="palette-name">
          <h3>Color Palette #001</h3>
        </div>
        <div className="palette-colors">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="palette-buttons">
          <div className="cancel-btn">CANCEL</div>
          <button className="save-btn">SAVE PALETTE</button>
        </div>
      </div>
    );
  }
}
