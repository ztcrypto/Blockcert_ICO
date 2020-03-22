# Blockcert Alt-Coin Description


# Alt Coin SOW Phase 1
1.	Review the ICO contract we used to deploy BCERT Tokens
        a.	Modify this ICO Contract with the Pools for an Alt-Coin Token that will be         called SCRIPT Token
        b.	SCRIPT Tokens will operate on the BCBC
        c.	Where BCERT Tokens had a set number of BCERTs in the ICO contract, SCRIPT will     have a variable set by the Admin for future pools
                i.	Pool number 1 will be set
                ii.	Pool number 2 will be a “VAR” variable set by an admin and a date set      by an admin
                iii.    Pool number 3 … will be a “VAR” variable – so this is an open              contract for the creation of the Token
        d.	Run a test on BCBC Test Net
        e.	Tie to BCBC Digital Wallet 
2.	Work with James (and Parshanth) to determine the set-up of the BCBC Nodes on the Linux     Servers

# Client Package Diagram Flow

#Blockcert Alt Coin Usage
Constructor requires nine parameters: version number of the alt coin smart contract, name of the company that owns the migrated Blockcert Alt-Coin, symbol for the alt-coin.  The alt-coin smart contract requires five wallet addresses that will be used as pools and the ninth parameter is the initial balance for the first five default pools.

Blockcert Alt-Coin is the current Blockcert Token smart contract implementation.  The alt-coin version allows the owner of the alt-coin to define as many pools of coin distribution as the client want.  The owner can also define when a certain pool of coin distribution will become active.

A number of functions have been added to the Alt-Coin contract that gives the alt-coin owner more control.  These functions will allow the contract owner to add future pools.  There are functions that the owner can call to get information of current pools in the contract as well as functions that return information about the Alt-Coin itself.


# Developer API Key for development purposes

A wallet address must be certified in the BCBC network and must go through KYC process.  Below is the wallet address that's been certified in the BCBC network that can be used for development purposes.

Wallet Address: 0xB4974728A226702dA7d9a6B9892699aC917D82cF
Private Key: DB206DB4DD74CC1757CEDEBFAA7AE019DAB874A746465D838ED3264E2DF8C0C5

Wallet Address: 0x71b7330971044867EC3534b4997eea365e55c3BC
Private Key: 678bd406de816db51a3ca2f132053aadbe6b7ed984b3bde244800b88fe610c80

apiKey: CBD21B31-FE54-4459-8BB9-75E31CF3DB31

# Deploy contract and interface with alt coin in Geth
1. Must get both ABI and Binary of contract.  Use solc command
        solc -o ../AbiBin --bin --abi ./BlockcertAltCoin.sol /Users/jaypersanchez/BlockCerts_ICO/contracts/Utils.sol /Users/jaypersanchez/BlockCerts_ICO/contracts/interfaces/IERC20Token.sol /Users/jaypersanchez/BlockCerts_ICO/contracts/Owned.sol /Users/jaypersanchez/BlockCerts_ICO/contracts/interfaces/IOwned.sol
2. Clone https://gitlab.1to1core.com/1to1core/blockcerts-smart-contracts
        i. Copy content from the ABI output and paste in the the ABI.js
        ii. Copy content from BIN output and paste in the ByteCode.js file
        iii. from blockcerts-smart-contracts, run "npm start".  This will deploy the smart contract in the BCBC network.  Make sure to note the contract address and contract deployed hash
        iiii. Open terminal and run geth command: geth attach http://node2.blockcerts.com:6111
3. Create instance of BlockcertAltCoin smart contract in Geth
        i. On the geth command console create the following
                var BlockcertAltCoin = web3.eth.contract(<copy and paste the ABI from the ABI file>)
                var altCoinInstance = BlockcertAltCoin.at(<paste the contract deployed address>)
                altCoinInstance.getAltCoinInfo.call() //you should get an output of the alt coin info passed from the constructor

# JDevAltCoin Pragma5
trulle version 5 is installed locally.  Local Truffle commands is located in based directory:
        ./node_modules/truffle/build/cli.bundled.js
To migrate using local Truffle:  ./node_modules/truffle/build/cli.bundled.js migrate --compile-all --reset --network ganache_ui


# Pragma5 Compile Error Changes
* the address reference of "this" needed to be explicitly converted to address data type with syntax address(this)
* Pragma line required to change to: pragma solidity ^0.5.11;
* Required to enable the ABI v2 Coder: pragma experimental ABIEncoderV2;
* Previous declaration errors from interface contracts:
        /Users/jaypersanchez/blockcerts_pragma5/BlockCerts_ICO/contracts/BlockcertAltCoin.sol:15:2: DeclarationError: Identifier already declared.
        string public name;
        ^----------------^
        
        "/blockcerts_pragma5/BlockCerts_ICO/contracts/interfaces/IERC20Token.sol:8:5: The previous declaration is here:
    function name() public pure returns (string memory) {}"
    ^----------------------------------------------------^
* /blockcerts_pragma5/BlockCerts_ICO/contracts/Converter.sol:24:9: TypeError: "send" and "transfer" are only available for objects      of type "address payable", not "address".
        _to.transfer(_value);
        ^----------^

## Truffle Console Commands

### Create Smart Contract Instance

`BlockcertAltCoin.deployed().then(function(instance){script=instance;})`

### Get wallet address balance

`(await script.getPoolBalance.call(WALLET_ADDRESS)).toNumber()`
`web3.eth.getBalance(smartcontract.address);`
`(await script.getContractOwnerBalance.call(script.address)).toNumber()`


truffle(ganache_cli)> (await script.getPoolBalance.call('0xEf676be27d61B66DCA9e44edAB51551DAC3C07Ba')).toNumber()
1000000
truffle(ganache_cli)> (await script.getPoolBalance.call('0x86CAC31a4B144C55466e2114DABd1889B6abc1BE')).toNumber()
2000000
truffle(ganache_cli)> (await script.getContractOwnerBalance.call(script.address)).toNumber()
2085000000
truffle(ganache_cli)> await script.transferFrom('0xEf676be27d61B66DCA9e44edAB51551DAC3C07Ba', '0x86CAC31a4B144C55466e2114DABd1889B6abc1BE',525)


### Setup for Infura on Ropsten Network 

1. Install Metamask in Chrome
2. Go to https://faucet.metamask.io and choose "request 1 ether from faucet".  Follow instruction here on how to get 1 Ether to test, https://blog.bankex.org/how-to-buy-ethereum-using-metamask-ccea0703daec


