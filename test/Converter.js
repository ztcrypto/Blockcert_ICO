/* global artifacts, contract, it, assert */

const BigNumber = require('bignumber.js');
const utils = require('./helpers/Utils');
const Converter = artifacts.require('Converter.sol');

const toWei = (eth) => new BigNumber(eth.toString()).mul(new BigNumber(10).pow(18));

contract('Converter', (accounts) => {

	let converterInstance;

	let deployContract = async () => {
		converterInstance = await Converter.new();
		await converterInstance.sendTransaction({
			value: toWei(100),
			from: accounts[0]
		});
	};

	beforeEach(async () => await deployContract());

	it('should correct mint balance', async () => {
		const balanceBefore = web3.eth.getBalance(accounts[1]);
		const mintResult = await converterInstance.mint(accounts[1], accounts[2], 1, {
			from: accounts[0]
		});

		const { logs } = mintResult;
		assert(logs.length === 1);
		assert.equal(logs[0].args['_to'], accounts[1]);
		assert.equal(logs[0].args['_fromEthereumAddress'], accounts[2]);
		assert.equal(logs[0].args['_value'], '1');

		const balanceAfter = web3.eth.getBalance(accounts[1]);
		assert(balanceBefore.plus(1).equals(balanceAfter.toString()));
	});

	it('should forbid is sender is not owner', async () => {
		try {
			await converterInstance.mint(accounts[1], accounts[2], 1, {
				from: accounts[1]
			});

			assert(false, "didn't throw");
		}
		catch (error) {
			return utils.ensureException(error);
		}
	});

	it('should correct convert', async () => {
		const convertResult = await converterInstance.convert(accounts[3], {
			from: accounts[1],
			value: 1
		});

		const { logs } = convertResult;
		assert(logs.length === 1);
		assert.equal(logs[0].args['_from'], accounts[1]);
		assert.equal(logs[0].args['_toEthereumAddress'], accounts[3]);
		assert.equal(logs[0].args['_value'], '1');
	});

});