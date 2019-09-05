var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "flee sadness churn mixture harbor hurry helmet grid valve frame seat voice";

module.exports = {
	networks: {
		infura_ropsten: {
			provider: function() {
				return new HDWalletProvider(mnemonic,"ropsten.infura.io/v3/41092ac3039f4ed68fb81c422db31454");
			}
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
		},
		AltCoinClient_XYZ: {
			host: "127.0.0.1",
			port: 8545,
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
