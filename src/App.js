import React, { Component } from 'react';
import './App.css';

import logo from './kusalogoblack.png';
import Score from './Components/Score/Score'
import Feedback from './Components/Feedback/Feedback'
import TakePhoto from './Components/TakePhoto/TakePhoto'
import {storage} from './Firebase';
import {database} from './Firebase';
class App extends Component {
  toHome() {
    this.setState({current_page: 'main_view'})
  }

  toHomeFromTakePhoto(data) {
    console.log('Returned from TakePhoto.')
    console.log(data)
    this.setState({current_page: 'main_view'})
  }

  toFeedback(categories=null) {
    console.log(categories)
    this.setState({
      current_page: 'feedback_view',
      current_categories: categories
    })    
  }

  toTakePhoto() {
    this.setState({current_page: 'take_photo_view'})
  }

  constructor(props) {
    super(props);
    var pictures = database.ref('pictures');
    var counter = 0;
    var top_five = [];
    pictures.on('value', function(snapshot) {
      //console.log(snapshot[snapshot.length -1].val())
    });
    this.state = {
      current_page: 'main_view',
      current_categories: {
        image : './kusalogoblack.png',
          Paper_Saving: {
            score: 100,
            suggestion:"No usage of disposable paper is detected in this image.",
          },
          Water_Saving: {
            score: 100,
            suggestion:"No wastage of water is detected in this image.",
          },
          Energy_Saving: {
            score: 100,
            suggestion:"No wastage of energy is detected in this image.",
          },
          Garbage_collection: {
            score: 100,
            suggestion:"No litter is detected in this image",
          },
          Disposable_product_saving: {
            score: 100,
            suggestion:"No usage of disposable product is detected in this image.",
          },
      },
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
        <Feedback callBack={this.toHome} categories={this.state.current_categories} />
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