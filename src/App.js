import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './kusalogoblack.png';
import Feedback from './Feedback';
// using an ES6 transpiler, like babel

class App extends Component {
  toScan() {
  }

  render() {
    return (
      <div className="App">
       <img src={logo} alt="logo" width="60%"/>
        <header className="App-header">
          <p>Our daily habits may affect the environment in ways that we might not notice.</p>
          <p>Start Scanning to learn more about your habits.</p>
        </header>
        <div>
          <button onClick={this.toScan}>Start Scanning</button>
        </div>
        <div>
          <button onClick={this.toFeedback}>Get Feedback</button>
        </div>
      </div>
    );
  }
}

export default App;
