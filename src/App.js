/*------------ App.js -------*/
import React, { Component } from 'react';
import "./App.css";
import Team from './container/Teams'

class App extends Component {
  render(){
    return (
      <div className="App">
        <Team/>
      </div>
    );
  }
  }

export default App;