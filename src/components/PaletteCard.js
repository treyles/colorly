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
      copyAlert: false
    };

    this.handleDialogToggle = this.handleDialogToggle.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.toggleCopyAlert = this.toggleCopyAlert.bind(this);
    // this.handleModalOpen = this.handleModalOpen.bind(this);
    // this.handleModalClose = this.handleModalClose.bind(this);
    // this.rgbToHex = this.rgbToHex.bind(this);
    // this.handleCopy = this.handleCopy.bind(this);
    // this.setInputRef = this.setInputRef.bind(this);
  }

  // componentDidMount() {
  //   console.log('card did mount');
  // }

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

  toggleCopyAlert() {
    this.setState({
      copyAlert: true
    });

    setTimeout(() => {
      this.setState({
        copyAlert: false
      });
    }, 1500);
  }

  render() {
    const { optionsOpen, copyAlert } = this.state;
    const { title, palette, url, id } = this.props.data;

    const dialogBox = (
      <div className="dialog">
        <button
          className="image-view-btn"
          onClick={() => this.props.handleViewImage(url)}
        >
          VIEW IMAGE
        </button>
        <button className="delete-btn">DELETE</button>
      </div>
    );

    return (
      <div className="palette-card">
        <div className="palette-colors">
          {Object.keys(palette).map((el, index) => (
            <Swatch
              key={index}
              color={palette[el]}
              toggleCopyAlert={this.toggleCopyAlert}
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
            {dialogBox}
          </ClickOutside>
          {copyAlert && (
            <div className="copy-alert">Copied to Clipboard</div>
          )}
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
