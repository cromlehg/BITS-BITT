import assertRevert from '../helpers/assertRevert';

export default function (Token, accounts) {
  let token;

  beforeEach(async function () {
    token = await Token.new();
    await token.addWallet(accounts[1],60);
    await token.addWallet(accounts[2],40);
    await token.init();
  });

  it('should return correct balances after transfer', async function () {
    const before = await token.balanceOf(accounts[1]);   
    await token.transfer(accounts[5], 100, {from: accounts[1]});
    const balance = await token.balanceOf(accounts[5]);
    const after = await token.balanceOf(accounts[1]);
    assert.equal(balance, 100);
    assert.equal(before.sub(after), 100);
  });

  it('should throw an error when trying to transfer more than balance', async function () {
    const balance = await token.balanceOf(accounts[1]);
    await token.transfer(accounts[5], balance, {from: accounts[1]});
    await assertRevert(token.transfer(accounts[5], 100, {from: accounts[1]}));
  });

  it('should throw an error when trying to transfer to 0x0', async function () {
    await assertRevert(token.transfer(0x0, 100, {from: accounts[1]}));
  });
}
