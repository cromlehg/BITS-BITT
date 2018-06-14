import assertRevert from '../helpers/assertRevert';
import expectThrow from '../helpers/expectThrow';
import EVMRevert from '../helpers/EVMRevert';

export default function (Token, accounts) {
  let token;

  beforeEach(async function () {
    token = await Token.new();
    await token.addWallet(accounts[1],60);
    await token.addWallet(accounts[2],40);
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
    assert.equal(balance2, 500000000000000000000000000 * 0.40);
  });  

  it('should approve address after addUnlockedAddress', async function () {
    await token.addUnlockedAddress(accounts[3], {from: accounts[0]});
    const unlockedAddresses = await token.unlockedAddresses(accounts[3]);
    assert.equal(unlockedAddresses, true);
  });

  it('should remove address after removeUnlockedAddress', async function () {
    await token.addUnlockedAddress(accounts[3], {from: accounts[0]});
    await token.removeUnlockedAddress(accounts[3], {from: accounts[0]});
    const lockedAddresses = await token.unlockedAddresses(accounts[3]);
    assert.equal(lockedAddresses, false);
  });

}
