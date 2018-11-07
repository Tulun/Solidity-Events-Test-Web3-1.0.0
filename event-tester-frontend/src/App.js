import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 text-center">
            <button className="btn btn-primary">Call Address Emitter</button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 text-center">
            <button className="btn btn-primary">Call Counter Emitter</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
