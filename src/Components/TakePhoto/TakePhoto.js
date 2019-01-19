import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES} from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css';
import './TakePhoto.css';

class TakePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
        

        };
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
        // Send the data to API and then use Vision Cloud API to process the image prediction.
        console.log('takePhoto');
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