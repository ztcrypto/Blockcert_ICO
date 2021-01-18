pragma solidity ^0.6.0 <0.6.11;

import './Utils.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol';

/**
    ERC20 Standard Token implementation
*/
contract BlockcertToken is ERC20Burnable, ERC20Pausable, Ownable, Utils {
	string public standard = 'Token 0.1';

	/**
	*	@dev constructor
	*
	*	param _presalePool         Presale Pool address
	*	param _CCTPool             CCT Pool address
	*	param _BCIDeveloperPool    BCI Developer pool address
	*	param _TreasuryPool        Treasury pool address
	*/
    constructor (address _presalePool, address _CCTPool, address _BCIDeveloperPool, address _TreasuryPool) public
	ERC20("BLOCKCERT", "BCERT")
	{
		_mint(msg.sender, 2100000000);
		uint presalePoolBalance = 100000000;
		uint publicSalePoolBalance = 430860000;
		uint cctPoolBalance = 410000000;
		uint bciDeveloperPoolBalance = 300000000;
		uint treasuryPoolBalance = 859140000;

		_mint(msg.sender, publicSalePoolBalance);
		emit Transfer(address(this), msg.sender, publicSalePoolBalance);
		_mint(_presalePool, presalePoolBalance);
        emit Transfer(address(this), _presalePool, presalePoolBalance);
		_mint(_CCTPool, cctPoolBalance);
        emit Transfer(address(this), _CCTPool, cctPoolBalance);
		_mint(_BCIDeveloperPool, bciDeveloperPoolBalance);
        emit Transfer(address(this), _BCIDeveloperPool, bciDeveloperPoolBalance);
		_mint(_TreasuryPool, treasuryPoolBalance);
        emit Transfer(address(this), _TreasuryPool, treasuryPoolBalance);
	}

	/**
		 @dev renounceOwnership disabled
	*/

	function renounceOwnership() public override {
			revert("renouncing ownership is blocked");
	}
	function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override(ERC20, ERC20Pausable) {
		super._beforeTokenTransfer(from, to, amount);
	}
}
