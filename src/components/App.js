import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { storage, auth, rebase } from '../utils/base';
import Upload from './Upload';
import Library from './Library';
import Home from './Home';
import NotFound from './NotFound';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      library: []
    };

    this.refresh = JSON.parse(localStorage.getItem('authenticated'));
    this.addCardToLibrary = this.addCardToLibrary.bind(this);
    this.deleteCardFromLibrary = this.deleteCardFromLibrary.bind(this);
  }

  // if previously logged in, prevent homepage from momentarily appearing on refresh
  componentWillMount() {
    if (this.refresh) {
      this.setState({ currentUser: true });
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });

      // if logged in
      if (currentUser) {
        this.syncRebase();
        localStorage.setItem('authenticated', true);
      }
    });
  }

  syncRebase() {
    const { currentUser } = this.state;

    rebase.syncState(`users/${currentUser.uid}`, {
      context: this,
      state: 'library',
      asArray: true
      // then() {
      //   this.setState({ loading: false });
      // }
    });
  }

  addCardToLibrary(obj) {
    const { library } = this.state;
    this.setState({
      library: [obj].concat(library)
    });
  }

  deleteCardFromLibrary(obj) {
    const { library } = this.state;
    const storageRef = storage.ref(`images/${obj.id}`);
    storageRef.delete();

    this.setState({
      library: library.filter(el => el !== obj)
    });
  }

  render() {
    const { library, currentUser } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              !currentUser ? (
                <Home />
              ) : (
                <Library
                  library={library}
                  currentUser={currentUser}
                  deleteCardFromLibrary={this.deleteCardFromLibrary}
                />
              )}
          />
          <Route
            path="/upload"
            render={({ history }) =>
              !currentUser ? (
                <Home />
              ) : (
                <Upload
                  history={history}
                  addCardToLibrary={this.addCardToLibrary}
                  library={library}
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

// <div>
//   <Header />
// <Upload addCardToLibrary={this.addCardToLibrary} />
// </div>
