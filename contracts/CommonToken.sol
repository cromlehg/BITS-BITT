pragma solidity ^0.4.18;

import './token/StandardToken.sol';
import './WalletsPercents.sol';
import './ReceivingContractCallback.sol';

contract CommonToken is StandardToken, WalletsPercents {

  event Mint(address indexed to, uint256 amount);

  uint public constant PERCENT_RATE = 100;

  uint32 public constant decimals = 18;

  address[] public tokenHolders;

  bool public locked = false;

  mapping (address => bool)  public registeredCallbacks;

  mapping (address => bool) public unlockedAddresses;
  
  bool public initialized = false;

  function init() public onlyOwner {
    require(!initialized);
    totalSupply = 500000000000000000000000000;
    balances[this] = totalSupply;
    tokenHolders.push(this);
    Mint(this, totalSupply);
    unlockedAddresses[this] = true;
    unlockedAddresses[owner] = true;
    for(uint i = 0; i < wallets.length; i++) {
      address wallet = wallets[i];      
      uint amount = totalSupply.mul(percents[wallet]).div(PERCENT_RATE);
      balances[this] = balances[this].sub(amount);
      balances[wallet] = balances[wallet].add(amount);
      tokenHolders.push(wallet);
      Transfer(this, wallet, amount);
    }
    initialized = true;
  }

  modifier notLocked(address sender) {
    require(!locked || unlockedAddresses[sender]);
    _;
  }

  function transferOwnership(address to) public {
    unlockedAddresses[owner] = false;
    super.transferOwnership(to);
    unlockedAddresses[owner] = true;
  }

  function addUnlockedAddress(address addressToUnlock) public onlyOwner {
    unlockedAddresses[addressToUnlock] = true;
  }

  function removeUnlockedAddress(address addressToUnlock) public onlyOwner {
    unlockedAddresses[addressToUnlock] = false;
  }

  function unlockBatchOfAddresses(address[] addressesToUnlock) public onlyOwner {
    for(uint i = 0; i < addressesToUnlock.length; i++) unlockedAddresses[addressesToUnlock[i]] = true;
  }

  function setLocked(bool newLock) public onlyOwner {
    locked = newLock;
  }

  function transfer(address to, uint256 value) public notLocked(msg.sender) returns (bool) {
    tokenHolders.push(to);
    return processCallback(super.transfer(to, value), msg.sender, to, value);
  }

  function transferFrom(address from, address to, uint256 value) public notLocked(from) returns (bool) {
    tokenHolders.push(to);
    return processCallback(super.transferFrom(from, to, value), from, to, value);
  }

  function registerCallback(address callback) public onlyOwner {
    registeredCallbacks[callback] = true;
  }

  function deregisterCallback(address callback) public onlyOwner {
    registeredCallbacks[callback] = false;
  }

  function processCallback(bool result, address from, address to, uint value) internal returns(bool) {
    if (result && registeredCallbacks[to]) {
      ReceivingContractCallback targetCallback = ReceivingContractCallback(to);
      targetCallback.tokenFallback(from, value);
    }
    return result;
  }

}
