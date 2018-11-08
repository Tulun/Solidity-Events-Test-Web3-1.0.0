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
    accounts: [],
    addresses: []
  }
  async componentDidMount() {
    console.log(eventTester);
    const count = await eventTester.methods.count().call();
    this.setState({ count });

    const accounts = await web3.eth.getAccounts();
    console.log('acc', accounts);
    this.setState({ accounts });

    // Set up watch for Counter;
    // eventTester.events.Counter({}, {fromBlock: `0`, toBlock: "latest"}, async (error, result) => {
    //   if(!error) {
    //     console.log('result', result)
    //     const count = await eventTester.methods.count().call();
    //     this.setState({ count });
    //   } else {
    //     console.log('err', error)
    //   }
    // });

    // eventTester.events.AddressEvent({}, {fromBlock: `${currentBlockNumber}`, toBlock: "latest"}, async (error, result) => {
    //   if(!error) {
    //     console.log('result', result)
    //     this.setState({ addresses: [...this.state.addresses, result.returnValues[0]] });
    //   } else {
    //     console.log('err', error)
    //   }
    // })

    const currentBlockNumber = await web3.eth.getBlockNumber();

    eventTester.events.allEvents({fromBlock: `0`, toBlock: "latest"}, async (error, result) => {
      if(!error) {
        console.log('result', result);
        if (result.event === "AddressEvent" && result.blockNumber >= currentBlockNumber) {
          this.setState({ addresses: [...this.state.addresses, result.returnValues[0]] });
        };

        if (result.event === "Counter") {
          const count = await eventTester.methods.count().call();
          this.setState({ count });
        }
      } else {
        console.log('err', error)
      }
    })
  }

  increment = () => {
    eventTester.methods.trigger().send({
      from: this.state.accounts[0],
      gas: '300000'
    });
  }

  emitAddress = () => {
    eventTester.methods.trigger().send({
      from: this.state.accounts[0],
      gas: "300000"
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 text-center">
            <h2>Testing Events</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 text-center">
            <button onClick={() => this.emitAddress()} className="btn btn-primary">Call Address Emitter</button>
            <ul className="list-group">
              { this.state.addresses.length ? this.state.addresses.map( (address, index) => {
                return (
                  <li className="list-group-item" key={index}>
                    {address}
                  </li>
                )
              }) : null}
            </ul>
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
