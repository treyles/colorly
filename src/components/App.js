import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth, demoRef } from '../utils/base';
import PaletteBuild from './PaletteBuild';
import Library from './Library';
import Home from './Home';
import NotFound from './NotFound';
import { fetchUser, fetchLibrary, addCard } from '../actions';

class App extends React.Component {
  // TODO: refactor, needed?
  componentWillMount() {
    if (JSON.parse(localStorage.getItem('authenticated'))) {
      this.props.fetchUser(true);
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.props.fetchUser(currentUser);

      // if logged in
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
          <Route
            exact
            path="/"
            render={({ history }) =>
              !currentUser ? <Home /> : <Library history={history} />}
          />
          <Route
            path="/palettebuild"
            render={({ history }) =>
              !currentUser ? (
                <Home />
              ) : (
                <PaletteBuild
                  history={history}
                  addCardToLibrary={this.addCardToLibrary}
                />
              )}
          />
          <Route
            render={({ history }) => <NotFound history={history} />}
          />
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
  fetchLibrary,
  addCard
})(App);
