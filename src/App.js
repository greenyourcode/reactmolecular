import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MoleculeSet from './Components/MoleculeSet'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            This is my molecule application.
          </p>
        </header>
        <MoleculeSet />
      </div>
    );
  }
}

export default App;
