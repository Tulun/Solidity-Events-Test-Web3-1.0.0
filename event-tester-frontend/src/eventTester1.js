import Web3 from 'web3';
import address from './address';

const web3 = new Web3(window.web3.currentProvider);
const abi = [{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"trigger","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"increment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_address","type":"address"}],"name":"AddressEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_count","type":"uint256"}],"name":"Counter","type":"event"}]

// Access to our contract that exists on the blockchain.
export default new web3.eth.Contract(abi, address);
