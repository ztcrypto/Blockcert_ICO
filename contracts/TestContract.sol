pragma solidity ^0.4.26 <0.6.0;


import './Utils.sol';
import './interfaces/IERC20Token.sol';
import './Owned.sol';

contract TestContract is IERC20Token, Owned, Utils {
    
    event Deployed(address indexed theAddr);

    constructor (address[] accounts) public {
        for(uint8 i = 0; i < accounts.length; i++) {
            emit Deployed(accounts[i]);
        }
    }

}