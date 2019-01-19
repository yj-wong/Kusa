import React, { Component } from 'react';
import './Score.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Score extends Component {
  toScan() {
  }

  render() {
    return (
      <div className="Score">
        <svg height="300" width="300">
          <circle cx="150" cy="150" r="100" stroke="#51c5cf" stroke-width="3" fill="transparent" />
          <text x="50%" y="50%" text-anchor="middle" stroke="#51c5cf" stroke-width="2px" font-size="75px" fill="white" dy=".3em">52%</text>
          Sorry, your browser does not support inline SVG.  
        </svg> 
        <header className="Score-header">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </header>

        <div>
          <button onClick={this.toFeedback}>Overall Suggestion</button>
        </div>
        <div>
          <button className="homebtn" onClick={this.share}>Share</button>
        </div>
        <div>
          <button ClassName="homebtn" onClick={this.toHome}>Back</button>
        </div>
      </div>
    );
  }
}

export default Score;
