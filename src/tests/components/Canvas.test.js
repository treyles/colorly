import React from 'react';
import { shallow } from 'enzyme';
import { Canvas } from '../../components/Canvas';

describe('Canvas', () => {
  const props = {
    addColorToPalette: jest.fn(),
    imageSource: {}
  };

  beforeAll(() => {
    Canvas.prototype.componentDidMount = null;
  });

  it('renders correctly', () => {
    const component = shallow(<Canvas {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('sets winWidth and winHeight state on browser resize', () => {
    const component = shallow(<Canvas {...props} />);
    global.innerWidth = 444;
    global.innerHeight = 333;
    component.instance().updateBrowserSize();
    expect(component.state().winWidth).toEqual(444);
    expect(component.state().winHeight).toEqual(333);
  });

  it('returns optimized width and height based on window dimensions', () => {
    const component = shallow(<Canvas {...props} />);
    component.setState({
      winWidth: 800,
      winHeight: 600
    });
    // mock image
    const initialImageSize = {
      width: 1024,
      height: 800
    };
    const result = component.instance().optimizeScale(initialImageSize);
    expect(result.width < 800).toEqual(true);
    expect(result.height < 600).toEqual(true);
  });

  it('calls "handleColorPreviewMove" on canvas move', () => {
    const spy = jest
      .spyOn(Canvas.prototype, 'handleColorPreviewMove')
      .mockImplementation(jest.fn());
    const component = shallow(<Canvas {...props} />);
    component.find('canvas').simulate('mousemove');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('calls "handleCanvasLeave" on canvas leave', () => {
    const spy = jest.spyOn(Canvas.prototype, 'handleCanvasLeave');
    const component = shallow(<Canvas {...props} />);
    component.find('canvas').simulate('mouseleave');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('calls "handleColorClick" on canvas click', () => {
    const spy = jest.spyOn(Canvas.prototype, 'handleColorClick');
    const component = shallow(<Canvas {...props} />);
    component.find('canvas').simulate('click');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });
});
