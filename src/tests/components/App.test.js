import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App from '../../components/App';
import Home from '../../components/Home';
import NotFound from '../../components/NotFound';

describe('App', () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders `Home` if currentUser is null', () => {
    const mountedComponent = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(mountedComponent.find(Home)).toHaveLength(1);
  });

  it('renders `NotFound` if visiting unknown path', () => {
    const mountedComponent = mount(
      <MemoryRouter initialEntries={['/unknownpath']}>
        <App />
      </MemoryRouter>
    );

    expect(mountedComponent.find(NotFound)).toHaveLength(1);
  });

  it('pushes new card with `addCardToLibrary`', () => {
    const media = { one: 'one' };

    component.instance().addCardToLibrary(media);
    expect(component.state().library).toHaveLength(1);
  });

  it('pushes new card to top (index 0) with `addCardToLibrary`', () => {
    component.setState({
      library: [{ one: 'one' }]
    });

    const media = { two: 'two' };

    component.instance().addCardToLibrary(media);
    expect(component.state().library[0]).toEqual(media);
  });
});
