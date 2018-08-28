import React from 'react';
import { shallow } from 'enzyme';
import { PaletteBuild } from '../../components/PaletteBuild';
import Canvas from '../../components/Canvas';
import PaletteBuildFooter from '../../components/PaletteBuildFooter';

describe('PaletteBuild', () => {
  let component;
  jest.useFakeTimers();

  const props = {
    resetBuild: jest.fn(),
    setImageSource: jest.fn(),
    imageSource: false,
    showPreloader: false
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

  it('renders <Canvas /> if imageSource is truthy', () => {
    component.setProps({
      imageSource: { true: 'true' }
    });
    expect(component.find(Canvas).exists()).toEqual(true);
  });

  it('renders <PaletteBuildFooter /> if imageSource is truthy', () => {
    component.setProps({
      imageSource: { true: 'true' }
    });
    expect(component.find(PaletteBuildFooter).exists()).toEqual(true);
  });

  it('renders drop-zone if imageSource is falsey', () => {
    expect(component.find('.drop-zone').exists()).toEqual(true);
  });

  it('renders preloader if showPreloader is truthy', () => {
    component.setProps({
      showPreloader: true
    });
    expect(component.find('.preloader-wrapper').exists()).toEqual(true);
  });
});
