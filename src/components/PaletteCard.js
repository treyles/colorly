// native way to set space between grid?
// update top/bottom padding on .add button if going with new font size
// maybe .add button not so big? look at spotify

// change color of text light or dark based on bg color
// finish up card!

import React from 'react';
import uuidv4 from 'uuid';
// import ClickOutside from 'react-click-outside';
import ClickOutside from '../utils/ClickOutside';
import Icon from '../utils/Icon';
import Swatch from './Swatch';

export default class PaletteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsOpen: false,
      modalOpen: false
    };

    this.handleDialogToggle = this.handleDialogToggle.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    // this.handleModalOpen = this.handleModalOpen.bind(this);
    // this.handleModalClose = this.handleModalClose.bind(this);
    // this.rgbToHex = this.rgbToHex.bind(this);
    // this.handleCopy = this.handleCopy.bind(this);
    // this.setInputRef = this.setInputRef.bind(this);
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

  render() {
    const { optionsOpen } = this.state;
    const { title, palette, url, id } = this.props.data;

    const dialogBox = (
      <div className="dialog">
        <button className="view-image" onClick={this.handleModalOpen}>
          VIEW IMAGE
        </button>
        <button className="delete">DELETE</button>
      </div>
    );

    return (
      <div className="palette-card">
        <div className="palette-colors">
          {Object.keys(palette).map(el => (
            <Swatch key={uuidv4()} color={palette[el]} />
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
            {dialogBox}
          </ClickOutside>
        </div>
      </div>
    );
  }
}

// class Swatch extends Component {
//   constructor(props) {
//     super(props);
//     this.handleCopy = this.handleCopy.bind(this);
//   }

//   handleCopy() {
//     this.hex.select();
//     document.execCommand('copy');
//   }

//   render() {
//     const { data } = this.props;

//     return (
//       <div
//         key={uuidv4()}
//         className="swatch"
//         style={{ background: `${palette[data]}` }}
//         onClick={this.handleCopy}
//         onKeyDown={this.handleCopy}
//         role="button"
//         tabIndex={0}
//       >
//         <div
//           className="pop-up"
//           style={{ background: `${palette[data]}` }}
//         />
//         <input
//           ref={ref => (this.hex = ref)}
//           value={`${palette[data]}`}
//           readOnly
//         />
//       </div>
//     );
//   }
// }

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
