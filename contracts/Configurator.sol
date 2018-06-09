pragma solidity ^0.4.18;

import './ownership/Ownable.sol';
import './BITTToken.sol';
import './BITSToken.sol';

contract Configurator is Ownable {

  CommonToken public bittToken;

  CommonToken public bitsToken;

  function deploy() public onlyOwner {
    address manager = 0xEA15Adb66DC92a4BbCcC8Bf32fd25E2e86a2A770;

    bitsToken = new BITSToken();
    bitsToken.addWallet(0x08C32a099E59c7e913B16cAd4a6C988f1a5A7216, 60);
    bitsToken.addWallet(0x3019B9ad002Ddec2F49e14FB591c8CcD81800847, 10);
    bitsToken.addWallet(0x18fd87AAB645fd4c0cEBc21fb0a271E1E2bA5363, 5);
    bitsToken.addWallet(0x1eC03A084Cc02754776a9fEffC4b47dAE4800620, 3);
    bitsToken.addWallet(0xb119f842E6A10Dc545Af3c53ff28250B5F45F9b2, 2);
    bitsToken.init();
    bitsToken.transferOwnership(manager);

    bitsToken = new BITSToken();
    bitsToken.addWallet(0xc0f1a3E91C2D0Bcc5CD398D05F851C2Fb1F3fE30, 60);
    bitsToken.addWallet(0x3019B9ad002Ddec2F49e14FB591c8CcD81800847, 60);

    bittToken.init();
    bittToken.transferOwnership(manager);
  }

}

