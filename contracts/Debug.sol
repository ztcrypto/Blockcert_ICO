pragma solidity ^0.4.26 <0.6.0;

contract Debug {
	struct FakeBlock {
	uint timestamp;
	}

	FakeBlock block;

	uint now;

	function setBlockTime(uint val) public {
		now = val;
		block.timestamp = val;
	}
}