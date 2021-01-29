pragma solidity ^0.6.0 <0.6.11;

/*
    Owned contract interface
*/
interface  IOwned {
    // this function isn't abstract since the compiler emits automatically generated getter functions as external
    function owner() external returns (address);
    function transferOwnership(address _newOwner) external;
    function acceptOwnership() external;
    function getAddress() external returns(address);
}
