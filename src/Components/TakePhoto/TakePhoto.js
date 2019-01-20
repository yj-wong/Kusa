import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES} from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css';
import './TakePhoto.css';

class TakePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
           


        };

        this.onTakePhoto = this.onTakePhoto.bind(this);
    }
    
    onCameraError (error) {
      console.error('onCameraError', error);
    }
   
    onCameraStart (stream) {
        //
      console.log('onCameraStart');
    }
   
    onCameraStop () {
      console.log('onCameraStop');
    }
    
    onTakePhoto (dataUri) {
      var image_content = dataUri.substring(dataUri.indexOf('base64,') + 7);
      fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDKektM6JoWOc5myBNz9rodeuYm58jbbVI', {
        method: 'POST',
        body: JSON.stringify({
          "requests": [
            {
              "features": [
                {
                  "type": "WEB_DETECTION"
                },
                {
                  "type": "LABEL_DETECTION"
                }
              ],
              "image": {
                "content": image_content
              }
            }
          ]
        })
      }).then((res) => {
        
        return res.json()
      }).then((data) => {
        var score = 100;
        console.log(data)
        var  category =  {
          Paper_Saving: {
            score: 100,
            suggestion:"",
          },
          Water_Saving: {
            score: 100,
            suggestion:"",
          },
          Energy_Saving: {
            score: 100,
            suggestion:"",
          },
          Garbage_collection: {
            score: 100,
            suggestion:"",
          },
          Disposable_product_saving: {
            score: 100,
            suggestion:"",
          },
        }
       
        var allData = data.responses[0].webDetection.webEntities;
        console.log(allData)
        var allDescriptions = []
        for (var i = 0; i < allData.length; i++) {
          allDescriptions.push(allData[i].description);
        }  
        // Water waste
        if(allData.includes("Water") && allData.includes("Tap") && !allData.includes("Person")){
            category.Water_Saving.score -= 10 ;
            category.Water_Saving.suggestion = "You are wasting water, please make sure you turn off the tap. Please take a moment and read the following article: https://www.forbes.com/sites/quora/2016/07/19/why-wasting-water-is-a-much-bigger-problem-than-you-think/#27707df5af2e"
        }
        //Energy waste
        if(allDescriptions.includes("Light") || allDescriptions.includes("Electricity") || allDescriptions.includes("Lamp") ||allDescriptions.includes("Electronics") ){
            category.Energy_Saving.score -= 25 ;
            category.Energy_Saving.suggestion = "Please make sure the lights are turned off if the room is not used by anyone else. Please take a moment and read the following article: https://www.energy.gov/energysaver/save-electricity-and-fuel"
 
        }

        //Paper waste
        if(allDescriptions.includes("Paper") || allDescriptions.includes("Cloth Napkins") ){
          category.Paper_Saving.score -= 5 ;
          category.Paper_Saving.suggestion = "You are using disposable paper product, please avoid using these if possisble to conserve our forest. Please take a moment and read the following article: http://www.theworldcounts.com/stories/Environmental_Impact_of_Paper_Production"

        }
        //disposible utensils
        if(allDescriptions.includes("Disposable") || allDescriptions.includes("Aluminum foil") || allDescriptions.includes("Aluminum Pans") ){
          category.Water_Saving.score -= 15 ;
          category.Water_Saving.suggestion = "You should stop using disposable products and please make sure they are all recycled. Please take a moment and read the following article: https://www.dawn.com/news/1052157"

        }
        //garbage collection
        if((allDescriptions.includes("Waste") || allDescriptions.includes("Garbage")) && !allDescriptions.includes("Garbage Can") ){
          category.Garbage_collection.score -= 15 ;
          category.Garbage_collection.suggestion = "Garbage should be collected, but it seems they are not. Please take a moment and read the following article: https://www.linkedin.com/pulse/importance-waste-management-recycling-dee-mohammed/"

        }
        
        console.log(data)
        console.log(score)
        
        this.props.callBack(this.prop.state)

      });
    }
   
    render () {
      return (
        <div className="TakePhoto">
          <Camera
            onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
            onCameraError = { (error) => { this.onCameraError(error); } }
            idealFacingMode = {FACING_MODES.ENVIRONMENT}
            idealResolution = {{width: 640, height: 480}}
            imageType = {IMAGE_TYPES.JPG}
            imageCompression = {0.97}
            isMaxResolution = {false}
            isImageMirror = {false}
            isDisplayStartCameraError = {true}
            sizeFactor = {1}
            onCameraStart = { (stream) => { this.onCameraStart(stream); } }
            onCameraStop = { () => { this.onCameraStop(); } }
          />
        </div>
      );
    }
}
     
    export default TakePhoto;