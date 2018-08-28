import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../components/Home';
import { googleAuth, twitterAuth } from '../../utils/base';

describe('Home', () => {
  const props = {
    signIn: jest.fn()
  };

  it('calls "signInUser" from App when Twitter button is clicked', () => {
    const component = shallow(<Home {...props} />);
    component.find('.twitter-login').simulate('click');
    expect(props.signIn).toHaveBeenCalled();
    props.signIn.mockClear();
  });

  it('calls "signInUser" from App when Google button is clicked', () => {
    const component = shallow(<Home {...props} />);
    component.find('.google-login').simulate('click');
    expect(props.signIn).toHaveBeenCalled();
    props.signIn.mockClear();
  });

  it('authorizes with twitterAuth when Twitter button is clicked', () => {
    const component = shallow(<Home {...props} />);
    component.find('.twitter-login').simulate('click');
    expect(props.signIn).toHaveBeenCalledWith(twitterAuth);
    props.signIn.mockClear();
  });

  it('authorizes with googleAuth when Google button is clicked', () => {
    const component = shallow(<Home {...props} />);
    component.find('.google-login').simulate('click');
    expect(props.signIn).toHaveBeenCalledWith(googleAuth);
    props.signIn.mockClear();
  });
});
