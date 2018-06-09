pragma solidity ^0.4.18;

import './ownership/Ownable.sol';
import './BITTToken.sol';
import './BITSToken.sol';

contract Configurator is Ownable {

  CommonToken public bittToken;

  CommonToken public bitsToken;

  function deploy() public onlyOwner {
    address manager = 0xEA15Adb66DC92a4BbCcC8Bf32fd25E2e86a2A770;

    bittToken = new BITTToken();
    bittToken.addWallet(0x08C32a099E59c7e913B16cAd4a6C988f1a5A7216, 60);
    bittToken.addWallet(0x5b2A9b86113632d086CcD8c9dAf67294eda78105, 20);
    bittToken.addWallet(0x3019B9ad002Ddec2F49e14FB591c8CcD81800847, 10);
    bittToken.addWallet(0x18fd87AAB645fd4c0cEBc21fb0a271E1E2bA5363, 5);
    bittToken.addWallet(0x1eC03A084Cc02754776a9fEffC4b47dAE4800620, 3);
    bittToken.addWallet(0xb119f842E6A10Dc545Af3c53ff28250B5F45F9b2, 2);
    bittToken.init();
    bittToken.transferOwnership(manager);

    bitsToken = new BITSToken();
    bitsToken.addWallet(0xc0f1a3E91C2D0Bcc5CD398D05F851C2Fb1F3fE30, 60);
    bitsToken.addWallet(0x3019B9ad002Ddec2F49e14FB591c8CcD81800847, 20);
    bitsToken.addWallet(0x04eb6a716c814b0B4A12dC9964916D64C55179C1, 20);

    bittToken.init();
    bittToken.transferOwnership(manager);
  }

}

