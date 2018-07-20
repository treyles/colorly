import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Upload from './Upload';
import Library from './Library';

const testData = [
  {
    url:
      'https://firebasestorage.googleapis.com/v0/b/colorly-44942.appspot.com/o/images%2F1b08f87e-5576-4cee-8c49-abb9b6bcd05d?alt=media&token=aec96bbe-344b-4cc1-8123-aabb0922a1ba',
    palette: {
      color1: 'rgba(3, 108, 119, 255)',
      color2: 'rgba(67, 142, 36, 255)',
      color3: 'rgba(139, 189, 54, 255)'
    },
    title: 'Island',
    id: '1b08f87e-5576-4cee-8c49-abb9b6bcd05d'
  },
  {
    url:
      'https://firebasestorage.googleapis.com/v0/b/colorly-44942.appspot.com/o/images%2F215c3dbc-e387-4ff8-8321-71e0b08e5cfe?alt=media&token=2d4a3b7a-743a-4f32-bd6d-43012c39c1bf',
    palette: {
      color1: 'rgba(240, 66, 103, 255)',
      color2: 'rgba(72, 17, 74, 255)',
      color3: 'rgba(174, 83, 160, 255)'
    },
    title: 'Uber Style Illustration',
    id: '215c3dbc-e387-4ff8-8321-71e0b08e5cfe'
  },
  {
    url:
      'https://firebasestorage.googleapis.com/v0/b/colorly-44942.appspot.com/o/images%2F9e81b65f-c524-4f2c-ba7c-5cae5bdcc866?alt=media&token=decdde99-a3a2-48aa-9a7d-373dd5c024a2',
    palette: {
      color1: 'rgba(14, 99, 145, 255)',
      color2: 'rgba(248, 172, 144, 255)',
      color3: 'rgba(0, 13, 21, 255)',
      color4: 'rgba(239, 95, 85, 255)',
      color5: 'rgba(246, 198, 23, 255)'
    },
    title: 'Abstract Painting',
    id: '9e81b65f-c524-4f2c-ba7c-5cae5bdcc866'
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
