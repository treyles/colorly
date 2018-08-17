import React from 'react';
import { shallow, mount } from 'enzyme';
import DropZoneContent from '../../components/DropZoneContent';

describe('DropZoneContent', () => {
  const props = {
    imageAlert: false,
    handleImageDrop: jest.fn()
  };

  it('renders correctly', () => {
    const component = shallow(<DropZoneContent {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders alert message based on imageAlert', () => {
    const component = mount(<DropZoneContent {...props} />);

    component.setProps({
      imageAlert: 'test alert'
    });

    expect(component.find('label h1').text()).toEqual('test alert');
  });
});
