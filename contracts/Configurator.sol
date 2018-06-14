pragma solidity ^0.4.18;

import './ownership/Ownable.sol';
import './BITTToken.sol';
import './BITZToken.sol';

contract Configurator is Ownable {

  CommonToken public bittToken;

  CommonToken public bitzToken;

  function Configurator() public onlyOwner {
    address manager = 0xe99c8d442a5484bE05E3A5AB1AeA967caFf07133;

    bittToken = new BITTToken();
    bittToken.addWallet(0x08C32a099E59c7e913B16cAd4a6C988f1a5A7216, 60);
    bittToken.addWallet(0x5b2A9b86113632d086CcD8c9dAf67294eda78105, 20);
    bittToken.addWallet(0x3019B9ad002Ddec2F49e14FB591c8CcD81800847, 10);
    bittToken.addWallet(0x18fd87AAB645fd4c0cEBc21fb0a271E1E2bA5363, 5);
    bittToken.addWallet(0x1eC03A084Cc02754776a9fEffC4b47dAE4800620, 3);
    bittToken.addWallet(0xb119f842E6A10Dc545Af3c53ff28250B5F45F9b2, 2);
    bittToken.init();
    bittToken.transferOwnership(manager);

    bitzToken = new BITZToken();
    bitzToken.addWallet(0xc0f1a3E91C2D0Bcc5CD398D05F851C2Fb1F3fE30, 60);
    bitzToken.addWallet(0x3019B9ad002Ddec2F49e14FB591c8CcD81800847, 20);
    bitzToken.addWallet(0x04eb6a716c814b0B4A12dC9964916D64C55179C1, 20);
    bitzToken.init();
    bitzToken.transferOwnership(manager);
  }

}

