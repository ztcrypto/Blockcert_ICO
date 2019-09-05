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

#Client Package Diagram Flow

#Blockcert Alt Coin Usage
Constructor requires nine parameters: version number of the alt coin smart contract, name of the company that owns the migrated Blockcert Alt-Coin, symbol for the alt-coin.  The alt-coin smart contract requires five wallet addresses that will be used as pools and the ninth parameter is the initial balance for the first five default pools.

Blockcert Alt-Coin is the current Blockcert Token smart contract implementation.  The alt-coin version allows the owner of the alt-coin to define as many pools of coin distribution as the client want.  The owner can also define when a certain pool of coin distribution will become active.

A number of functions have been added to the Alt-Coin contract that gives the alt-coin owner more control.  These functions will allow the contract owner to add future pools.  There are functions that the owner can call to get information of current pools in the contract as well as functions that return information about the Alt-Coin itself.




