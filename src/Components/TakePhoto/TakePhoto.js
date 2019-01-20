import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES} from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css';
import './TakePhoto.css';
import {storage} from '../../Firebase';
import {database} from '../../Firebase';

class TakePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
          image: null,
          url: '',
          progress: 0
        }
        this.handleChange = this.handleChange.bind(this);
       
        

        this.onTakePhoto = this.onTakePhoto.bind(this);
    }
    handleChange = e => {
      if (e.target.files[0]) {
        const image = e.target.files[0];
        this.setState(() => ({image}));
      }
    }
    dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);
  
      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
  
      return new Blob([ia], {type:mimeString});
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
        
        console.log(data)
        var  category =  {
          image : null,
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
        }
       
       
        var allData = data.responses[0].webDetection.webEntities;
        console.log(allData)
        var allDescriptions = []
        for (var i = 0; i < allData.length; i++) {
          allDescriptions.push(allData[i].description);
        }  

        var water_list = [
          'Water', 'Water fixture', 'Tap', 'Tap water', 'Plumbing', 'Plumbing fixture', 'Drop', 'Fountain', 'Fluid', 'Faucet'
        ]
        
        var energy_list = [
          'Light', 'Electricity', 'Lamp', 'Electronics', 'Bulb', 'Light bulb', 'Lighting', 'Light fixture'  
        ]

        var paper_list = [
          'Paper', 'Napkin', 'Tissue', 'Paper product', 'Scrap paper'
        ]

        var disposable_list = [
          'Can', 'Drink', 'Bottle', 'Beverage', 'Alchoholic beverages', 'Energy drink', 'Soda', 'Fizzy drink',
          'Aluminum can', 'Tin can', 'Aluminum', 'Tin', 'Product',
          'Plastic', 'Plastic Spoon', 'Plate', 'Tableware', 'Serveware', 'Dishware',
          'Paper cup', 'Food container', 'Food storage container','Container', 'Polysterene', 
        ]

        var garbage_list = [
          'Trash', 'Garbage', 'Rubbish', 'Waste', 'Litter', 'Pollution', 'Plastic', 'Scrap', 'Recycling', 'Plastic'
        ]

        console.log(allDescriptions)
        // Water waste
        for (i = 0; i < water_list.length; i++) {
          if (allDescriptions.includes(water_list[i])) {
            category.Water_Saving.score -= 10 ;
            category.Water_Saving.suggestion = "You are wasting water, please make sure you turn off the tap. Please take a moment and read the following article: "
            category.Water_Saving.link = "https://www.forbes.com/sites/quora/2016/07/19/why-wasting-water-is-a-much-bigger-problem-than-you-think/#27707df5af2e"
          }
        }

        
        //Energy waste
        for (i = 0; i < energy_list.length; i++) {
          if (allDescriptions.includes(energy_list[i])) {
            category.Energy_Saving.score -= 25 ;
            category.Energy_Saving.suggestion = "Please make sure the lights are turned off if the room is not used by anyone else. Please take a moment and read the following article: "
            category.Energy_Saving.link = "https://www.energy.gov/energysaver/save-electricity-and-fuel"
          }
        }

        //Paper waste
        for (i = 0; i < paper_list.length; i++) {
          if (allDescriptions.includes(energy_list[i])) {
            category.Paper_Saving.score -= 10 ;
            category.Paper_Saving.suggestion = "You are using disposable paper product, please avoid using these if possisble to conserve our forest. Please take a moment and read the following article: "
            category.Paper_Saving.link = "http://www.theworldcounts.com/stories/Environmental_Impact_of_Paper_Production"
          }
        }

        //disposible utensils
        for (i = 0; i < disposable_list.length; i++) {
          if (allDescriptions.includes(disposable_list[i])) {
            category.Disposable_product_saving.score -= 15 ;
            category.Disposable_product_saving.suggestion = "You should stop using disposable products and please make sure they are all recycled. Please take a moment and read the following article: "
            category.Disposable_product_saving.link = "https://www.dawn.com/news/1052157"
          }
        }
        //garbage collection
        for (i = 0; i < garbage_list.length; i++) {
          if (allDescriptions.includes(garbage_list[i])) {
            category.Garbage_collection.score -= 15 ;
            category.Garbage_collection.suggestion = "Garbage should be collected, but it seems they are not. Please take a moment and read the following article: "
            category.Garbage_collection.link = "https://www.linkedin.com/pulse/importance-waste-management-recycling-dee-mohammed/"
          }
        }
        
        console.log(data)
        console.log(category.Water_Saving.score)
        console.log(category.Energy_Saving.score)
        console.log(category.Paper_Saving.score)
        console.log(category.Disposable_product_saving.score)
        console.log(category.Garbage_collection.score)
         // Get a reference to the storage service, which is used to create references in your storage bucket
        var metadata = {
          contentType: 'image/jpeg',
        };
        var today = new Date();
        var cur_date_img= today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + " @ "  
        + today.getHours() + ":"  
        + today.getMinutes() + ":" 
        + today.getSeconds()+ '.jpg';
        // Upload the file and metadata
        var uploadTask = storage.ref(`images/` + cur_date_img).put(this.dataURItoBlob(dataUri));
        database.ref('pictures/' + cur_date_img.replace(".jpg","")).set({
          cur_date_img : (category.Water_Saving.score + category.Energy_Saving.score + category.Garbage_collection.score + category.Paper_Saving.score + category.Disposable_product_saving.score ) / 5
          
        });
        uploadTask.on('state_changed', 
          (snapshot) => {
          // progrss function ....
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({progress});
          }, 
          (error) => {
            // error function ....
            console.log(error);
          }, 
        () => {
            // complete function ....
            storage.ref('images').child(cur_date_img).getDownloadURL().then(url => {
              console.log(url);
              category.image = url;
              this.setState({url});
              this.props.callBack(category)
            })
        });
       

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