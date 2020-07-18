pragma solidity ^0.6.0 <0.6.11;

import './interfaces/IOwned.sol';

/*
    Provides support and utilities for contract ownership
*/
contract Owned is IOwned {
	address public override owner;
	address public newOwner;

	event OwnerUpdate(address _prevOwner, address _newOwner);

	/**
		@dev constructor
	*/
	constructor () public {
		owner = msg.sender;
	}

	// allows execution by the owner only
	modifier ownerOnly {
		assert(msg.sender == owner);
		_;
	}

	/**
		@dev allows transferring the contract ownership
		the new owner still needs to accept the transfer
		can only be called by the contract owner

		@param _newOwner    new contract owner
	*/
	function transferOwnership(address _newOwner) public override ownerOnly {
		require(_newOwner != owner);
		newOwner = _newOwner;
	}

	/**
		@dev used by a new owner to accept an ownership transfer
	*/
	function acceptOwnership() public override {
		require(msg.sender == newOwner);
		emit OwnerUpdate(owner, newOwner);
		owner = newOwner;
		//newOwner = 0x0;
	}

	function getAddress() public override returns(address){
		require(msg.sender == owner);
		return msg.sender;
	}
}
