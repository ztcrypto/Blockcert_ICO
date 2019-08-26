var BlockcertToken = artifacts.require("BlockcertToken.sol");
//var Converter = artifacts.require("Converter.sol");
var CrowdSale = artifacts.require("CrowdSale.sol");
var Debug = artifacts.require("Debug.sol");
var Owned = artifacts.require("Owned.sol");
var Utils = artifacts.require("Utils.sol");
var Web3 = require("web3");

module.exports = function(deployer, network, accounts) {

  /*
  * To migrate this file from Truffle command: truffle migrate --compile-all --reset -f 2 --to 2 --network ganache_cli
  */

  var web3;
  const addressPools = [accounts[6],accounts[7],accounts[8],accounts[9]];

  function setupWeb3() {
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        }
  }


  deployer.deploy(BlockcertToken,'0xe0c41184383e5e43f21797a88700db1fe9f10165',
  '0xe43660c5e0427972f0e86be45fa0586b28da9566',
  '0x25a59a2c996a2b3b022dfd12c9f626e43320528b',
  '0x33a861d98a32eb6f5153e8141a757fcd7aa83bad');
  //deployer.deploy(Converter);
  deployer.deploy(CrowdSale,'0x939dd48c8e353e51f9d94eeba8717a299fb6e7e1');
  deployer.deploy(Debug);
  deployer.deploy(Owned);
  deployer.deploy(Utils);

};