/* global artifacts, contract, it, assert */
/* eslint-disable prefer-reflect */

const BlockcertToken = artifacts.require('BlockcertToken.sol');
const utils = require('./helpers/Utils');
const BigNumber = require('bignumber.js');

const invalidAccount = '0x0';

contract('BlockcertToken', (accounts) => {

	const _presalePool = accounts[1];
	const _CCTPool = accounts[2];
	const _BCIDeveloperPool = accounts[3];
	const _TreasuryPool = accounts[4];

	const ownerBalance = 430860000;
	const CCTPoolBalance = 410000000;
	const presalePoolBalance = 100000000;
	const bciDeveloperPoolBalance = 300000000;
	const treasuryPoolBalance  = 859140000;

    it('verifies the token name after construction', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
        let name = await token.name.call();
        assert.equal(name, 'BLOCKCERT');
    });

    it('verifies the token symbol after construction', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
        let symbol = await token.symbol.call();
        assert.equal(symbol, 'BCERT');
    });

	it('verifies the pool balances after deploy', async () => {
		let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
		let _presalePoolBalance = await token.balanceOf.call(_presalePool);
		assert.equal(new BigNumber(_presalePoolBalance).toNumber(), presalePoolBalance);
		let _CCTPoolBalance = await token.balanceOf.call(_CCTPool);
		assert.equal(_CCTPoolBalance.toNumber(), CCTPoolBalance);
		let _bciDeveloperPoolBalance = await token.balanceOf.call(_BCIDeveloperPool);
		assert.equal(_bciDeveloperPoolBalance.toNumber(), bciDeveloperPoolBalance);
		let _treasuryPoolBalance = await token.balanceOf.call(_TreasuryPool);
		assert.equal(_treasuryPoolBalance.toNumber(), treasuryPoolBalance);
		let _ownerBalance = await token.balanceOf.call(accounts[0]);
		assert.equal(_ownerBalance.toNumber(), ownerBalance);
		let totalSupply = await token.totalSupply.call();
		assert.equal(new BigNumber(_ownerBalance).plus(_CCTPoolBalance).plus(_presalePoolBalance).plus(_bciDeveloperPoolBalance ).plus(_treasuryPoolBalance).toNumber(), totalSupply.toNumber());
	});

    it('verifies the balances after a transfer', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
        await token.transfer(accounts[5], 500);
        let balance;
        balance = await token.balanceOf.call(accounts[0]);
        assert.equal(balance, new BigNumber(ownerBalance).minus(500).toNumber());
        balance = await token.balanceOf.call(accounts[5]);
        assert.equal(balance, 500);
    });

    it('verifies that a transfer fires a Transfer event', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
        let res = await token.transfer(accounts[5], 500);
        assert(res.logs.length > 0 && res.logs[0].event == 'Transfer');
    });

    it('should throw when attempting to transfer more than the balance', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);

        try {
            await token.transfer(accounts[1], ownerBalance + 1);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when attempting to transfer to an invalid address', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);

        try {
            await token.transfer(invalidAccount, 10);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('verifies the allowance after an approval', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
        await token.approve(accounts[1], 500);
        let allowance = await token.allowance.call(accounts[0], accounts[1]);
        assert.equal(allowance, 500);
    });

    it('verifies that an approval fires an Approval event', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
        let res = await token.approve(accounts[1], 500);
        assert(res.logs.length > 0 && res.logs[0].event == 'Approval');
    });

    it('should throw when attempting to define allowance for an invalid address', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);

        try {
            await token.approve(invalidAccount, 10);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('verifies the balances after transferring from another account', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
        await token.approve(accounts[5], 500);
        await token.transferFrom(accounts[0], accounts[2], 50, { from: accounts[5] });
        let balance;
        balance = await token.balanceOf.call(accounts[0]);
        assert.equal(balance, ownerBalance - 50);
        balance = await token.balanceOf.call(accounts[5]);
        assert.equal(balance, 0);
        balance = await token.balanceOf.call(accounts[2]);
        assert.equal(balance, CCTPoolBalance + 50);
    });

    it('verifies that transferring from another account fires a Transfer event', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
        await token.approve(accounts[1], 500);
        let res = await token.transferFrom(accounts[0], accounts[2], 50, { from: accounts[1] });
        assert(res.logs.length > 0 && res.logs[0].event == 'Transfer');
    });

    it('verifies the new allowance after transferring from another account', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
        await token.approve(accounts[1], 500);
        await token.transferFrom(accounts[0], accounts[2], 50, { from: accounts[1] });
        let allowance = await token.allowance.call(accounts[0], accounts[1]);
        assert.equal(allowance, 450);
    });

    it('should throw when attempting to transfer from another account more than the allowance', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
        await token.approve(accounts[1], 100);

        try {
            await token.transferFrom(accounts[0], accounts[2], 200, { from: accounts[1] });
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when attempting to transfer from an invalid account', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
        await token.approve(accounts[1], 100);

        try {
            await token.transferFrom(invalidAccount, accounts[2], 50, { from: accounts[1] });
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when attempting to transfer from to an invalid account', async () => {
        let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
        await token.approve(accounts[1], 100);

        try {
            await token.transferFrom(accounts[0], invalidAccount, 50, { from: accounts[1] });
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });


	describe('convert()', () => {
		it('should forbid convert from account with zero balance', async () => {
			let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);

			try {
				await token.convert(accounts[5], 500, {
					from: accounts[5]
				});
				assert(false, "didn't throw");
			}
			catch (error) {
				return utils.ensureException(error);
			}
		});

		it('should forbid convert from account with insufficient balance', async () => {
			let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
			await token.transfer(accounts[5], 400);
			try {
				await token.convert(accounts[5], 500, {
					from: accounts[5]
				});
				assert(false, "didn't throw");
			}
			catch (error) {
				return utils.ensureException(error);
			}
		});

		it('should correct convert balance', async () => {
			let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
			await token.transfer(accounts[5], 500);
			await token.convert(accounts[5], 500, {
				from: accounts[5]
			});
			const balance = (await token.balanceOf(accounts[5])).toNumber();
			assert(balance == 0, "invalid balance after convert");
			const totalSupply = (await token.totalSupply()).toNumber();
			assert(totalSupply == 2100000000 - 500, "invalid total supply after convert");
		});
	});

	describe('convertFrom()', () => {
		it('should forbid if caller not owner and now holder', async () => {
			let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
			await token.transfer(accounts[5], 400);
			try {
				await token.convertFrom(accounts[5], accounts[5], 400, {
					from: accounts[4]
				});
				assert(false, "didn't throw");
			}
			catch (error) {
				return utils.ensureException(error);
			}
		});

		it('should forbid convert from account with insufficient balance', async () => {
			let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
			await token.transfer(accounts[5], 400);
			try {
				await token.convertFrom(accounts[5], accounts[5], 500);
				assert(false, "didn't throw");
			}
			catch (error) {
				return utils.ensureException(error);
			}
		});

		it('should correct convert balance by owner', async () => {
			let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
			await token.transfer(accounts[5], 500);
			await token.convertFrom(accounts[5], accounts[5], 500, {
				from: accounts[0]
			});
			const balance = (await token.balanceOf(accounts[5])).toNumber();
			assert(balance == 0, "invalid balance after convert");
			const totalSupply = (await token.totalSupply()).toNumber();
			assert(totalSupply == 2100000000 - 500, "invalid total supply after convert");
		});

		it('should correct convert balance by holder', async () => {
			let token = await BlockcertToken.new(_presalePool, _CCTPool, _BCIDeveloperPool, _TreasuryPool);
			await token.transfer(accounts[5], 500);
			await token.convertFrom(accounts[5], accounts[5], 500, {
				from: accounts[5]
			});
			const balance = (await token.balanceOf(accounts[5])).toNumber();
			assert(balance == 0, "invalid balance after convert");
			const totalSupply = (await token.totalSupply()).toNumber();
			assert(totalSupply == 2100000000 - 500, "invalid total supply after convert");
		});
	});
});
