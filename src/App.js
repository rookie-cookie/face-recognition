import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import Rank from './components/Rank/Rank.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from  './components/FaceRecognition/FaceRecognition.js'
import SignIn from './components/SignIn/SignIn.js'
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
      imageUrl: '', 
      box: {},
      route: 'signin'
    }
  }
  
  //calculate face location based on the input
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);

    //this will fill the box state
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  //event listerners with states

  onRouteChange = (route) => {
    this.setState ({route: route});
  }

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
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />

        <Navigation onRouteChange={this.onRouteChange} />
        
        {/* if statement if signed in or not */ }
        
        { this.state.route === 'signin' 
        ? <SignIn onRouteChange={this.onRouteChange}/> 
        : <div> 
            <Logo /> 
            <Rank />           
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />     
            { 
            /*add face recognition function using Clarifai Face Recognition API 
              display the image under the form
              display face box
            */
            }
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/> 
          </div>
        }
      </div>
    );
  }
}

export default App;
