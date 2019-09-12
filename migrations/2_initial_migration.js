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
  defaultAccount = accounts[3];

  function setupWeb3() {
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        }
  }

  var effectiveTime = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * (365 + 1));// (in the future a year and a day)
  
  ropstenCoinbase = '0xB4974728A226702dA7d9a6B9892699aC917D82cF';
  poolA = '0x13ce8E47301da01484d04a5952253FEa219956E0';
  poolB = '0xd49253410da24213Abd43cFE5EE5EcE56e67AA6A';
  poolC = '0x3CE6dDA8f6C992421c96e462909743A93197Da44';
  poolD = '0xE177d75A410c2644633540613726825F9e8330E6';
  poolE = '0xCEa5e0522f4A6427570f7EBC38eDA7090a85459A';
  crowdSaleAccount = '0xfb414Aa755e6ddB1bbFcD02955e187C111FaAf8B';

  deployer.deploy(BlockcertAltCoin, standard, name, symbol, poolA, poolB, poolC, poolD, poolE, 859140000);
  deployer.deploy(CrowdSale,crowdSaleAccount);
  deployer.deploy(Debug);
  deployer.deploy(Owned);
  deployer.deploy(Utils);
  //deployer.deploy(TestContract, accounts);
};