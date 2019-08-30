//var BlockcertToken = artifacts.require("BlockcertToken.sol");
var BlockcertAltCoin = artifacts.require("BlockcertAltCoin.sol");
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


  /*deployer.deploy(BlockcertToken,'0xe8fbc02278e83f79c0de9bf8dd70d9dcadb827b9',
  '0x0403d7d84f5bbc1b2da322c478be802c9d05b097',
  '0x0b6a9c578bd80bcc4cb776d8b364f584e214287c',
  '0x75e0678d40c217f77630ec089cebb67844720686');*/
  deployer.deploy(BlockcertAltCoin, standard, name, symbol, '0x3230a60fa5ddd37d75d9635cb4fffc2bcc818ebf',
  '0xc5b2d4a62642e2470b0b9a93c8bc99d72c60348b',
  '0x486855ec3d9368792b1695befcfe99b2293d39ea',
  '0xc55eb56bebcb3fee1740f0380000b2b68d1ce2b0',
  '0xa98f1ba85cd2451d4209f0c47c71b2199d4dd38b',100000000);
  deployer.deploy(CrowdSale,'0xa98f1ba85cd2451d4209f0c47c71b2199d4dd38b');
  deployer.deploy(Debug);
  deployer.deploy(Owned);
  deployer.deploy(Utils);

};