// native way to set space between grid?
// update top/bottom padding on .add button if going with new font size
// maybe .add button not so big? look at spotify

// change color of text light or dark based on bg color
// finish up card!

import React from 'react';
// import ClickOutside from 'react-click-outside';
import ClickOutside from '../utils/ClickOutside';
import Icon from '../utils/Icon';

export default class PaletteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsClicked: false
    };

    this.handleDialogToggle = this.handleDialogToggle.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleDialogToggle() {
    this.setState({
      optionsClicked: !this.state.optionsClicked
    });
  }

  handleDialogClose() {
    this.setState({
      optionsClicked: false
    });
  }

  render() {
    const { optionsClicked } = this.state;
    const { title, palette } = this.props.data;

    const dialogBox = (
      <div className="dialog">
        <button className="view-image">VIEW IMAGE</button>
        <button className="delete">DELETE</button>
      </div>
    );

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
        <div className="palette-footer">
          {title}
          <button className="options" onClick={this.handleDialogToggle}>
            <Icon icon="options" />
          </button>
          <ClickOutside
            elementIsOpen={optionsClicked}
            onRequestClose={this.handleDialogClose}
          >
            {dialogBox}
          </ClickOutside>
        </div>
      </div>
    );
  }
}

// /* eslint-disable */
// class Options extends React.Component {
//   constuctor(props) {
//     super(props)

//     this.handleClick = this.handleClick.bind(this);
//   }

//   componentDidMount() {
//     window.addEventListener('click', this.handleClick);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('click', this.handleClick);
//   }

//   handleClick() {

//   }

//   render() {
//     return (
//       <div className="dialog">
//         <button className="view-image">VIEW IMAGE</button>
//         <button className="delete">DELETE</button>
//       </div>
//     );
//   }
// }
