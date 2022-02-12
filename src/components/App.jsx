import './App.css';
import Player from './player';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'


library.add(faPlay, faPause)


class App extends React.Component {
    render() {
      const manifestUrl = "/assets/audio/3_cadence/ManifestoEstranha-Vozes.ogg"
      return (
        <div className="App">
          <Player url={manifestUrl} />
        </div>
      );
    }
}

export default App;
