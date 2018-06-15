import assertRevert from '../helpers/assertRevert';
import expectThrow from '../helpers/expectThrow';
import EVMRevert from '../helpers/EVMRevert';

export default function (Token, accounts) {
  let token;

  beforeEach(async function () {
    token = await Token.new();
    await token.addWallet(accounts[1],60);
    await token.addWallet(accounts[2],30);
    await token.addWallet(accounts[3],10);
    await token.init();
  });

  it('totalSupply should be 500 000 000', async function () {
    const totalTokens = await token.totalSupply();
    assert.equal(totalTokens, 500000000000000000000000000);
  });

  it('balances should be in percents', async function () {
    const balance1 = await token.balanceOf(accounts[1]);
    assert.equal(balance1, 500000000000000000000000000 * 0.60);
    const balance2 = await token.balanceOf(accounts[2]);
    assert.equal(balance2, 500000000000000000000000000 * 0.30);
    const balance3 = await token.balanceOf(accounts[3]);
    assert.equal(balance3, 500000000000000000000000000 * 0.10);
  });  

  it('should approve address after addUnlockedAddress', async function () {
    await token.addUnlockedAddress(accounts[3], {from: accounts[0]});
    const unlockedAddresses = await token.unlockedAddresses(accounts[3]);
    assert.equal(unlockedAddresses, true);
    await token.setLocked(true, {from: accounts[0]});
    await token.transfer(accounts[5], 100, {from: accounts[3]}).should.be.fulfilled;
  });

  it('should remove address after removeUnlockedAddress', async function () {
    await token.addUnlockedAddress(accounts[3], {from: accounts[0]});
    await token.removeUnlockedAddress(accounts[3], {from: accounts[0]});
    const unlockedAddresses = await token.unlockedAddresses(accounts[3]);
    assert.equal(unlockedAddresses, false);
    await token.setLocked(true, {from: accounts[0]});
    await token.transfer(accounts[5], 100, {from: accounts[3]}).should.be.rejectedWith(EVMRevert);
  });

  it('should approve addresses after unlockBatchOfAddresses', async function () {
    await token.unlockBatchOfAddresses([accounts[1],accounts[2],accounts[3]], {from: accounts[0]});
    const unlockedAddresses1 = await token.unlockedAddresses(accounts[1]);
    assert.equal(unlockedAddresses1, true);
    const unlockedAddresses2 = await token.unlockedAddresses(accounts[2]);
    assert.equal(unlockedAddresses2, true);
    const unlockedAddresses3 = await token.unlockedAddresses(accounts[3]);
    assert.equal(unlockedAddresses3, true);
  });

  it('should correct change owner', async function () {
    const other = accounts[6];
    await token.transfer(other, 100, {from: accounts[1]});
    await token.transferOwnership(other, {from: accounts[0]});
    const owner = await token.owner();
    assert.isTrue(owner === other);
    const unlockedAddresses = await token.unlockedAddresses(other);
    assert.equal(unlockedAddresses, true);
    await token.setLocked(true, {from: other});
    await token.transfer(accounts[5], 100, {from: other}).should.be.fulfilled;
  });
}
