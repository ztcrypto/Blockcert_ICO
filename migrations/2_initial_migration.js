var BlockcertAltCoin = artifacts.require("BlockcertAltCoin.sol");
var BCertin = artifacts.require("BCertin.sol");
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
  var standard = "0.1Alpha";
  var name = "ACME Alt Coin BCBC";
  var symbol = "ACME"
  defaultAccount = accounts[3];

  function setupWeb3() {
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        }
  }

  var effectiveTime = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * (365 + 1));// (in the future a year and a day)

  
  //For Blockcert Alt Coin & BCertin
  poolA = "0x486d653fbbdea081e624e91233679a4a33254ecd";
  poolB = "0xf97b2fd85e03cc5a6112aab788c56942bb1f6e6b";
  poolC = "0x5ea7b6cd04b2456c46140bff664608ec8c3e9bb1";
  poolD = "0xa936c4adc3a36db042812fe831d7a931ccf4d784";
  poolE = "0x8fc0b34ff83c44837c7f284de756e0e6be9b3d94";


/* 
** These accounts are all setup in ~/blockcertsnode/private/keystore
BCBC 0 - "0xF6b69ce6Ca0F5b4305f3E94434a8851263A104E9"
BCBC 1 - "0x6e8DB25C3369148EE23D50CB623Cb63231f3f225"
BCBC 2 - "0x018A488ACD43221eE629aF58914A32b5d203568C"
BCBC 3 - "0x4dabef2fecf757c5826b82b649d98e157739bfba"
BCBC 4 - "0x1fb835ae24b10f36de9ea82930dbeb877a3f28c5"
BCBC 5 - "0x9760fd0cd06ad717ee3b038d61a97bcd351b648e"
** Use for testing specific to the smart contract
BCBC 6 - "0x486d653fbbdea081e624e91233679a4a33254ecd"
BCBC 7 - "0xf97b2fd85e03cc5a6112aab788c56942bb1f6e6b"
BCBC 8 - "0x5ea7b6cd04b2456c46140bff664608ec8c3e9bb1"
BCBC 9 - "0xa936c4adc3a36db042812fe831d7a931ccf4d784"
BCBC 10 - "0x8fc0b34ff83c44837c7f284de756e0e6be9b3d94"
*/


  crowdSaleAccount = "0xF6b69ce6Ca0F5b4305f3E94434a8851263A104E9"; //BCBC 0
  totalSupply = 2100000000;

  deployer.deploy(BlockcertAltCoin, standard, name, symbol, poolA, poolB, poolC, poolD, poolE, totalSupply, 1000000,2000000,3000000,4000000,5000000 );
  deployer.deploy(BCertin, standard, "ACME Alt Coin BCertin", symbol, poolA, poolB, poolC, poolD, poolE, totalSupply, 1000000,2000000,3000000,4000000,5000000 );
  //deployer.deploy(CrowdSale,crowdSaleAccount);
  //deployer.deploy(Debug);
  deployer.deploy(Owned);
  deployer.deploy(Utils);
  
};