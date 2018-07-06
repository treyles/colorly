import React from 'react';
import Icon from '../utils/Icon';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar'
    };
  }

  render() {
    return (
      <div className="header">
        <h2>Colorly</h2>
        <span>
          <Icon icon="logo" />
        </span>
      </div>
    );
  }
}
