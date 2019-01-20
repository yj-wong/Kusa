import React, { Component } from 'react';
import './Feedback.css';
import home from './Hotel-suite-living-room.jpg';
import logo from './kusalogoblack.png';
import Score from '../Score/Score';
import App from '../../App.js';

class Feedback extends Component {
    constructor(props) {
        super(props);
        console.log(props.categories.image);
        if(this.props.categories.image == null){
            this.props.categories.image = logo
        }
        var lst = undefined
        if (props.categories && props.categories.Paper_Saving) {
            lst = [
                { 
                    type: 'Paper Saving', 
                    score: props.categories.Paper_Saving.score, 
										suggestion: props.categories.Paper_Saving.suggestion, 
										link: props.categories.Paper_Saving.link
                },
                { 
                    type: 'Water Saving', 
                    score: props.categories.Water_Saving.score, 
										suggestion: props.categories.Water_Saving.suggestion, 
										link: props.categories.Water_Saving.link
                },
                { 
                    type: 'Energy Saving', 
                    score: props.categories.Energy_Saving.score, 
										suggestion: props.categories.Energy_Saving.suggestion, 
										link: props.categories.Energy_Saving.link
                },
                { 
                    type: 'Garbage Collection', 
                    score: props.categories.Garbage_collection.score, 
										suggestion: props.categories.Garbage_collection.suggestion, 
										link: props.categories.Garbage_collection.link
                },
                { 
                    type: 'Disposable Product', 
                    score: props.categories.Disposable_product_saving.score, 
										suggestion: props.categories.Disposable_product_saving.suggestion, 
										link: props.categories.Disposable_product_saving.link
                },
            ];
        } else {
            lst = [
                { 
                    type: ' Overall Feedback', 
                    score: 100, 
										suggestion: "Please talk to our Online Chat Bot or talk to our 24 hours Online Assistant:1234566", 
										link: null
                }
            ]
        }
        
        this.state = {
            current_page: 'feedback_view',
            items: lst,
            current_img: props.categories,
            category_detail: undefined
        }
        
        this.toOverall = this.toOverall.bind(this);
        this.toDetail = this.toDetail.bind(this);
        this.toHome = this.toHome.bind(this);
    }

    toOverall() {
        this.setState({current_page: 'score_view'})
    }

    toDetail(category){
        console.log(category)
        this.setState({
            category_detail: category,
            current_page: 'score_view'
        })
    }

    toHome() {
        this.setState({current_page: 'main_view'})
    }

    render() {
        let final_view = undefined    
        if (this.state.current_page == 'feedback_view') {
            final_view = (
                <div className="Feedback">
                    <img src={this.props.categories.image} alt="logo" width="60%"/>
                    <header className="Feedback-header">
                        Items Recognized:
                    </header>
                    <div className="items"> 
                        <Items items={this.state.items} callBack={this.toDetail}/>
                    </div>
                    <div>
                        <button onClick={this.toHome}>Home</button>
                    </div>
                </div>           
            ); 
        } else if (this.state.current_page == 'score_view') {
            final_view = (
                <Score callBack={this.toHome} categories={this.props.categories} category_detail={this.state.category_detail}/>
            );
        } else if (this.state.current_page == 'main_view') {
            final_view = (
                <App />
            );
        }
        else {
        console.log('Something went wrong.')
            final_view = <div />
        }
        return final_view;
    }

}
class Items extends Component {

    constructor(props){
        super(props);

    }
    

    render() {
        const items = this.props.items;
        const itemList = items.map(item => {
            return( 
                <div className="item" key={item.id}>
                    <p>{ item.type }</p>
                    <button onClick={() => this.props.callBack(item) } >Details</button>
                    <p className="scoretext">Score: { item.score }</p>
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