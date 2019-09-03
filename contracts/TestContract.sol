pragma solidity ^0.4.24;


import './Utils.sol';
import './interfaces/IERC20Token.sol';
import './Owned.sol';

contract TestContract is IERC20Token, Owned, Utils {

    constructor(bytes32[] accounts) public {

    }

}