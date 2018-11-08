import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';

// Contract
import eventTester from './eventTester';

const web3 = new Web3(window.web3.currentProvider);
console.log('web3', web3);

class App extends Component {
  state = {
    count: 0,
    accounts: []
  }
  async componentDidMount() {
    console.log(eventTester);
    const count = await eventTester.methods.count().call();
    this.setState({ count });
    console.log(web3.eth);

    const accounts = await web3.eth.getAccounts();
    console.log('acc', accounts);
    this.setState({ accounts })
    // const events = eventTester.events.allEvents({fromBlock: 0, toBlock: "latest"}, (err, logs) => {
    //   if (err) {
    //     console.log('err', err);
    //   }
    //   console.log('logs', logs);
    // });
    eventTester.events.Counter({}, {fromBlock: "0", toBlock: "latest"}, async (error, result) => {
      if(!error) {
        console.log('result', result)
        const count = await eventTester.methods.count().call();
        this.setState({ count });
      } else {
        console.log('err', error)
      }
    });
  }

  increment = () => {
    eventTester.methods.increment().send({
      from: this.state.accounts[0],
      gas: '300000'
    });
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
            <button onClick={() => this.increment()} className="btn btn-primary">Call Counter Emitter</button>
            <p>Count: {this.state.count}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
