var BlockcertAltCoin = artifacts.require("BlockcertAltCoin.sol");
var CrowdSale = artifacts.require("CrowdSale.sol");
var Debug = artifacts.require("Debug.sol");
var Owned = artifacts.require("Owned.sol");
var Utils = artifacts.require("Utils.sol");
var Web3 = require("web3");
var TestContract = artifacts.require("TestContract.sol");

module.exports = function(deployer, network, accounts) {

  /*
  * To migrate this file from Truffle command: truffle migrate --compile-all --reset -f 2 --to 2 --network ganache_cli
  */

  var web3;
  const addressPools = ['0x0f5baf1c615da9e83df25518e2bbe4e21f873ea5',
  '0xae9f43d4ffb2bc797634b8c89dbc9288dc2aaa00',
  '0x22c1906ef44f36d789946c1e185efbd3abe3dab9',
  '0x1c6fb34ab5a588834fe875440af71cbd376a9b81'];
  var standard = "0.1Alpha";
  var name = "ACME Alt Coin";
  var symbol = "ACME"
  

  function setupWeb3() {
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        }
  }

  var effectiveTime = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * (365 + 1));// (in the future a year and a day)
  
  deployer.deploy(BlockcertAltCoin, standard, name, symbol, '0xf10314ad300342a9d5dd4a4a0ca95c09f50b7b81',
  '0x41fd5382ea3c4a5c678b6a9df1e3fc6d3026fa57',
  '0x957e26ca7237a05771999809f0a4d37652f85de4',
  '0x5de87ba2e7ec9e794a80f029573f47156c6b590b',
  '0x6cc7071a7df5f442f83870c832f665bdf7f818b2', 859140000);
  deployer.deploy(CrowdSale,'0x6964734e1894f6974afe20ac4519439ae3806144');
  deployer.deploy(Debug);
  deployer.deploy(Owned);
  deployer.deploy(Utils);
  //deployer.deploy(TestContract, accounts);
};