var HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic = require('./mnemonic.json');

module.exports = {
  networks: {
    bcbc_testnet: {
      provider: function () {
        return new HDWalletProvider(
          'DB206DB4DD74CC1757CEDEBFAA7AE019DAB874A746465D838ED3264E2DF8C0C5',
          'http://18.217.44.202:6111',
          0
        );
      },
      host: '18.217.44.202',
      port: 6111,
      network_id: '13',
      gasPrice: 1,
    },
    live_main: {
      host: '10.1.2.4',
      port: 8545,
      network_id: 1, //rinkeby test network
      gas: 5000000,
      gasPrice: 5000000000,
      from: '0x5C5E330A04bcd81D9cdF54d808B65397493f84d8', //client
    },
    blockcertsnode: {
      //this is a private Geth node
      host: '127.0.0.1',
      port: '8545',
      network_id: '4224', //defined during creation of private geth node
      gas: 4700000,
      gasPrice: 5000000000,
      from: '0xf6b69ce6ca0f5b4305f3e94434a8851263a104e9', //coinbase account
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          'https://eth-rinkeby.alchemyapi.io/v2/qb-cnRb1xjrHALSNw2mH3Ohlbk8AL6MC'
        );
      },
      network_id: 4,
      gas: 4000000,
      networkCheckTimeout: 10000000,
    },
    ganache_cli: {
      host: '127.0.0.1',
      port: 8545,
      gas: 2816044,
      network_id: '*', // Match any network id
      gasPrice: 200000000000,
    },
    ganache_ui: {
      host: '127.0.0.1',
      port: 7545,
      gas: 2816044,
      network_id: '*', // Match any network id
      gasPrice: 200000000000,
      //from: 0x6472A63Da4581Dd9090faF7B92C09282b94a06EA
    },
  },
  mocha: {
    useColors: true,
  },
  compilers: {
    solc: {
      //version: "0.4.26",    // Fetch exact version from solc-bin (default: truffle's version)
      version: '0.6.0',
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
