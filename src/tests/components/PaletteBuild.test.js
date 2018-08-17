import React from 'react';
import { shallow } from 'enzyme';
import PaletteBuild from '../../components/PaletteBuild';
import Canvas from '../../components/Canvas';
import PaletteBuildFooter from '../../components/PaletteBuildFooter';

describe('PaletteBuild', () => {
  let component;
  jest.useFakeTimers();

  const props = {
    library: [],
    currentUser: true,
    addCardToLibrary: jest.fn(),
    history: {}
  };

  const event = {
    preventDefault: jest.fn(),
    target: {
      files: [
        {
          type: 'image/jpeg',
          size: 125713
        }
      ]
    }
  };

  beforeEach(() => {
    component = shallow(<PaletteBuild {...props} />);
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('alerts to invalid file TYPE when image is dropped/selected', () => {
    event.target.files[0].type = 'image/notajpeg';
    component.instance().handleImageDrop(event);
    expect(component.state().imageAlert).toEqual('Not a Valid File Type!');
  });

  it('alerts to invalid file SIZE when image is dropped/selected', () => {
    event.target.files[0] = {
      type: 'image/jpeg',
      size: 8330244
    };
    component.instance().handleImageDrop(event);
    expect(component.state().imageAlert).toEqual(
      'Image Must be Smaller Than 3 MB!'
    );
  });

  it('resets imageAlert after 1.5s', () => {
    component.instance().handleImageDrop(event);
    expect(component.state().imageAlert).toEqual(
      'Image Must be Smaller Than 3 MB!'
    );
    setTimeout(() => {
      expect(component.state().imageAlert).toEqual(false);
    }, 1500);
    jest.runAllTimers();
  });

  it('adds new color to palette state when makePalette is called', () => {
    component.instance().makePalette('rgbValue');
    expect(component.state().palette.color1).toEqual('rgbValue');
  });

  it('clears palette when clearPalette is called ', () => {
    component.setState({
      palette: {
        color1: 'palette1'
      }
    });
    expect(Object.keys(component.state().palette).length).toEqual(1);
    component.instance().clearPalette();
    expect(Object.keys(component.state().palette).length).toEqual(0);
  });
  it('renders <Canvas /> if imageSource is truthy', () => {
    component.setState({
      imageSource: 'url'
    });
    expect(component.find(Canvas).exists()).toEqual(true);
  });

  it('renders <PaletteBuildFooter /> if imageSource is truthy', () => {
    component.setState({
      imageSource: 'url'
    });
    expect(component.find(PaletteBuildFooter).exists()).toEqual(true);
  });

  it('renders drop-zone if imageSource is falsey', () => {
    expect(component.find('.drop-zone').exists()).toEqual(true);
  });

  it('renders preloader if showPreloader is truthy', () => {
    component.setState({
      showPreloader: true
    });
    expect(component.find('.preloader-wrapper').exists()).toEqual(true);
  });
});
