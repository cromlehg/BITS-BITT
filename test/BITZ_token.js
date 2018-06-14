import additional from './token/additional';
import basic from './token/basic';
import ownable from './token/ownable';
import standard from './token/standard';

const token = artifacts.require('BITZToken.sol');

contract('BITZ Token - BasicToken test', function (accounts) {
  basic(token, accounts);
});
contract('BITZ Token - StandardToken test', function (accounts) {
  standard(token, accounts);
});
contract('BITZ Token - Ownable test', function (accounts) {
  ownable(token, accounts);
});
contract('BITZ Token - Additional conditions test', function (accounts) {
  additional(token, accounts);
});
