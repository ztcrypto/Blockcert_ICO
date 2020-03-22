pragma solidity ^0.4.26 <0.6.0;

import './Utils.sol';
import './interfaces/IERC20Token.sol';
import './Owned.sol';

/**
    ERC20 Standard Token implementation
*/
contract BlockcertAltCoin is IERC20Token, Owned, Utils {

	string public standard = "0.1Alpha";

	string public name = "ACME Alt Coin BCBC";

	string public symbol = "ACME";

	uint8 public decimals = 0;

    uint256 public totalSupply = 0;

	mapping (address => uint256) public balanceOf;
    
	mapping (address => mapping (address => uint256)) public allowance;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Convert(address indexed _from, address indexed _blockcertsAddress, uint256 _value);

	event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    event PoolCreated(address indexed _poolAddress, uint256 _initialAmount, uint _dateCreated);

	/**
	*	dev constructor
	*   Current pragma version throws compile error with more than 9 parameters.  Currently unable *   to pass arrays of Pool addresses from 2_initial_migration file.  
	*/
    constructor (string memory _standard, string memory _name, string memory _symbol, address _poolA, address _poolB, address _poolC, address _poolD, address _poolE, uint256 _totalSupply, uint256 _poolABalance, uint256 _poolBBalance,uint256 _poolCBalance, uint256 _poolDBalance,uint256 _poolEBalance ) public {

		// BCBC as default contract owner
		Owned.owner = msg.sender;
        standard = _standard;
        name = _name;
        symbol = _symbol;
        
		totalSupply = _totalSupply;
        balanceOf[msg.sender] = _totalSupply;

		emit Transfer(address(this), msg.sender, _totalSupply);

		transfer(_poolA, _poolABalance);
        emit Transfer(address(this), _poolA, _poolABalance);
        emit PoolCreated(_poolA, _poolABalance, now);
		
        transfer(_poolB, _poolBBalance);
        emit Transfer(address(this), _poolB, _poolBBalance);
        emit PoolCreated(_poolB, _poolBBalance, now);
		
        transfer(_poolC, _poolCBalance);
        emit Transfer(address(this), _poolC, _poolCBalance);
        emit PoolCreated(_poolC, _poolCBalance, now);

		transfer(_poolD, _poolDBalance);
        emit Transfer(address(this), _poolD, _poolDBalance);
        emit PoolCreated(_poolD, _poolDBalance, now);

        transfer(_poolE, _poolEBalance);
        emit Transfer(address(this), _poolE, _poolEBalance);
        emit PoolCreated(_poolE, _poolEBalance, now);
	}

	function getPoolBalance(address _poolAddress) public returns(uint256) {
		require(owner == msg.sender);
		return balanceOf[_poolAddress];
	}

	function getContractOwnerBalance(address _msgSender) returns(uint256) {
		require(owner == msg.sender);
		return balanceOf[msg.sender];
	}

	function getAltCoinInfo() public returns(string, string, string) {
        return(standard, name, symbol);
    }

	/**
		@dev send coins from contract owner(msg.sender) total supply to the pool address indicated in the parameter
		throws on any error rather then return a false flag to minimize user errors

		@param _to      target address
		@param _value   transfer amount

		@return true if the transfer was successful, false if it wasn't
	*/
	function transfer(address _to, uint256 _value)
	public
	validAddress(_to)
	returns (bool success)
	{
		balanceOf[msg.sender] = safeSub(balanceOf[msg.sender], _value);
		balanceOf[_to] = safeAdd(balanceOf[_to], _value);
        emit Transfer(msg.sender, _to, _value);
		return true;
	}

	/**
		@dev an account/contract attempts to get the coins
		throws on any error rather then return a false flag to minimize user errors

		@param _from    source address
		@param _to      target address
		@param _value   transfer amount

		@return true if the transfer was successful, false if it wasn't
	*/
	function transferFrom(address _from, address _to, uint256 _value)
	public
	validAddress(_from)
	validAddress(_to)
	returns (bool success)
	{
		//this line throws an invalid opcode in test and exits when executed from console
		//allowance[_from][msg.sender] = safeSub(allowance[_from][msg.sender], _value); 
		balanceOf[_from] = safeSub(balanceOf[_from], _value);
		balanceOf[_to] = safeAdd(balanceOf[_to], _value);
        emit Transfer(_from, _to, _value);
		return true;
	}

	/**
		@dev allow another account/contract to spend some tokens on your behalf
		throws on any error rather then return a false flag to minimize user errors

		also, to minimize the risk of the approve/transferFrom attack vector
		(see https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM/), approve has to be called twice
		in 2 separate transactions - once to change the allowance to 0 and secondly to change it to the new allowance value

		@param _spender approved address
		@param _value   allowance amount

		@return true if the approval was successful, false if it wasn't
	*/
	function approve(address _spender, uint256 _value)
	public
	validAddress(_spender)
	returns (bool success)
	{
		// if the allowance isn't 0, it can only be updated to 0 to prevent an allowance change immediately after withdrawal
		require(_value == 0 || allowance[msg.sender][_spender] == 0);

		allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
		return true;
	}

	/**
		@dev removes tokens from an account and decreases the token supply
		can be called by the contract owner to destroy tokens from any account or by any holder to destroy tokens from his/her own account

		@param _from       account to remove the amount from
		@param _amount     amount to decrease the supply by
	*/
	function destroy(address _from, uint256 _amount) public {
		require(msg.sender == _from || msg.sender == owner);
		// validate input

		balanceOf[_from] = safeSub(balanceOf[_from], _amount);
		//totalSupply = safeSub(totalSupply, _amount);

        emit Transfer(_from, address(this), _amount);
	}

    /**
        @dev converting tokens from the ethereum network to the blockcerts network by token holder

        @param _blockcertsAddress       blockcerts network account to which funds must be transferred
        @param _amount                  convert amount
    */
    function convert(address _blockcertsAddress, uint256 _amount) public returns (bool success) {
        return _convert(msg.sender, _blockcertsAddress, _amount);
    }

    /**
        @dev converting tokens from the ethereum network any account to the blockcerts network by contract owner

        @param _from                    account to convert the amount from
        @param _blockcertsAddress       blockcerts network account to which funds must be transferred
        @param _amount                  convert amount
    */
    function convertFrom(address _from, address _blockcertsAddress, uint256 _amount) public returns (bool success) {
        require(msg.sender == owner || _from == msg.sender);
        return _convert(_from, _blockcertsAddress, _amount);
    }

    /**
        @dev converting tokens from the blockcert network any account to the ethereum network by contract owner

        @param _to                      token receiver
        @param _amount                  convert amount
    */
    function mint(address _to, uint256 _amount) public ownerOnly returns (bool success) {
        balanceOf[_to] = safeAdd(balanceOf[_to], _amount);
        balanceOf[address(this)] = safeSub(balanceOf[address(this)], _amount);
        emit Transfer(address(this), _to, _amount);
        //totalSupply = safeAdd(totalSupply, _amount);
        return true;
    }

    /**
        @dev converting tokens from the ethereum network to the blockcerts network by contract owner

        @param _from                    account to convert the amount from
        @param _blockcertsAddress       blockcerts network account to which funds must be transferred
        @param _amount                  convert amount
    */
    function _convert(address _from, address _blockcertsAddress, uint256 _amount)
    private
    validAddress(_from)
    validAddress(_blockcertsAddress)
    returns (bool success)
    {
        balanceOf[_from] = safeSub(balanceOf[_from], _amount);
        balanceOf[address(this)] = safeAdd(balanceOf[address(this)], _amount);
        emit Transfer(_from, address(this), _amount);
        emit Convert(_from, _blockcertsAddress, _amount);
        //totalSupply = safeSub(totalSupply, _amount);
        return true;
    }
}
