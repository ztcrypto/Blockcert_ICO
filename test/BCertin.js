// Specifically request abstractions
var BCertin = artifacts.require("BCertin");
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
    var name = "BCertin Alt Coin";
    var symbol = "BCertin"
    var poolInitialBalance = 500000000;
    const ownerBalance = 430860000;
    const totalSupply = 2100000000;

    let blockcertAltCoin;
    let web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:${hostPort}`));

    it("Should have accounts the same as the instance that has been deployed", async() => {
        console.log(accounts)
    }).timeout(100000)

    it("should have Blockcert Alt Coin new context", async() => {
        let altCoin = await BCertin.new(standard, name, symbol, addressB, addressC, addressD, addressE, addressF, totalSupply, 1000000,2000000,3000000,4000000,5000000 );
        assert(altCoin !== undefined, 'has no BlockcertAltCoin instance');
    }).timeout(100000);


   /* it("should have Alt Coin info", async() => {
        let altCoin = await BlockcertAltCoin.new(standard, name, symbol, addressB, addressC, addressD, addressE, addressF, totalSupply, 1000000,2000000,3000000,4000000,5000000 );
        let altCoinInfo =  await altCoin.getAltCoinInfo.call();
        console.log("\t\t[Alt Coin Info:: " + altCoinInfo[0] + "::" + altCoinInfo[1] + "::" + altCoinInfo[2] + " ]");
        assert.equal(altCoinInfo[0], standard, "Standard Version not the same");
        assert.equal(altCoinInfo[1], name, "Alt Coin name not the same");
        assert.equal(altCoinInfo[2], symbol, "Alt Coin symbol not the same");
    }).timeout(100000);*/

    it("should have balance", async() => {
        let altCoin = await BCertin.new(standard, name, symbol, addressB, addressC, addressD, addressE, addressF, totalSupply, 1000000,2000000,3000000,4000000,5000000 );
        altCoinBalance = (await altCoin.getPoolBalance.call( addressB )).toNumber();
        assert.isAbove(altCoinBalance, 0, addressB + " is greater than 0");
    }).timeout(100000);


    it('verifies the balances after a transfer', async () => {
        let blockcertAltCoin = await BCertin.new(standard, name, symbol, addressB, addressC, addressD, addressE, addressF, totalSupply, 1000000,2000000,3000000,4000000,5000000 );
        let contractOwnerCoinbaseBalance = await web3.eth.getBalance(accounts[0]);
        let transferToBalance = await blockcertAltCoin.balanceOf.call(addressF);
        console.log("\t\t[ Coinbase WEI Balance::ETH " + web3.utils.fromWei(contractOwnerCoinbaseBalance,"ether") + "::" + transferToBalance );
        let successTransferResult = await blockcertAltCoin.transfer(addressF, 500);
        let transferToBalanceAfter = await blockcertAltCoin.balanceOf.call(addressF);
        let transferBalanceAfter = await web3.eth.getBalance(accounts[0]);
        console.log("\t\t[ Balance before transfer::Balance after transfer " + transferToBalance + "::" + transferToBalanceAfter);
        console.log("\t\t[ Coinbase balance before transfer::Coinbase balance after transfer " + contractOwnerCoinbaseBalance + "::" + transferBalanceAfter);
        assert( transferToBalanceAfter > transferToBalance, `Transfer to address ${addressF} must be greater than previous balance and coinbase balance must be less`);
    }).timeout(100000);

    
    it('verifies that a transfer fires a Transfer event', async () => {
        let blockcertAltCoin = await BCertin.new(standard, name, symbol, addressB, addressC, addressD, addressE, addressF, totalSupply, 1000000,2000000,3000000,4000000,5000000 );
        let res = await blockcertAltCoin.transfer(addressF, 500);
        assert(res.logs.length > 0 && res.logs[0].event == 'Transfer');
    }).timeout(100000);

    it('should throw when attempting to transfer more than the balance', async () => {
        try {
            let blockcertAltCoin = await BCertin.new(standard, name, symbol, addressB, addressC, addressD, addressE, addressF, totalSupply, 1000000,2000000,3000000,4000000,5000000 );
            console.log(await blockcertAltCoin.balanceOf.call(addressF) + "::" + await web3.eth.getBalance(accounts[0]));
            
            let transferAmount = await web3.eth.getBalance(accounts[0]) + 10;
            console.log(transferAmount); 
            await blockcertAltCoin.transfer(addressB, transferAmount);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    }).timeout(100000);

    it("Should be able to transfer between Pool Accounts", async () => {
        let blockcertAltCoin = await BCertin.new(standard, name, symbol, addressB, addressC, addressD, addressE, addressF, totalSupply, 1000000,2000000,3000000,4000000,5000000 );
        let addressB_balanceB = await blockcertAltCoin.balanceOf.call(addressB);
        let addressC_balanceB = await blockcertAltCoin.balanceOf.call(addressC)
        console.log( "Balance Before Transfer :: " + addressB_balanceB );
        console.log( "Balance Before Transfer :: " + addressC_balanceB );
        result = await blockcertAltCoin.transferFrom(addressB, addressC, 3333);
        let addressB_balanceA = await blockcertAltCoin.balanceOf.call(addressB);
        let addressC_balanceA = await blockcertAltCoin.balanceOf.call(addressC)
        console.log( "Balance After Transfer :: " + addressB_balanceA );
        console.log( "Balance After Transfer :: " + addressC_balanceA );
        assert(addressB_balanceB < addressB_balanceA, 'Balance before transfer must be less than balance after transfer');
        assert(addressC_balanceB < addressC_balanceA, 'Balance before transfer must be less than the balance after transfer');

    }).timeout(100000);

});