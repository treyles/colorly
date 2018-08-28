import React from 'react';
import { shallow, mount } from 'enzyme';
import { PaletteBuildFooter } from '../../components/PaletteBuildFooter';

describe('PaletteBuildFooter', () => {
  const props = {
    setCheckedColor: jest.fn(),
    setPaletteTitle: jest.fn(),
    addCardToLibrary: jest.fn(),
    clearPalette: jest.fn(),
    palette: {},
    checked: 'color1',
    title: '',
    library: [],
    history: {}
  };

  it('renders correctly', () => {
    const component = shallow(<PaletteBuildFooter {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('calls setCheckedColor on palette selection', () => {
    const component = shallow(<PaletteBuildFooter {...props} />);

    component
      .find('input')
      .at(1)
      .simulate('change');
    expect(props.setCheckedColor).toHaveBeenCalled();
  });

  it('calls setPaletteTitle when entering title in text field', () => {
    const component = shallow(<PaletteBuildFooter {...props} />);

    component.find('.palette-input').simulate('change');
    expect(props.setPaletteTitle).toHaveBeenCalled();
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

  it('calls handleSaveClick when save button is clicked', () => {
    const spy = jest
      .spyOn(PaletteBuildFooter.prototype, 'handleSaveClick')
      .mockImplementation(jest.fn());
    const component = shallow(<PaletteBuildFooter {...props} />);
    component.find('.save').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('calls clearPalette() when clear button is clicked', () => {
    const component = shallow(<PaletteBuildFooter {...props} />);
    component.find('.clear').simulate('click');
    expect(props.clearPalette).toHaveBeenCalled();
  });
});
