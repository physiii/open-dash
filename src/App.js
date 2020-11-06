import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const TAG = "[App.js]";

class App extends Component {
  render() {
		console.log(TAG, "!! HIT !!");
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React/Electron</h2>
        </div>
        <p className="App-intro">
          Hello Electron!
        </p>
      </div>
    );
  }
}

export default App;
