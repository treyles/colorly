import React from 'react';
import { shallow, mount } from 'enzyme';
import PaletteBuildFooter from '../../components/PaletteBuildFooter';

describe('PaletteBuildFooter', () => {
  const props = {
    setCheckedColor: jest.fn(),
    setPaletteTitle: jest.fn(),
    savePalette: jest.fn(),
    clearPalette: jest.fn(),
    palette: {},
    checked: 'color1',
    title: '',
    library: [],
    submitAlert: false
  };

  it('renders correctly', () => {
    const component = shallow(<PaletteBuildFooter {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('calls handleChange on palette selection', () => {
    const spy = jest.spyOn(PaletteBuildFooter.prototype, 'handleChange');
    const component = shallow(<PaletteBuildFooter {...props} />);

    component
      .find('input')
      .at(1)
      .simulate('change');
    expect(spy).toHaveBeenCalled();
  });

  it('calls handleTitleChange when entering title in text field', () => {
    const spy = jest.spyOn(
      PaletteBuildFooter.prototype,
      'handleTitleChange'
    );
    const component = shallow(<PaletteBuildFooter {...props} />);

    component.find('.palette-input').simulate('change');
    expect(spy).toHaveBeenCalled();
  });

  it('focuses on text field when icon is clicked', () => {
    const component = mount(<PaletteBuildFooter {...props} />);
    const element = component.instance().titleInput;
    jest.spyOn(element, 'focus');

    component
      .find('span')
      .at(0)
      .simulate('click');

    expect(element.focus).toHaveBeenCalled();
  });

  it('calls handleButtonClick when save button is clicked', () => {
    const spy = jest
      .spyOn(PaletteBuildFooter.prototype, 'handleButtonClick')
      .mockImplementation(jest.fn());
    const component = shallow(<PaletteBuildFooter {...props} />);
    component.find('.save').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('calls handleButtonClick when save button is clicked', () => {
    const spy = jest
      .spyOn(PaletteBuildFooter.prototype, 'handleButtonClick')
      .mockImplementation(jest.fn());
    const component = shallow(<PaletteBuildFooter {...props} />);
    component.find('.clear').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
