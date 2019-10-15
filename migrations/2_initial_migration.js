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
  
  ropstenCoinbase = '0xC60359daC074Aa430acaFC34CB32a21404c887e2';
  poolA = '0x0e1cbc0fbab7df944ac98b6a535dbee8541c2c68';
  poolB = '0x3d819f0a4abd405cfe0af18f203b0ba40b7eb519';
  poolC = '0x4c521ff297f028fc4d9a1a930ac39cb14f9da940';
  poolD = '0x350dd21db3cdf1b8022498cecae8a04194c4ac17';
  poolE = '0xe713e173083e089d49ba931d151d412027721922';
  crowdSaleAccount = '0x043f375048Cb813A5eaf29367f8128A428e6856F';
  totalSupply = 2100000000;

  deployer.deploy(BlockcertAltCoin, standard, name, symbol, poolA, poolB, poolC, poolD, poolE, totalSupply, 1000000,2000000,3000000,4000000,5000000 );
  deployer.deploy(CrowdSale,crowdSaleAccount);
  deployer.deploy(Debug);
  deployer.deploy(Owned);
  deployer.deploy(Utils);
  //deployer.deploy(TestContract,["0xC60359daC074Aa430acaFC34CB32a21404c887e2","0x0e1cbc0fbab7df944ac98b6a535dbee8541c2c68"]);
};