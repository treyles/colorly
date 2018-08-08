import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

export default class ClickOutside extends Component {
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { elementIsOpen } = this.props;

    if (prevProps.elementIsOpen !== elementIsOpen) {
      if (elementIsOpen) {
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
    return (
      <div ref={this.setWrapperRef}>
        <CSSTransitionGroup
          transitionName="dialog-animate"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          {elementIsOpen && children}
        </CSSTransitionGroup>
      </div>
    );
  }
}

ClickOutside.propTypes = {
  children: PropTypes.element.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  elementIsOpen: PropTypes.bool.isRequired
};
