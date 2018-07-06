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
    })
  }

  render() {
    const { val } = this.props;
    
    return (
      <div>
        <div className='palette-card'>
          {`project ${val}`}
        </div>
      </div>
    )
  }
}