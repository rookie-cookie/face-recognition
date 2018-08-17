import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        { /*
        
        <ImageLinkForm />
        <FaceRecognition /> */
        }
      </div>
    );
  }
}

export default App;
