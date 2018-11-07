pragma solidity ^0.4.24;


contract TestEventEmits {
  event AddressEvent(address _address);
  event Counter(uint _count);
  
  uint public count;
  
  constructor() public {
    count = 0;
  }
  
  function trigger() external {
    emit AddressEvent(msg.sender);
  }
    
  function increment() external {
    count++;
    emit Counter(count);
  }
}
