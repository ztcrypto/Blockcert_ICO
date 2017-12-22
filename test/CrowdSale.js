/* global artifacts, contract, it, assert */
/* eslint-disable prefer-reflect */

const BlockcertToken = artifacts.require('BlockcertToken.sol');
const CrowdSale = artifacts.require('CrowdSale.sol');
const utils = require('./helpers/Utils');
const BigNumber = require('bignumber.js');

const invalidAccount = '0x0';

const gasPrice = 200000000000;

let toWei = (eth) => new BigNumber(eth.toString()).mul(new BigNumber(10).pow(18));

contract('BlockcertToken', (accounts) => {
	
	const _presalePool = accounts[5];
	const _CCTPool = accounts[5];
	const _BCIDeveloperPool = accounts[5];
	const _TreasuryPool = accounts[5];
	
	const ownerBalance = 430860000;
	
	const weiPerTokenPrice = 1000000000000000;
	
	let tokenInstance;
	let crowdSaleInstance;
	
	let deployContracts = async () => {
		tokenInstance = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
		crowdSaleInstance = await CrowdSale.new(tokenInstance.address);
		await tokenInstance.transfer(crowdSaleInstance.address, ownerBalance);
		await crowdSaleInstance.setBlockTime(await crowdSaleInstance.startDate.call());
	};
	
	beforeEach(async () => await deployContracts());

	it('verifies the token balance', async () => {
		let balance = await tokenInstance.balanceOf.call(crowdSaleInstance.address);
		assert.equal(balance, ownerBalance);
	});

	it('should correct pay token', async () => {
		let balance;
		balance = await tokenInstance.balanceOf.call(accounts[1]);
		await crowdSaleInstance.sendTransaction({
			value: toWei(10),
			from: accounts[1]
		});
		balance = await tokenInstance.balanceOf.call(accounts[1]);
		assert.equal(balance.toNumber(), toWei(10).div(weiPerTokenPrice).toNumber());
	});

	it('should forbid pay token after end date', async () => {
		await crowdSaleInstance.setBlockTime((await crowdSaleInstance.endDate.call()).toNumber() + 1);
		try {
			await crowdSaleInstance.sendTransaction({
				value: toWei(10),
				from: accounts[1]
			});
			assert(false, "didn't throw");
		}
		catch(error) {
			return utils.ensureException(error);
		}
	});

	it('should forbid pay token end token balance', async () => {
		await crowdSaleInstance.sendTransaction({
			value: new BigNumber(weiPerTokenPrice).mul(ownerBalance),
			from: accounts[1]
		});

		try {
			await crowdSaleInstance.sendTransaction({
				value: toWei(10),
				from: accounts[1]
			});
			assert(false, "didn't throw");
		}
		catch(error) {
			return utils.ensureException(error);
		}
	});

	it('should send only part tokens and return change', async () => {
		let sendAmount = new BigNumber(weiPerTokenPrice).mul(ownerBalance + 10);
		let weiBalanceBefore = web3.eth.getBalance(accounts[1]);
		let result = await crowdSaleInstance.sendTransaction({
			value: sendAmount,
			from: accounts[1]
		});
		let balance = await tokenInstance.balanceOf.call(crowdSaleInstance.address);
		assert.equal(balance, 0);
		balance = await tokenInstance.balanceOf.call(accounts[1]);
		assert.equal(balance, ownerBalance);
		let weiBalanceAfter = web3.eth.getBalance(accounts[1]).toNumber();
		weiBalanceBefore = weiBalanceBefore.minus(new BigNumber(weiPerTokenPrice).mul(ownerBalance)).minus(new BigNumber(gasPrice).mul(result.receipt.gasUsed)).toNumber();
		assert.equal(weiBalanceBefore, weiBalanceAfter);
	});

	it('should forbid set pause before soft cap earned', async () => {
		await crowdSaleInstance.sendTransaction({
			value: toWei(1),
			from: accounts[1]
		});

		try {
			await crowdSaleInstance.setPauseStatus(true);
			assert(false, "didn't throw");
		}
		catch(error) {
			return utils.ensureException(error);
		}
	});

	it('should forbid set pause from not-owner account', async () => {
		await crowdSaleInstance.sendTransaction({
			value: await crowdSaleInstance.softCap.call(),
			from: accounts[1]
		});

		try {
			await crowdSaleInstance.setPauseStatus(true, {
				from: accounts[1]
			});
			assert(false, "didn't throw");
		}
		catch(error) {
			return utils.ensureException(error);
		}
	});

	it('should correct set pause', async () => {
		await crowdSaleInstance.sendTransaction({
			value: await crowdSaleInstance.softCap.call(),
			from: accounts[1]
		});
		await crowdSaleInstance.setPauseStatus(true);
		let isPaused = await crowdSaleInstance.crowdSalePaused.call();
		assert.equal(true, isPaused);
	});

	it('should forbid pay token if crowdsale is paused', async () => {
		await crowdSaleInstance.sendTransaction({
			value: await crowdSaleInstance.softCap.call(),
			from: accounts[1]
		});
		await crowdSaleInstance.setPauseStatus(true);

		try {
			await crowdSaleInstance.sendTransaction({
				value: toWei(10),
				from: accounts[1]
			});
			assert(false, "didn't throw");
		}
		catch(error) {
			return utils.ensureException(error);
		}
	});

	it('should correct pay token if crowdsale is unpaused', async () => {
		await crowdSaleInstance.sendTransaction({
			value: await crowdSaleInstance.softCap.call(),
			from: accounts[1]
		});
		await crowdSaleInstance.setPauseStatus(true);
		await crowdSaleInstance.setPauseStatus(false);

		await crowdSaleInstance.sendTransaction({
			value: toWei(10),
			from: accounts[1]
		});
	});

	it('should forbid close crowdsale before soft cap earned', async () => {
		await crowdSaleInstance.sendTransaction({
			value: toWei(1),
			from: accounts[1]
		});

		try {
			await crowdSaleInstance.closeCrowdsale();
			assert(false, "didn't throw");
		}
		catch(error) {
			return utils.ensureException(error);
		}
	});

	it('should forbid crowdsale before from not-owner account', async () => {
		await crowdSaleInstance.sendTransaction({
			value: await crowdSaleInstance.softCap.call(),
			from: accounts[1]
		});

		try {
			await crowdSaleInstance.closeCrowdsale({
				from: accounts[1]
			});
			assert(false, "didn't throw");
		}
		catch(error) {
			return utils.ensureException(error);
		}
	});

	it('should correct crowdsale before', async () => {
		await crowdSaleInstance.sendTransaction({
			value: await crowdSaleInstance.softCap.call(),
			from: accounts[1]
		});
		await crowdSaleInstance.closeCrowdsale();
		let isPaused = await crowdSaleInstance.crowdSaleClosed.call();
		assert.equal(true, isPaused);
	});

	it('should forbid pay token if crowdsale is closed', async () => {
		await crowdSaleInstance.sendTransaction({
			value: await crowdSaleInstance.softCap.call(),
			from: accounts[1]
		});
		await crowdSaleInstance.closeCrowdsale();

		try {
			await crowdSaleInstance.sendTransaction({
				value: toWei(10),
				from: accounts[1]
			});
			assert(false, "didn't throw");
		}
		catch(error) {
			return utils.ensureException(error);
		}
	});

	it('should forbid withdraw if crowdsale opened', async () => {
		await crowdSaleInstance.sendTransaction({
			value: toWei(1),
			from: accounts[1]
		});
		try {
			await crowdSaleInstance.safeWithdrawal();
			assert(false, "didn't throw");
		}
		catch(error) {
			return utils.ensureException(error);
		}
	});
	
	it('should correct withdraw if cs is closed', async () => {
		await crowdSaleInstance.sendTransaction({
			value: await crowdSaleInstance.softCap.call(),
			from: accounts[1]
		});
		await crowdSaleInstance.closeCrowdsale();
		await crowdSaleInstance.safeWithdrawal();
	});
	
	it('should correct withdraw after end date', async () => {
		await crowdSaleInstance.sendTransaction({
			value: toWei(1),
			from: accounts[1]
		});
		await crowdSaleInstance.setBlockTime((await crowdSaleInstance.endDate.call()).toNumber() + 1);
		await crowdSaleInstance.safeWithdrawal();
	});
	
	it('should correct withdraw after zero token balance', async () => {
		await crowdSaleInstance.sendTransaction({
			value: new BigNumber(weiPerTokenPrice).mul(ownerBalance),
			from: accounts[1]
		});
		await crowdSaleInstance.safeWithdrawal();
	});
	
	it('should correct amount withdraw', async () => {
		await crowdSaleInstance.sendTransaction({
			value: toWei(1),
			from: accounts[1]
		});
		await crowdSaleInstance.setBlockTime((await crowdSaleInstance.endDate.call()).toNumber() + 1);
		let weiBalanceBefore = web3.eth.getBalance(accounts[0]);
		let result = await crowdSaleInstance.safeWithdrawal();
		let weiBalanceAfter = web3.eth.getBalance(accounts[0]).toNumber();
		weiBalanceBefore = weiBalanceBefore.plus(toWei(1)).minus(new BigNumber(gasPrice).mul(result.receipt.gasUsed)).toNumber();
		assert.equal(weiBalanceBefore, weiBalanceAfter);
	});
});



