import additional from './token/additional';
import basic from './token/basic';
import ownable from './token/ownable';
import standard from './token/standard';

const token = artifacts.require('BITTToken.sol');

contract('BITT Token - BasicToken test', function (accounts) {
  basic(token, accounts);
});
contract('BITT Token - StandardToken test', function (accounts) {
  standard(token, accounts);
});
contract('BITT Token - Ownable test', function (accounts) {
  ownable(token, accounts);
});
contract('BITT Token - Additional conditions test', function (accounts) {
  additional(token, accounts);
});
