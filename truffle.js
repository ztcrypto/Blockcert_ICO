var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "circle memory ice swing excuse sheriff borrow stereo volume artwork broom hundred";

module.exports = {
	networks: {
		bcbc_testnet: {
			provider: function() {
				return new HDWalletProvider(mnemonic,"http://node2.blockcerts.com", 0);
			},
			network_id: "*",
			gas: 4000000,
			from: "0xB4974728A226702dA7d9a6B9892699aC917D82cF"
		},
		blockcertsnode: {
			//this is a private Geth node
			host: "127.0.0.1",
			port: "8545",
			network_id: "4224", //defined during creation of private geth node
			gas: 4700000,
			from: "0xf6b69ce6ca0f5b4305f3e94434a8851263a104e9" //coinbase account
		},
		rinkeby: {
			host: "localhost",
			port: 8545,
			network_id: 4, //rinkeby test network
			gas: 4000000,
			from: "0xF601e9Dd5609b118E63C50EE69095Ff94e3A199a"
		},
		truffle_develop: {
			host: "127.0.0.1",
			port: 9545,
			gas: 2816044,
			network_id: "*", // Match any network id
			gasPrice: 200000000000
		},
		infura_ropsten: {
			provider: () =>  new HDWalletProvider("circle memory ice swing excuse sheriff borrow stereo volume artwork broom hundred","https://ropsten.infura.io/v3/71cd22f7eea74abc8a7b4fafabbfffea","1eeef2be5b80492fa09ef5875b01cf8a"),
			network_id: 3,
			gas: 4700000,
			gasPrice: 10000000000,
			confirmations: 2,
			skipDryRun:true
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
		},
		AltCoinClient_XYZ: {
			host: "127.0.0.1",
			port: 7545,
			gas: 2816044,
			network_id: "*", // Match any network id
			gasPrice: 200000000000,
			from:  0x3f223D8681eAf9b2EaAf0006E037d49D069B9277
		},
		testnet: {
			from: "0xf8e5a2e7a7aa1148ab36dac0e5088a86e336ce79",
			host: "94.130.35.43",
			port: 6082,
			gas: 2816044,
			network_id: "*" // Match any network id
		}
	},
	mocha: {
		useColors: true
	},
	compilers: {
		solc: {
		   version: "0.4.26",    // Fetch exact version from solc-bin (default: truffle's version)
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
