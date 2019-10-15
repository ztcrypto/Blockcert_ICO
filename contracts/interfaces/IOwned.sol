pragma solidity ^0.4.24 <0.6.0;

/*
    Owned contract interface
*/
contract IOwned {
    // this function isn't abstract since the compiler emits automatically generated getter functions as external
    function owner() public pure returns (address) {}

    function transferOwnership(address _newOwner) public;
    function acceptOwnership() public;
}
