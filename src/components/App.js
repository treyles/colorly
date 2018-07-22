import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Upload from './Upload';
import Library from './Library';

const testData = [
  {
    url:
      'https://firebasestorage.googleapis.com/v0/b/colorly-44942.appspot.com/o/images%2Fa8140b0e-748a-4a8d-a9fe-91324f4174c5?alt=media&token=5ca4aef7-31cd-4389-b5f5-45da4292f057',
    palette: {
      color1: '#37BEB7'
    },
    title: 'Single Color',
    id: 'a8140b0e-748a-4a8d-a9fe-91324f4174c5'
  },
  {
    url:
      'https://firebasestorage.googleapis.com/v0/b/colorly-44942.appspot.com/o/images%2F2ec38480-3daf-4c9e-8a68-f2d9de46f6cb?alt=media&token=a8e97814-1650-48d7-9860-690fc936ecf5',
    palette: {
      color1: '#126794',
      color2: '#F8AC8E',
      color3: '#EF6868',
      color4: '#F2C61B',
      color5: '#DDDDDD'
    },
    title: 'Abstract Drawing',
    id: '2ec38480-3daf-4c9e-8a68-f2d9de46f6cb'
  },
  {
    url:
      'https://firebasestorage.googleapis.com/v0/b/colorly-44942.appspot.com/o/images%2F0917631b-26f3-46a3-804c-f5ecc1355e39?alt=media&token=d0e2052a-d3f8-4fbc-b430-b7ae259ed9f3',
    palette: {
      color1: '#49124B',
      color2: '#AE53A0',
      color3: '#F5966A',
      color4: '#F04267'
    },
    title: 'Uber Illustration Style',
    id: '0917631b-26f3-46a3-804c-f5ecc1355e39'
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
