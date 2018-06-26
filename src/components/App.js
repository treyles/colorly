import React from 'react';

export default class App extends React.Component {
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
    })
  }

  render() {
    const { foo } = this.state;

    return (
      <button onClick={this.handleClick}>
        {foo ? 'unclicked' : 'clicked'}
      </button>
    )
  }
}