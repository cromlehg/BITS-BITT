import ether from './helpers/ether';
import tokens from './helpers/tokens';
import {advanceBlock} from './helpers/advanceToBlock';
import {increaseTimeTo, duration} from './helpers/increaseTime';
import latestTime from './helpers/latestTime';
import EVMRevert from './helpers/EVMRevert';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

const Configurator = artifacts.require('Configurator.sol');
const BITT = artifacts.require('BITTToken.sol');
const BITZ = artifacts.require('BITZToken.sol');

contract('Configurator integration test', function (accounts) {
  let configurator;
  let bitt;
  let bitz;

  const manager = '0xe99c8d442a5484bE05E3A5AB1AeA967caFf07133';

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
    configurator = await Configurator.new();

    const bittAddress = await configurator.bittToken();
    const bitzAddress = await configurator.bitzToken();

    bitt = await BITT.at(bittAddress);
    bitz = await BITZ.at(bitzAddress);
  });

  it('contracts should have bitt address', async function () {
    const bOwner = await bitt.owner();
    bOwner.should.bignumber.equal(manager);
  });

  it('contracts should have bitz address', async function () {
    const bOwner = await bitz.owner();
    bOwner.should.bignumber.equal(manager);
  });

});

