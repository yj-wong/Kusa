import React, { Component } from 'react';
import './Feedback.css';
import home from './Hotel-suite-living-room.jpg';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {

        items: [
          { type: 'plastic bottles', amount: 3, id: 1 },
          { type: 'running water faucet', amount: 1, id: 2 }
        ]
      }
    }

    getScore() {

    }

    
    render() {
        return (
            <div className="Feedback">
                <img src={home} alt="home" width="60%"/>
                <header className="Feedback-header">
                    Items Recognized:
                </header>
                <div className="items"> 
                    <Items items={this.state.items}/>
                </div>
                <div>
                    <button onClick={this.toOverall}>Get Overall Feedback</button>
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
    

    render() {
        const items = this.props.items;
        const itemList = items.map(item => {
            return( 
                <div className="item" key={item.id}>
                <div>Type: { item.type }</div>
                <div>Amount: { item.amount }</div>
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