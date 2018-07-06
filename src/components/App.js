import React from 'react';
import PaletteCard from './PaletteCard';
import Upload from './Upload';
import Header from './Header';
import { rebase, auth, database } from '../utils/base';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount() {
  //   auth.onAuthStateChanged(currentUser => {
  //     console.log(currentUser)
  //   })
  // }

  handleClick() {
    this.setState({
      foo: !this.state.foo
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Upload />
      </div>
    );
  }
}
