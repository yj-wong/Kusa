import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  toScan() {
  }

  render() {
    return (
      <div className="App">
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
