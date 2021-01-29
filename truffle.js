var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "circle memory ice swing excuse sheriff borrow stereo volume artwork broom hundred";

module.exports = {
	networks: {
		bcbc_testnet: {
			/*provider: function() {
				return new HDWalletProvider(mnemonic,"http://node2.blockcerts.com", 0);
				http://52.165.174.111:6111/
			},*/
			host: "node2.blockcerts.com",
			port: 6111,
			network_id: "13",
			gas: 4000000,
			from: "0xB4974728A226702dA7d9a6B9892699aC917D82cF"
		},
		live_main: {
			host: "10.1.2.4",
			port: 8545,
			network_id: 1, //rinkeby test network
			gas: 5000000,
			gasPrice: 5000000000,
			from: "0x5C5E330A04bcd81D9cdF54d808B65397493f84d8" //client
		},
		blockcertsnode: {
			//this is a private Geth node
			host: "127.0.0.1",
			port: "8545",
			network_id: "4224", //defined during creation of private geth node
			gas: 4700000,
			gasPrice: 5000000000,
			from: "0xf6b69ce6ca0f5b4305f3e94434a8851263a104e9" //coinbase account
		},
		rinkeby: {
			host: "localhost",
			port: 8545,
			network_id: 4, //rinkeby test network
			gas: 5000000,
			gasPrice: 5000000000,
			from: "0xF601e9Dd5609b118E63C50EE69095Ff94e3A199a"
		},
		ganache_cli: {
			host: "127.0.0.1",
			port: 8545,
			gas: 2816044,
			network_id: "*", // Match any network id
			gasPrice: 200000000000
		},
		ganache_ui: {
			host: "127.0.0.1",
			port: 7545,
			gas: 2816044,
			network_id: "*", // Match any network id
			gasPrice: 200000000000
			//from: 0x6472A63Da4581Dd9090faF7B92C09282b94a06EA
		}
	},
	mocha: {
		useColors: true
	},
	compilers: {
		solc: {
		   //version: "0.4.26",    // Fetch exact version from solc-bin (default: truffle's version)
		   version: "0.6.0",
		  // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
		  // settings: {          // See the solidity docs for advice about optimization and evmVersion
		  //  optimizer: {
		  //    enabled: false,
		  //    runs: 200
		  //  },
		  //  evmVersion: "byzantium"
		  // }
		}
	}
};
