import assertRevert from '../helpers/assertRevert';

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, accounts) {
  let token;

  beforeEach(async function () {
    token = await Token.new();
    await token.addWallet(accounts[1],60);
    await token.addWallet(accounts[2],40);
    await token.init();
  });

  it('should return the correct allowance amount after approval', async function () {
    await token.approve(accounts[1], 100, {from: accounts[2]});
    const allowance = await token.allowance(accounts[2], accounts[1]);
    assert.equal(allowance, 100);
  });

  it('should return correct balances after transfer', async function () {
    await token.transfer(accounts[5], 100, {from: accounts[2]});
    const balance = await token.balanceOf(accounts[5]);
    assert.equal(balance, 100);
  });

  it('should throw an error when trying to transfer more than balance', async function () {
    const balance = await token.balanceOf(accounts[1]);
    await token.transfer(accounts[5], 100, {from: accounts[1]});
    await assertRevert(token.transfer(accounts[5], balance, {from: accounts[1]}));
  });

  it('should return correct balances after transfering from another account', async function () {
    const pre = await token.balanceOf(accounts[2]);
    await token.approve(accounts[1], 100, {from: accounts[2]});
    await token.transferFrom(accounts[2], accounts[5], 100, {from: accounts[1]});
    const balance = await token.balanceOf(accounts[5]);
    const post = await token.balanceOf(accounts[2]);
    assert.equal(balance, 100);
    pre.minus(100).should.be.bignumber.equal(post);
  });

  it('should throw an error when trying to transfer more than allowed', async function () {
    await token.approve(accounts[1], 99, {from: accounts[2]});
    await assertRevert(token.transferFrom(accounts[2], accounts[5], 100, {from: accounts[1]}));
  });

  it('should throw an error when trying to transferFrom more than _from has', async function () {
    const balance0 = await token.balanceOf(accounts[2]);
    await token.approve(accounts[1], balance0.plus(1), {from: accounts[2]});
    await assertRevert(token.transferFrom(accounts[2], accounts[5], balance0.plus(1), {from: accounts[1]}));
  });

  describe('validating allowance updates to spender', function () {
    let preApproved;

    it('should start with zero', async function () {
      preApproved = await token.allowance(accounts[0], accounts[1]);
      assert.equal(preApproved, 0);
    });

    it('should increase by 50 then decrease by 10', async function () {
      await token.increaseApproval(accounts[1], 50);
      const postIncrease = await token.allowance(accounts[0], accounts[1]);
      preApproved.plus(50).should.be.bignumber.equal(postIncrease);
      await token.decreaseApproval(accounts[1], 10);
      const postDecrease = await token.allowance(accounts[0], accounts[1]);
      postIncrease.minus(10).should.be.bignumber.equal(postDecrease);
    });
  });

  it('should increase by 50 then set to 0 when decreasing by more than 50', async function () {
    await token.approve(accounts[1], 50);
    await token.decreaseApproval(accounts[1], 60);
    const postDecrease = await token.allowance(accounts[0], accounts[1]);
    postDecrease.should.be.bignumber.equal(0);
  });

  it('should throw an error when trying to transfer to 0x0', async function () {
    await assertRevert(token.transfer(0x0, 100, {from: accounts[1]}));
  });

  it('should throw an error when trying to transfer to 0x0 from another account', async function () {
    await token.approve(accounts[1], 100, {from: accounts[2]});
    await assertRevert(token.transferFrom(accounts[2], 0x0, 100, {from: accounts[1]}));
  });
}
