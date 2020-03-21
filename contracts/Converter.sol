pragma solidity ^0.4.26 <0.6.0;


import './Owned.sol';


contract Converter is Owned {

    event Mint(address indexed _to, address indexed _fromEthereumAddress, uint256 _value);

    event Convert(address indexed _from, address indexed _toEthereumAddress, uint256 _value);

    constructor() public {}

    /**
        @dev send funds to the account after him freezed tokens on ethereum network

        @param _to                      funds receiver
        @param _fromEthereumAddress     frozen tokens account
        @param _value                   amount of frozen tokens
    */
    function mint(address _to, address _fromEthereumAddress, uint256 _value) public ownerOnly {
        emit Mint(_to, _fromEthereumAddress, _value);
        _to.transfer(_value);
    }

    /**
        @dev freeze funds for receive they on the ethereum network

        @param _ethereumAddress       ethereum network account to which funds must be transferred
    */
    function convert(address _ethereumAddress) public payable returns (bool success) {
        emit Convert(msg.sender, _ethereumAddress, msg.value);
        return true;
    }

    function () public payable {}

}