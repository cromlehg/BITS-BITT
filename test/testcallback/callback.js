import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';
import unixTime from '../helpers/unixTime';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, CallbackTest, wallets) {
  let token;
  let callbacktest;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    callbacktest = await CallbackTest.new();
    token = await Token.new();
    await token.addWallet(wallets[2],60);
    await token.addWallet(wallets[3],40);
    await token.init();
    await token.transferOwnership(wallets[1]);
  });

  it ('transfer should call tokenFallback for registered contract', async function () {
    await token.registerCallback(callbacktest.address, {from: wallets[1]});
    const sendvalue = tokens(300);
    await token.transfer(callbacktest.address, sendvalue, {from: wallets[2]});
    const value = await callbacktest.value();
    value.should.be.bignumber.equal(sendvalue);
    const from = await callbacktest.from();
    from.should.be.bignumber.equal(wallets[2]);
  });

  it ('transfer should not call tokenFallback for not registered contract', async function () {
    await token.deregisterCallback(callbacktest.address, {from: wallets[1]});
    const sendvalue = tokens(400);
    const oldvalue = await callbacktest.value();
    await token.transfer(callbacktest.address, sendvalue, {from: wallets[2]});
    const value = await callbacktest.value();
    value.should.be.bignumber.equal(oldvalue);
  });

  it ('transferFrom should call tokenFallback for registered contract', async function () {
    await token.registerCallback(callbacktest.address, {from: wallets[1]});
    await token.approve(wallets[2], tokens(10000), {from: wallets[3]});
    const sendvalue = tokens(300);
    await token.transferFrom(wallets[3], callbacktest.address, sendvalue, {from: wallets[2]});
    const value = await callbacktest.value();
    value.should.be.bignumber.equal(sendvalue);
    const from = await callbacktest.from();
    from.should.be.bignumber.equal(wallets[3]);
  });

   it ('transferFrom should not call tokenFallback for not registered contract', async function () {
    await token.deregisterCallback(callbacktest.address, {from: wallets[1]});
    await token.approve(wallets[2], tokens(10000), {from: wallets[3]});
    const sendvalue = tokens(400);
    const oldvalue = await callbacktest.value();
    await token.transferFrom(wallets[3], callbacktest.address, sendvalue, {from: wallets[2]});
    const value = await callbacktest.value();
    value.should.be.bignumber.equal(oldvalue);
  });
}
