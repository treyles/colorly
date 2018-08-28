import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from '../../store';
import App from '../../components/App';
import Home from '../../components/Home';
import Library from '../../components/Library';
import PaletteBuild from '../../components/PaletteBuild';
import NotFound from '../../components/NotFound';

describe('App', () => {
  it('renders correctly', () => {
    const component = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it('renders <Home/> if currentUser is null', () => {
    const mountedComponent = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(mountedComponent.find(Home)).toHaveLength(1);
  });

  it('renders <Library/> if currentUser is true', () => {
    store.getState().user.currentUser = true;
    const mountedComponent = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(mountedComponent.find(Library)).toHaveLength(1);
  });

  it('renders <PaletteBuild/> if currentUser is true', () => {
    store.getState().user.currentUser = true;
    const mountedComponent = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/palettebuild']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(mountedComponent.find(PaletteBuild)).toHaveLength(1);
  });

  it('renders <NotFound/> if visiting unknown path', () => {
    const mountedComponent = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknownpath']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(mountedComponent.find(NotFound)).toHaveLength(1);
  });

  // it('pushes new card to top (index 0) with `addCardToLibrary`', () => {
  //   component.setState({
  //     library: [{ one: 'one' }]
  //   });

  //   const media = { two: 'two' };

  //   component.instance().addCardToLibrary(media);
  //   expect(component.state().library[0]).toEqual(media);
  // });
});
