// Specifically request abstractions
var BlockcertAltCoin = artifacts.require("BlockcertAltCoin");
const utils = require('./helpers/Utils');
//const BigNumber = require('bignumber.js');
var Web3 = require("web3");

contract('BlockcertAltCoin', function(accounts) {
    const hostPort = '8545';
    var addressB = accounts[1];
    var addressC = accounts[2];
    var addressD = accounts[3];
    var addressE = accounts[4];
    var addressF = accounts[5];
    var crowdSaleAddress = accounts[6];
    var standard = "0.1Alpha";
    var name = "ACME Alt Coin";
    var symbol = "ACME"
    var poolInitialBalance = 500000000;
    const ownerBalance = 430860000;

    let blockcertAltCoin;
    let web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:${hostPort}`));

    it("should have Blockcert Alt Coin new context", async() => {
        blockcertAltCoin = await BlockcertAltCoin.new(standard,name,symbol,addressB,addressC,addressD,addressE,addressF,poolInitialBalance);

        console.log("\t\t[ Blockcert ALT Coin contract address :: " + blockcertAltCoin.address + " ]");
        console.log("\t\t[ Pool B address:: " + addressB + " ]");
        console.log("\t\t[ Pool C address:: " + addressC + " ]");
        console.log("\t\t[ Pool D address:: " + addressD + " ]");
        console.log("\t\t[ Pool E address:: " + addressE + " ]");
        console.log("\t\t[ Pool F address:: " + addressF + " ]");
        console.log("\t\t[ Crowd Sale address:: " + crowdSaleAddress + " ]");
        assert(blockcertAltCoin !== undefined, 'has no BlockcertAltCoin instance');

    }).timeout(100000);

    it("should have Alt Coin info", async() => {
        let altCoinInfo = await blockcertAltCoin.getAltCoinInfo.call();
        console.log("\t\t[Alt Coin Info:: " + altCoinInfo[0] + "::" + altCoinInfo[1] + "::" + altCoinInfo[2] + " ]");
        assert.equal(altCoinInfo[0], standard, "Standard Version not the same");
        assert.equal(altCoinInfo[1], name, "Alt Coin name not the same");
        assert.equal(altCoinInfo[2], symbol, "Alt Coin symbol not the same");
    }).timeout(100000);

    it("should have balance", async() => {
        let altCoinBalance = await blockcertAltCoin.getPoolBalance.call(addressB);
        assert.equal(altCoinBalance,poolInitialBalance,"Initial balance amount incorrect");
    }).timeout(100000);

    it("should have new pool address", async() => {
        var newPoolAddress = accounts[7];
        var expiryTime = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * (365 + 1));// (in the future a year and a day)
        await blockcertAltCoin.addNewPool(newPoolAddress, 800000, expiryTime);
        let poolBalance = await blockcertAltCoin.getPoolBalance.call(newPoolAddress);
        let newPoolStartDate = await blockcertAltCoin.getPoolStartDate.call(newPoolAddress);
        console.log("\t\t[Pool Address::StartDate::Balance " + newPoolAddress + "::" + newPoolStartDate + "::" + poolBalance + " ]")

    });

    it('verifies the balances after a transfer', async () => {
        let contractOwnerCoinbaseBalance = await web3.eth.getBalance(accounts[0]);
        let transferToBalance = await blockcertAltCoin.balanceOf.call(addressF);
        console.log("\t\t[ Coinbase WEI Balance::ETH " + web3.utils.fromWei(contractOwnerCoinbaseBalance,"ether") + "::" + transferToBalance );
        let successTransferResult = await blockcertAltCoin.transfer(addressF, 500);
        let transferToBalanceAfter = await blockcertAltCoin.balanceOf.call(addressF);
        let transferBalanceAfter = await web3.eth.getBalance(accounts[0]);
        console.log("\t\t[ Balance before transfer::Balance after transfer " + transferToBalance + "::" + transferToBalanceAfter);
        console.log("\t\t[ Coinbase balance before transfer::Coinbase balance after transfer " + contractOwnerCoinbaseBalance + "::" + transferBalanceAfter);
        assert( transferToBalanceAfter > transferToBalance, `Transfer to address ${addressF} must be greater than previous balance and coinbase balance must be less`);
    });

    it('verifies that a transfer fires a Transfer event', async () => {
        let res = await blockcertAltCoin.transfer(addressF, 500);
        assert(res.logs.length > 0 && res.logs[0].event == 'Transfer');
    });

    it('should throw when attempting to transfer more than the balance', async () => {
        try {
            console.log(await blockcertAltCoin.balanceOf.call(addressF) + "::" + await web3.eth.getBalance(accounts[0]));
            /* Make transfer amount from coinbase balance larger */
            let transferAmount = await web3.eth.getBalance(accounts[0]) + 10;
            console.log(transferAmount); 
            await blockcertAltCoin.transfer(addressB, transferAmount);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

});