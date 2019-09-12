var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "flee sadness churn mixture harbor hurry helmet grid valve frame seat voice";

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
		truffle_develop: {
			host: "127.0.0.1",
			port: 9545,
			gas: 2816044,
			network_id: "*", // Match any network id
			gasPrice: 200000000000
		},
		infura_ropsten: {
			provider: function() {
				return new HDWalletProvider(mnemonic,"https://ropsten.infura.io/v3/71cd22f7eea74abc8a7b4fafabbfffea", 0);
			},
			network_id: 3,
			gas: 4698712,
			gasPrice: 10000000000
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
	}
};
