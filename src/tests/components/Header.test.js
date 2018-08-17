import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

describe('Header', () => {
  let component;
  const props = {
    isNewUser: false,
    closeNewUserDialog: jest.fn(),
    currentUser: true,
    library: [],
    animateHeader: false,
    history: { push: jest.fn() }
  };

  beforeEach(() => {
    component = shallow(<Header {...props} />);
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('shows number of cards in library', () => {
    component.setProps({
      library: [{}, {}]
    });

    expect(component.find('.count').text()).toEqual('2');
  });

  it('changes profileOpen state to true dialog name button is clicked', () => {
    const profileButton = component.find('button').at(0);

    // default state
    expect(component.state().profileOpen).toEqual(false);
    profileButton.simulate('click');
    expect(component.state().profileOpen).toEqual(true);
  });

  it('calls "handleAddPaletteClick" on ADD button click', () => {
    const spy = jest
      .spyOn(Header.prototype, 'handleAddPaletteClick')
      .mockImplementation(jest.fn());
    const wrapper = shallow(<Header {...props} />);
    wrapper.find('.add').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('calls "handleSignOutClick" on SIGN OUT button click', () => {
    const spy = jest
      .spyOn(Header.prototype, 'handleSignOutClick')
      .mockImplementation(jest.fn());
    const wrapper = shallow(<Header {...props} />);
    wrapper.find('.sign-out').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
