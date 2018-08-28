import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../components/Home';
import { googleAuth, twitterAuth } from '../../utils/base';

describe('Home', () => {
  let component;
  const props = {
    signIn: jest.fn()
  };

  beforeEach(() => {
    component = shallow(<Home {...props} />);
  });

  it('calls "signInUser" from App when Twitter button is clicked', () => {
    component.find('.twitter-login').simulate('click');
    expect(props.signIn).toHaveBeenCalled();
    props.signIn.mockClear();
  });

  it('calls "signInUser" from App when Google button is clicked', () => {
    component.find('.google-login').simulate('click');
    expect(props.signIn).toHaveBeenCalled();
    props.signIn.mockClear();
  });

  it('authorizes with twitterAuth when Twitter button is clicked', () => {
    component.find('.twitter-login').simulate('click');
    expect(props.signIn).toHaveBeenCalledWith(twitterAuth);
    props.signIn.mockClear();
  });

  it('authorizes with googleAuth when Google button is clicked', () => {
    component.find('.google-login').simulate('click');
    expect(props.signIn).toHaveBeenCalledWith(googleAuth);
    props.signIn.mockClear();
  });
});
