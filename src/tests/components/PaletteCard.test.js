import React from 'react';
import { shallow } from 'enzyme';
import { PaletteCard } from '../../components/PaletteCard';
import Swatch from '../../components/Swatch';

describe('PaletteCard', () => {
  let component;
  const props = {
    uid: 'uid',
    data: {
      url: '',
      palette: {
        color1: 'color1',
        color2: 'color2',
        color3: 'color3'
      },
      title: ''
    },
    setImageSource: jest.fn()
  };

  beforeEach(() => {
    component = shallow(<PaletteCard {...props} />);
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('toggles optionsOpen state when options button is clicked', () => {
    component.find('.options').simulate('click');
    expect(component.state().optionsOpen).toEqual(true);
  });

  it('renders copied message when copyAlert state is truthy', () => {
    component.instance().activateCopyAlert();
    expect(component.find('.copy-alert').exists()).toEqual(true);
  });

  it('resets copyAlert after 1.5 seconds', () => {
    jest.useFakeTimers();
    component.instance().activateCopyAlert();
    expect(component.state().copyAlert).toEqual(true);
    setTimeout(() => {
      expect(component.state().copyAlert).toEqual(false);
    }, 1500);
    jest.runAllTimers();
  });

  it('renders correct amount of <Swatch /> components based on palette ', () => {
    expect(component.find(Swatch).length).toEqual(3);
  });

  it('calls setImageSource when VIEW button is clicked', () => {
    component.find('.image-view-btn').simulate('click');
    expect(props.setImageSource).toHaveBeenCalled();
  });

  it('calls deleteCardFromLibrary when DELETE button is clicked', () => {
    const spy = jest
      .spyOn(PaletteCard.prototype, 'deleteCardFromLibrary')
      .mockImplementation(jest.fn());
    const wrapper = shallow(<PaletteCard {...props} />);
    wrapper.find('.delete-btn').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
