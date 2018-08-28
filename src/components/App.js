import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../utils/base';
import PaletteBuild from './PaletteBuild';
import Library from './Library';
import Home from './Home';
import NotFound from './NotFound';
import { fetchUser, fetchLibrary } from '../actions/';

class App extends React.Component {
  // TODO: figure out another method?
  componentWillMount() {
    if (JSON.parse(localStorage.getItem('authenticated'))) {
      this.props.fetchUser(true);
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.props.fetchUser(currentUser);
      if (currentUser) {
        this.props.fetchLibrary(currentUser.uid);
        localStorage.setItem('authenticated', true);
      }
    });
  }

  render() {
    const { currentUser } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={currentUser ? Library : Home} />
          <Route
            path="/palettebuild"
            component={currentUser ? PaletteBuild : Home}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.defaultProps = {
  currentUser: null
};

App.propTypes = {
  currentUser: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  fetchUser: PropTypes.func.isRequired,
  fetchLibrary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps, {
  fetchUser,
  fetchLibrary
})(App);
