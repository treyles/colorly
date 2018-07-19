import React from 'react';
import Icon from '../utils/Icon';
import { Link } from 'react-router-dom';
// import Icon from '../utils/Icon';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar'
    };
  }

  render() {
    return (
      <header>
        <div className="header-top">
          <div className="profile">
            <div className="profile-image" />
            <span>Nick Bostrom</span>
            <span>
              <Icon icon="down" />
            </span>
          </div>
          <Link to="/upload">
            <button className="add">
              <span>
                <Icon icon="add" />
              </span>
              ADD PALETTE
            </button>
          </Link>
        </div>
        <div className="header-logo">
          <h2>Colorly</h2>
          <span>
            <Icon icon="logo" />
          </span>
        </div>
      </header>
    );
  }
}
