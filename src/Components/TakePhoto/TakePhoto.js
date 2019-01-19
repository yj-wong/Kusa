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
        console.log(123)
        return res.json()
      }).then((data) => {
        this.props.callBack(data)
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