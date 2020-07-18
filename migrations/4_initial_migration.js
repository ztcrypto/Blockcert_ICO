var BCBC = artifacts.require("BCBCSmartContract.sol");
var Web3 = require("web3");
var solc = require('solc');
const path = require('path');
const fs = require('fs');

module.exports = function(deployer, network, accounts) {

  /*
  * To migrate this file from Truffle command: truffle migrate --compile-all --reset -f 2 --to 2 --network ganache_cli
  */

  var web3;
  
  function setupWeb3() {
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        }
  }

  deployer.deploy(BCBC);
  //ABI
  /*const contractPaths = path.resolve(__dirname, '../contracts/');
  const source = fs.readFileSync(contractPaths, 'UTF-8');
  console.log( solc.compile(source,1) )*/
  
  //console.log(contractPaths)
  //console.log( contractPaths.indexOf("migrations") );
  //console.log( contractPaths.substring(0,36) );
  
};