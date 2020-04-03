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

  //For BlockcertAltCoin
  /*BCertinpoolA = '0xEf676be27d61B66DCA9e44edAB51551DAC3C07Ba';
  BCertinpoolB = '0x86CAC31a4B144C55466e2114DABd1889B6abc1BE';
  BCertinpoolC = '0x11332F4bD14e6b590C0cAB4562D5DA89A540B806';
  BCertinpoolD = '0x5198C54D4dE9A8B1edeAc9551E5c80923EdE8584';
  BCertinpoolE = '0x776d90Bcc595d9B9c244715aDeE07e45Cee6576C';*/

  BCertinpoolA = accounts[1];
  BCertinpoolB = accounts[2];
  BCertinpoolC = accounts[3];
  BCertinpoolD = accounts[4];
  BCertinpoolE = accounts[5]

  ropstenCoinbase = '0xC60359daC074Aa430acaFC34CB32a21404c887e2';

  //For BCertin
  poolA = '0xEf676be27d61B66DCA9e44edAB51551DAC3C07Ba';
  poolB = '0x86CAC31a4B144C55466e2114DABd1889B6abc1BE';
  poolC = '0x11332F4bD14e6b590C0cAB4562D5DA89A540B806';
  poolD = '0x5198C54D4dE9A8B1edeAc9551E5c80923EdE8584';
  poolE = '0x776d90Bcc595d9B9c244715aDeE07e45Cee6576C';

  crowdSaleAccount = '0x043f375048Cb813A5eaf29367f8128A428e6856F';
  totalSupply = 2100000000;

  deployer.deploy(BlockcertAltCoin, standard, name, symbol, poolA, poolB, poolC, poolD, poolE, totalSupply, 1000000,2000000,3000000,4000000,5000000 );
  deployer.deploy(BCertin, standard, name, symbol, BCertinpoolA, BCertinpoolB, BCertinpoolC, BCertinpoolD, BCertinpoolE, totalSupply, 1000000,2000000,3000000,4000000,5000000 );
  deployer.deploy(CrowdSale,crowdSaleAccount);
  deployer.deploy(Debug);
  deployer.deploy(Owned);
  deployer.deploy(Utils);
  
};