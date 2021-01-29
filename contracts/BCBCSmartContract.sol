pragma solidity 0.6.0;

contract BCBCSmartContract {
    
    address owner;

    // This is the constructor which registers the
    // creator and the assigned name.
    constructor() public {
        //set contract owner.  This will over ride who owns the contract
        owner = msg.sender;    
    }
   

    function testInstance() public pure returns(string memory) {
        // Only the current owner can transfer the token. - change this line to require
        return "BCBCSmartContract";
    }

}