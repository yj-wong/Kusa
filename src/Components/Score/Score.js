import React, { Component } from 'react';
import './Score.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Feedback from '../Feedback/Feedback.js';
import App from '../../App.js';

class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page: 'score_view',
    };
    this.toFeedback = this.toFeedback.bind(this);
    this.toHome = this.toHome.bind(this);

    console.log('[] [] []')
    console.log(props.category_detail)
  }

  toFeedback() {  
    this.setState({current_page: 'feedback_view'})
  }

  toHome() {
    this.setState({current_page: 'main_view'})
    console.log(11)
  }

  render() {
    let final_view = undefined;
    if (this.state.current_page == 'score_view') {
      final_view = (<div className="Score">
      <svg height="300" width="300">
        <circle cx="150" cy="150" r="100" stroke="#51c5cf" strokeWidth="3" fill="transparent" />
        <text x="50%" y="50%" textAnchor="middle" stroke="#51c5cf" strokeWidth="2px" fontSize="75px" fill="white" dy=".3em">{this.props.category_detail.score}%</text>
        Sorry, your browser does not support inline SVG.  
      </svg> 
      <header className="Score-header">
        <p>{this.props.category_detail.suggestion}</p>
        <a href={this.props.category_detail.link}><p>{this.props.category_detail.link}</p></a>
      </header>
        <div className="button-group">
          <div><button onClick={this.toFeedback}>Overall Suggestion</button></div>     
          <div><button className="homebtn" onClick={this.share}>Share</button></div>
          <div><button className="homebtn" onClick={this.toHome}>Home</button></div>
        </div>
    </div>)
    } else if (this.state.current_page == 'feedback_view') {
      final_view = (
      <Feedback onClick={this.toHome} categories={this.props.categories}/>
      )
    } else if (this.state.current_page == 'main_view') {
      final_view = (
      <App/>
      )
    }
    return (
      final_view
    );
  }
}

export default Score;
