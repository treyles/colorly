import React from 'react';
import { shallow } from 'enzyme';
import { Library } from '../../components/Library';
import PaletteCard from '../../components/PaletteCard';
import { libraryMock } from '../__mocks__/dataMock.json';

describe('Library', () => {
  let component;
  const props = {
    library: [],
    currentUser: true,
    loading: false,
    isNewUser: false,
    closeNewUserDialog: jest.fn(),
    addDemoPalettes: jest.fn(),
    deleteCardFromLibrary: jest.fn(),
    history: {}
  };

  beforeEach(() => {
    component = shallow(<Library {...props} />);
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders correct amount of palette cards', () => {
    component.setProps({ library: libraryMock });
    expect(component.find(PaletteCard)).toHaveLength(4);
  });

  it('renders placeholders when loading is true', () => {
    component.setProps({ loading: true });
    expect(component.find('.placeholder').exists()).toEqual(true);
  });

  it('renders viewImage when imageSource is true', () => {
    component.setState({ imageSource: 'url' });
    expect(component.find('.image-view').exists()).toEqual(true);
  });

  it('renders emptyMessage when library is empty and loading is false', () => {
    expect(component.find('.empty-library').exists()).toEqual(true);
  });

  it('renders newUserDialog when isNewUser is true', () => {
    component.setProps({ isNewUser: true });
    expect(component.find('.new-user').exists()).toEqual(true);
  });
});
