pragma solidity ^0.4.17;

contract Owned {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    
    function Owned() public {
        owner = msg.sender;
    }

    function setOwner(address _owner) external onlyOwner() {
        owner = _owner;
    }

}