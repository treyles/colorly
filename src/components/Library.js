import React from 'react';
import Header from './Header';
import PaletteCard from './PaletteCard';

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
    const { library } = this.props;

    return (
      <div className="library">
        <Header />
        {library.map(palette => (
          <PaletteCard key={palette.id} data={palette} />
        ))}
      </div>
    );
  }
}
