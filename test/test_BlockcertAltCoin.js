// Specifically request abstractions
var BlockcertAltCoin = artifacts.require("BlockcertAltCoin");
const utils = require('./helpers/Utils');
const BigNumber = require('bignumber.js');
var Web3 = require("web3");

contract('BlockcertAltCoin', function(accounts) {

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
    let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

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
        let successTransfer = await blockcertAltCoin.transfer(addressF, 500);
        let contractOwnerCoinbaseBalanceAFTER = await web3.eth.getBalance(accounts[0]);
        let transferToBalanceAFTER = await blockcertAltCoin.balanceOf.call(addressF);
        console.log("\t\t[ Coinbase WEI Balance::ETH " + web3.utils.fromWei(contractOwnerCoinbaseBalanceAFTER,"ether") + "::" + transferToBalanceAFTER );
        assert.equal(successTransfer, true, "Transfer unsuccessful");
        //assert.notEqual(transferToBalance,transferToBalanceAFTER, "Transfer balance must not equal after transfer but must be larger in amount")
        //assert.greater(transferToBalance,transferToBalanceAFTER, "Transfer balance must not equal after transfer but must be larger in amount")
        /*
        let balance;
        balance = await blockcertAltCoin.balanceOf.call(accounts[0]);
        //assert.equal(balance, new BigNumber(ownerBalance).minus(500).toNumber());
        balance = await blockcertAltCoin.balanceOf.call(accounts[5]);
        assert.equal(balance, 500, "Does not balance");*/
    });

});