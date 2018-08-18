import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from  './components/FaceRecognition/FaceRecognition.js'
import Rank from './components/Rank/Rank.js'
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

// install the npm version of clarifai
const app = new Clarifai.App({
  apiKey: '41bc4a5ace4b466781b5eef67d5ea78f'
})


const particlesOptions = {
  particles: {
    number: {
      value: 30, 
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  
  //detect user input - STATES
  //create a state so that the app knows what the user enters
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }
  
  //event listerners with states
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    //then pass this on to the facerecognition
    this.setState ({imageUrl: this.state.input});
    
    // CLARIFAI API 
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(
    function(response) {
        // do something with response
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
       // there was an error
       console.log(err);
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />

        <Navigation />
        <Logo />
        <Rank />
        
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />     
        { 
        /*add face recognition function using Clarifai Face Recognition API 
          display the image under the form
        */
        }

        <FaceRecognition imageUrl={this.state.imageUrl}/>
        
        
      </div>
    );
  }
}

export default App;
