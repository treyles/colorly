import React from 'react';
import Header from './Header';

export default class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar'
    };

    // this.handleClick = this.handleClick.bind(this);
    // this.addPaletteToLibrary = this.addPaletteToLibrary.bind(this);
  }

  // handleClick() {
  //   this.setState({
  //     foo: !this.state.foo
  //   });
  // }

  // addPaletteToLibrary(obj) {
  //   const { library } = this.state;
  //   this.setState({
  //     library: [obj].concat(library)
  //   });
  // }

  render() {
    return (
      <div>
        <Header />
        Stuff in here, cant probably see.
      </div>
    );
  }
}
