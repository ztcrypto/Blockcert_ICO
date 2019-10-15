#Blockcert Alt-Coin Description


#Alt Coin SOW Phase 1
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

## Usecase Diagram

<img src="./Blockcert Alt-Coin Deployment Sequence.png" width="500">


#Blockcert Alt Coin Usage
Constructor requires 14 parameters: version number of the alt coin smart contract, name of the company that owns the migrated Blockcert Alt-Coin, symbol for the alt-coin.  The alt-coin smart contract requires five wallet addresses that will be used as pools, next parameter is the overall total supply of the alt-coin.  The remaining 5 parameters are initial balances for each pool.  The initial pool balances should equate to the total supply.

#Developer API Key for development purposes

A wallet address must be certified in the BCBC network and must go through KYC process.  Below is the wallet address that's been certified in the BCBC network that can be used for development purposes.

Wallet Address: 0xB4974728A226702dA7d9a6B9892699aC917D82cF
Private Key: DB206DB4DD74CC1757CEDEBFAA7AE019DAB874A746465D838ED3264E2DF8C0C5

Wallet Address: 0x71b7330971044867EC3534b4997eea365e55c3BC
Private Key: 678bd406de816db51a3ca2f132053aadbe6b7ed984b3bde244800b88fe610c80

apiKey: CBD21B31-FE54-4459-8BB9-75E31CF3DB31

#Deploy contract and interface with alt coin in Geth
1. Must get both ABI and Binary of contract.  Use solc command. Change directory to BlockCerts_ICO
        solc -o ./AbiBin --bin --abi ./contracts/BlockcertAltCoin.sol ./contracts/Utils.sol ./contracts/interfaces/IERC20Token.sol ./contracts/Owned.sol ./contracts/interfaces/IOwned.sol
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

#MongoDB
* Install mongodb: npm install mongodb


#JDevAltCoin Pragma5
truffle version 5 is installed locally.  Local Truffle commands is located in based directory:
        ./node_modules/truffle/build/cli.bundled.js
To migrate using local Truffle:  ./node_modules/truffle/build/cli.bundled.js migrate --compile-all --reset --network ganache_ui



