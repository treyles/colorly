// native way to set space between grid?
// change color of text light or dark based on bg color
// finish up card!

import React from 'react';

export default class PaletteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      foo: !this.state.foo
    });
  }

  render() {
    const { title, palette } = this.props.data;

    return (
      <div className="palette-card">
        <div className="palette-colors">
          {Object.keys(palette).map(el => (
            <div
              key={palette[el]}
              className="swatch"
              style={{ background: `${palette[el]}` }}
            />
          ))}
        </div>
        <div className="palette-footer">{title}</div>
      </div>
    );
  }
}
