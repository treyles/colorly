import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/Home';
import App from '../../components/App';
import { googleAuth, twitterAuth } from '../../utils/base';

describe('Home', () => {
  it('calls "signInUser" from App when Twitter button is clicked', () => {
    const spy = jest.spyOn(App.prototype, 'signInUser');
    const component = shallow(<Home signInUser={spy} />);

    component.find('.twitter-login').simulate('click');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('calls "signInUser" from App when Google button is clicked', () => {
    const spy = jest.spyOn(App.prototype, 'signInUser');
    const component = shallow(<Home signInUser={spy} />);

    component.find('.google-login').simulate('click');
    expect(spy).toHaveBeenCalled();
    spy.mockClear();
  });

  it('authorizes with twitterAuth when Twitter button is clicked', () => {
    const spy = jest.spyOn(App.prototype, 'signInUser');
    const component = shallow(<Home signInUser={spy} />);

    component.find('.twitter-login').simulate('click');
    expect(spy).toHaveBeenCalledWith(twitterAuth);
    spy.mockClear();
  });

  it('authorizes with googleAuth when Google button is clicked', () => {
    const spy = jest.spyOn(App.prototype, 'signInUser');
    const component = shallow(<Home signInUser={spy} />);

    component.find('.google-login').simulate('click');
    expect(spy).toHaveBeenCalledWith(googleAuth);
    spy.mockClear();
  });
});
