import React, { Component } from 'react';
import './Feedback.css';
import home from './Hotel-suite-living-room.jpg';
import logo from './kusalogoblack.png';
import Score from '../Score/Score';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {

        items: [
          { type: 'plastic bottles', score: 3, suggestion: "", id: 1 },
          { type: 'running water faucet', score: 1, suggestion: "", id: 2 }
        ]
      }
    }

    getScore() {

    }


    
    render() {
        return (
            <div className="Feedback">
                <img src={logo} alt="logo" width="60%"/>
                <header className="Feedback-header">
                    Items Recognized:
                </header>
                <div className="items"> 
                    <Items items={this.state.items}/>
                </div>
                <div>
                    <button onClick={this.toOverall}>Get Overall Score</button>
                </div>
                <div>
                    <button onClick={this.props.callBack}>Home</button>
                </div>
            </div>           
        );
    }
}


// function Items(props) {
//     const items = props.items;

//     const itemList = items.map((item) => {
//         <div className="item">
//             <div>Type: { item.type }</div>
//             <div>Amount: { item.amount }</div>
//         </div>
//     });
            
//     return(
//         <div className="item-list">
//         { itemList }
//         </div>
//     );
// }

class Items extends Component {

    constructor(props){
        super(props);

    }

    toDetail(){
        
    }
    

    render() {
        const items = this.props.items;
        const itemList = items.map(item => {
            return( 
                <div className="item" key={item.id}>
                    <p>{ item.type }</p>
                    <p>Score: { item.score }</p>
                    <button onClick={this.toDetail}>Details</button>
                </div>
            )
        })
            
        return(
            <div className="item-list">
            { itemList }
            </div>
        )
        // return(
        //     <p>there should be something</p>
        //     )
    }
}

export default Feedback;