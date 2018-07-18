import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import PaletteCard from './PaletteCard';
import Upload from './Upload';
import Library from './Library';
// import Header from './Header';
// import { rebase, auth, database } from '../utils/base';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      library: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.addPaletteToLibrary = this.addPaletteToLibrary.bind(this);
  }

  handleClick() {
    this.setState({
      foo: !this.state.foo
    });
  }

  addPaletteToLibrary(obj) {
    const { library } = this.state;
    this.setState({
      library: [obj].concat(library)
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Library} />
          <Route
            path="/upload"
            render={({ history }) => (
              <Upload
                history={history}
                addPaletteToLibrary={this.addPaletteToLibrary}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

// <div>
//   <Header />
// <Upload addPaletteToLibrary={this.addPaletteToLibrary} />
// </div>
