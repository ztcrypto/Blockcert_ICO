// Specifically request abstractions
var BlockcertAltCoin = artifacts.require("BlockcertAltCoin");
const utils = require('./helpers/Utils');
const BigNumber = require('bignumber.js');
var Web3 = require("web3");
const truffleAssert = require('truffle-assertions');

contract('BlockcertAltCoin', function(accounts) {
    const hostPort = '8545';
    const invalidAccount = '0x0';
    var addressB = accounts[1];
    var addressC = accounts[2];
    var addressD = accounts[3];
    var addressE = accounts[4];
    var addressF = accounts[5];
    var crowdSaleAddress = accounts[6];
    var standard = "0.1Alpha";
    var name = "ACME Alt Coin";
    var symbol = "ACME"
    var poolInitialBalance = 2100000000;
    
    let blockcertAltCoin;
    let web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:${hostPort}`));

    it("should have Blockcert Alt Coin new context", async() => {
        blockcertAltCoin = await BlockcertAltCoin.new(standard,name,symbol,addressB,addressC,addressD,addressE,addressF,poolInitialBalance, 1000000,2000000,3000000,4000000,5000000);

        console.log("\t\t[ Blockcert ALT Coin contract address :: " + blockcertAltCoin.address + " ]");
        console.log("\t\t[ Coinbase address:: " + accounts[0] + " ]");
        console.log("\t\t[ Pool B address:: " + addressB + " ]");
        console.log("\t\t[ Pool C address:: " + addressC + " ]");
        console.log("\t\t[ Pool D address:: " + addressD + " ]");
        console.log("\t\t[ Pool E address:: " + addressE + " ]");
        console.log("\t\t[ Pool F address:: " + addressF + " ]");
        console.log("\t\t[ Crowd Sale address:: " + crowdSaleAddress + " ]");
        assert(blockcertAltCoin !== undefined, 'has no BlockcertAltCoin instance');
        /*truffleAssert.eventEmitted(result, 'PoolCreated', (ev) => {
            return ev.param1 === addressB && ev.param2 === 1000000;
        });*/

    }).timeout(100000);

    it('verifies the balances after a transfer', async () => {
        let beforeTransferFromBalance = await web3.eth.getBalance(accounts[0]);
        let beforeTransferToBalance = await blockcertAltCoin.balanceOf.call(addressF);
        await blockcertAltCoin.transfer(addressF, 500);
        console.log("\t\t[ Balances before transfer FROM::TO\t " + beforeTransferFromBalance + "::" + beforeTransferToBalance + " ]");
        let afterTransferFromBalance = await web3.eth.getBalance(accounts[0]);
        let afterTransferToBalance = await blockcertAltCoin.balanceOf.call(addressF);
        assert( afterTransferToBalance > beforeTransferToBalance, `Transfer to address ${addressF} must be greater than previous balance and coinbase balance must be less`);
    });

    it('verifies that a transfer fires a Transfer event', async () => {
        let res = await blockcertAltCoin.transfer(addressF, 500);
        console.log("[\t\tres Result :: " + res + " ]");
        assert(res.logs.length > 0 && res.logs[0].event == 'Transfer');
    });

    it('should throw when attempting to transfer more than the balance', async () => {
        try {
            console.log(await blockcertAltCoin.balanceOf.call(addressF) + "::" + await web3.eth.getBalance(accounts[0]));
            let transferAmount = await web3.eth.getBalance(accounts[0]) + 10;
            console.log(transferAmount); 
            await blockcertAltCoin.transfer(addressB, transferAmount);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when attempting to transfer to an invalid address', async () => {
        try {
            await blockcertAltCoin.transfer(invalidAccount, 10);
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    it('should throw when attempting to transfer from to an invalid account', async () => {
        await blockcertAltCoin.approve(addressB, 100);
        try {
            await blockcertAltCoin.transferFrom(accounts[0], invalidAccount, 50, { from: accounts[1] });
            assert(false, "didn't throw");
        }
        catch (error) {
            return utils.ensureException(error);
        }
    });

    

});