import React, { Component } from 'react';
import './App.css';

class App extends Component {
  toScan() {
    alert("scan");
  }

  toFeedback() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Greetings
        </header>
        <div className="buttons">
        <button onClick={this.toScan}>
        Start Scanning
        </button>
        </div>
      </div>
    );
  }
}

export default App;
