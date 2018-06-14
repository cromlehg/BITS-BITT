pragma solidity ^0.4.18;

import './ownership/Ownable.sol';
import './BITTToken.sol';
import './BITZToken.sol';

contract Configurator is Ownable {

  CommonToken public bittToken;

  CommonToken public bitzToken;

  function Configurator() public onlyOwner {
    address manager = 0x8fD94be56237EA9D854B23B78615775121Dd1E82;

    bittToken = new BITTToken();
    bittToken.addWallet(0x86B2B3cF570BFE0a87f3BC41F1c4C3A0b3750D10, 60);
    bittToken.addWallet(0xaa8ed6878a202eF6aFC518a64D2ccB8D73f1f2Ca, 20);
    bittToken.addWallet(0x093A89bDb5CE905fecb6272ff3ac92f53350a79A, 10);
    bittToken.addWallet(0x24a7774d0eba02846580A214eeca955214cA776C, 5);
    bittToken.addWallet(0x470a2D1105EaE6aAe879623357F615Ab9cbf906E, 3);
    bittToken.addWallet(0x8Ba7Aa817e5E0cB27D9c146A452Ea8273f8EFF29, 2);
    bittToken.init();
    bittToken.transferOwnership(manager);

    bitzToken = new BITZToken();
    bitzToken.addWallet(0xebbC6Bf9a22f27b0c2eB80C0BC5e4a965efFdb65, 60);
    bitzToken.addWallet(0x093A89bDb5CE905fecb6272ff3ac92f53350a79A, 20);
    bitzToken.addWallet(0x50c8172253270C06789B6437D5423CBba663B667, 20);
    bitzToken.init();
    bitzToken.transferOwnership(manager);
  }

}

