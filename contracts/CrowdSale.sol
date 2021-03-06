pragma solidity ^0.6.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract CrowdSale is Ownable
{

	uint constant public softCap = 300000 * 1 ether;

	uint constant public startDate = 1513942254;

	uint constant public endDate = 1523942254;

	uint constant public price = 1000000000000000;

	uint public amountRaised;

	IERC20 public tokenReward;

	mapping (address => uint256) public balanceOf;

	bool public crowdSaleClosed = false;

	bool public crowdSalePaused = false;

	event FundTransfer(address backer, uint amount, bool isContribution);

	/**
	 * Constrctor function
	 *
	 * Setup the owner
	 */
    constructor (address addressOfTokenUsedAsReward) public {
		tokenReward = IERC20(addressOfTokenUsedAsReward);
	}

	/**
	 * Fallback function
	 *
	 * The function without name is the default function that is called whenever anyone sends funds to a contract
	 */
	// receive() payable external {
	// 	require(!crowdSaleClosed);
	// 	require(!crowdSalePaused);
	// 	require(startDate <= now);
	// 	require(endDate >= now);

	// 	uint contractTokenBalance = tokenReward.balanceOf(this);
	// 	require(contractTokenBalance > 0);

	// 	uint amount = msg.value;
	// 	uint tokenAmount = amount / price;

	// 	if (tokenAmount > contractTokenBalance) {
	// 		tokenAmount = contractTokenBalance;
	// 	}

	// 	amount = tokenAmount * price;
	// 	if (amount < msg.value) {
	// 		msg.sender.transfer(msg.value - amount);
	// 	}

	// 	balanceOf[msg.sender] += amount;
	// 	amountRaised += amount;
	// 	tokenReward.transfer(msg.sender, tokenAmount);
	// 	emit FundTransfer(msg.sender, amount, true);
	// }

	/**
		Set or off pause crowdsale
		@param _pause - true or false (1 or 0)
	*/
	function setPauseStatus(bool _pause) external onlyOwner {
		require(amountRaised >= softCap);
		crowdSalePaused = _pause;
	}


	/**
		Close crowdsale
	*/
	function closeCrowdsale() external onlyOwner {
		require(amountRaised >= softCap);
		crowdSaleClosed = true;
	}

	/**
	 * Withdraw the funds
	 *
	 * Checks to see if goal or time limit has been reached, and if so, and the funding goal was reached,
	 * sends the entire amount to the owner. If goal was not reached, each contributor can withdraw
	 * the amount they contributed.
	 */
	// function safeWithdrawal() external onlyOwner {
	// 	require(crowdSaleClosed || endDate < now || tokenReward.balanceOf(this) == 0);
	// 	owner.transfer(address(this).balance);
	// }
}
