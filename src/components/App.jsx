import './App.css';
import Player from './player';
import React from 'react';

class App extends React.Component {
    render() {
      const manifestUrl = "https://raw.githubusercontent.com/jcezarms/strangers/master/assets/audio/3_cadence/ManifestoEstranha-Vozes.ogg"

        return (
          <div className="App">
            <Player url={manifestUrl} />
          </div>
        );
    }
}

export default App;
