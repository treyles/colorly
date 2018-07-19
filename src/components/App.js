import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Upload from './Upload';
import Library from './Library';

const testData = [
  {
    url:
      'https://firebasestorage.googleapis.com/v0/b/colorly-44942.appspot.com/o/images%2F2f0d8ef9-b1b5-5410-f1a0-e570a55af453?alt=media&token=35a5a4ee-95be-4f91-a419-667ee6e3363b',
    palette: {
      color1: 'rgba(247, 173, 147, 255)',
      color2: 'rgba(36, 111, 153, 255)',
      color3: 'rgba(240, 204, 47, 255)',
      color4: 'rgba(239, 100, 99, 255)',
      color5: 'rgba(2, 10, 15, 255)'
    },
    title: 'Abstract Painting'
  }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: testData
    };

    this.addPaletteToLibrary = this.addPaletteToLibrary.bind(this);
  }

  addPaletteToLibrary(obj) {
    const { library } = this.state;
    this.setState({
      library: [obj].concat(library)
    });
  }

  render() {
    const { library } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Library library={library} />}
          />
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
