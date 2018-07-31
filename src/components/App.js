import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { storage, auth, rebase, database } from '../utils/base';
import Upload from './Upload';
import Library from './Library';
import Home from './Home';
import NotFound from './NotFound';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      library: [],
      loading: true,
      isNewUser: false
    };

    this.refresh = JSON.parse(localStorage.getItem('authenticated'));
    this.addCardToLibrary = this.addCardToLibrary.bind(this);
    this.deleteCardFromLibrary = this.deleteCardFromLibrary.bind(this);
    this.signInUser = this.signInUser.bind(this);
    this.closeNewUserDialog = this.closeNewUserDialog.bind(this);
    this.addDemoPalettes = this.addDemoPalettes.bind(this);
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
      asArray: true,
      then() {
        this.setState({ loading: false });
      }
    });
  }

  signInUser(provider) {
    auth
      .signInWithPopup(provider)
      .then(result => {
        this.setState({
          isNewUser: result.additionalUserInfo.isNewUser
        });
      })
      .catch(error => console.log(error));
  }

  addCardToLibrary(obj) {
    const { library } = this.state;
    this.setState({
      library: [obj].concat(library)
    });
  }

  deleteCardFromLibrary(obj) {
    const { library, currentUser } = this.state;
    const storageRef = storage.ref(`users/${currentUser.uid}/${obj.id}`);
    storageRef.delete();

    this.setState({
      library: library.filter(el => el !== obj)
    });
  }

  addDemoPalettes() {
    database
      .ref('demo/')
      .once('value')
      .then(snapshot =>
        this.setState({
          library: snapshot.val()
        })
      );

    this.closeNewUserDialog();
  }

  closeNewUserDialog() {
    this.setState({ isNewUser: false });
  }

  render() {
    const { library, currentUser, loading, isNewUser } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={({ history }) =>
              !currentUser ? (
                <Home signInUser={this.signInUser} />
              ) : (
                <Library
                  library={library}
                  currentUser={currentUser}
                  deleteCardFromLibrary={this.deleteCardFromLibrary}
                  loading={loading}
                  isNewUser={isNewUser}
                  closeNewUserDialog={this.closeNewUserDialog}
                  history={history}
                  addDemoPalettes={this.addDemoPalettes}
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
                  currentUser={currentUser}
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
