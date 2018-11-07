import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';

// Contract
import eventTester from './eventTester';

const web3 = new Web3(window.web3.currentProvider);

class App extends Component {
  async componentDidMount() {
    console.log(eventTester);
  }

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
