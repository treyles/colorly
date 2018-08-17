import React from 'react';
import { shallow } from 'enzyme';
import Swatch from '../../components/Swatch';

describe('Swatch', () => {
  let component;
  const props = {
    activateCopyAlert: jest.fn(),
    color: ''
  };

  beforeEach(() => {
    component = shallow(<Swatch {...props} />);
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('calls activateCopyAlert when swatch is clicked', () => {
    component.instance().hexInput = { select: jest.fn() };
    Object.defineProperty(window.document, 'execCommand', {
      value: jest.fn()
    });
    component.find('.swatch').simulate('click');
    expect(props.activateCopyAlert).toHaveBeenCalled();
  });

  it('sets textColor state to #666 when swatch color is light/white', () => {
    component.setProps({
      color: 'rgb(255, 255, 255)' // white
    });
    component.instance().setTextContrast();
    expect(component.state().textColor).toEqual('#666');
  });
});
