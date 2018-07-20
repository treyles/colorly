import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ClickOutside extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.elementIsOpen !== this.props.elementIsOpen) {
      if (this.props.elementIsOpen) {
        document.addEventListener('click', this.handleClickOutside);
      } else {
        document.removeEventListener('click', this.handleClickOutside);
      }
    }
  }

  setWrapperRef(element) {
    this.wrapperRef = element;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onRequestClose();
    }
  }

  render() {
    const { elementIsOpen, children } = this.props;
    return <div ref={this.setWrapperRef}>{elementIsOpen && children}</div>;
  }
}

ClickOutside.propTypes = {
  children: PropTypes.element.isRequired,
  onRequestClose: PropTypes.func.isRequired
};
