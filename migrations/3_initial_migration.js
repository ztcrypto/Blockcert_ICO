var Converter = artifacts.require("Converter.sol");
var CrowdSale = artifacts.require("CrowdSale.sol");
var Web3 = require("web3");

module.exports = function(deployer, network, accounts) {

  /*
  * To migrate this file from Truffle command: truffle migrate --compile-all --reset -f 3 --to 3 --network ganache_ui
  */

  var web3;
  const addressPools = [accounts[6],accounts[7],accounts[8],accounts[9]];

  function setupWeb3() {
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        }
  }


  deployer.deploy(Converter);
  
};