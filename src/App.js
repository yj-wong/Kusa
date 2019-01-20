import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import logo from './kusalogoblack.png';
import Score from './Components/Score/Score'
import Feedback from './Components/Feedback/Feedback'
import TakePhoto from './Components/TakePhoto/TakePhoto'

class App extends Component {
  toHome() {
    this.setState({current_page: 'main_view'})
  }

  toHomeFromTakePhoto(data) {
    console.log('Returned from TakePhoto.')
    console.log(data)
    this.setState({current_page: 'main_view'})
  }

  toFeedback(data=undefined) {
    console.log(data)
    this.setState({current_page: 'feedback_view'})    
  }

  toTakePhoto() {
    this.setState({current_page: 'take_photo_view'})
  }

  constructor(props) {
    super(props);
    this.state = {
      current_page: 'main_view',
    };

    this.toHome = this.toHome.bind(this);
    this.toFeedback = this.toFeedback.bind(this);
    this.toTakePhoto = this.toTakePhoto.bind(this);
  }


  render() {

    let final_view = undefined    
    if (!this.state) {
      final_view = <div />
    } else if (this.state.current_page == 'main_view') {
      final_view = (
        <div className="App">
         <img src={logo} alt="logo" width="60%"/>
          <header className="App-header">
            <p>Our daily habits may affect the environment in ways that we might not notice.</p>
            <p>Start Scanning to learn more about your habits.</p>
          </header>
          <div>
            <button onClick={this.toTakePhoto}>Start Scanning</button>
          </div>
          <div>
            <button onClick={this.toFeedback}>Get Feedback</button>
          </div>
        </div>
      );
    } else if (this.state.current_page == 'take_photo_view') {
      final_view = (
        <TakePhoto callBack={this.toFeedback} />
      );
    } else if (this.state.current_page == 'feedback_view') {
      final_view = (
        <Feedback callBack={this.toHome} />
      );
    } else {
      console.log('Something went wrong.')
      final_view = <div />
    }

    return (
      final_view
    );
  }
}

//export default withRouter(App);
export default App;
