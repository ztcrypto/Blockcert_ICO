//pragma ^0.5.11;
pragma solidity ^0.4.24;


import '/Users/jaypersanchez/BlockCerts_ICO/contracts/Utils.sol';
import '/Users/jaypersanchez/BlockCerts_ICO/contracts/interfaces/IERC20Token.sol';
import '/Users/jaypersanchez/BlockCerts_ICO/contracts/Owned.sol';

/**
    ERC20 Standard Token implementation
*/
contract BlockcertAltCoin is IERC20Token, Owned, Utils {
	string public standard;

	string public name;

	string public symbol;

	uint8 public decimals = 0;

	uint256 public totalSupply = 2100000000;

    //Based on pool addresses
	mapping (address => uint256) public balanceOf;
    /* Where unit256 is the datestame indicating start date of when a Pool is active */
    mapping (address => uint64) public listOfPools;

	mapping (address => mapping (address => uint256)) public allowance;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Convert(address indexed _from, address indexed _blockcertsAddress, uint256 _value);

	event Approval(address indexed _owner, address indexed _spender, uint256 _value);

	/**
	*	dev constructor
	*   Current pragma version throws compile error with more than 9 parameters.  Currently unable *   to pass arrays of Pool addresses from 2_initial_migration file.  
	*/
    constructor (string _standard, string _name, string _symbol, address _poolA, address _poolB, address _poolC, address _poolD, address _poolE, uint _poolInitialBalance ) public {

        standard = _standard;
        name = _name;
        symbol = _symbol;

		/* Default start date current date of migration for default 5 required pools */
        balanceOf[msg.sender] = _poolInitialBalance;
        emit Transfer(this, msg.sender, _poolInitialBalance);
		
        balanceOf[_poolA] = _poolInitialBalance;
        emit Transfer(this, _poolA, _poolInitialBalance);
		
        balanceOf[_poolB] = _poolInitialBalance;
        emit Transfer(this, _poolB, _poolInitialBalance);
		
        balanceOf[_poolC] = _poolInitialBalance;
        emit Transfer(this, _poolC, _poolInitialBalance);

		balanceOf[_poolD] = _poolInitialBalance;
        emit Transfer(this, _poolD, _poolInitialBalance);

        balanceOf[_poolE] = _poolInitialBalance;
        emit Transfer(this, _poolE, _poolInitialBalance);
	}

    function addNewPool(address newPoolAddress, uint poolBalance, uint64 startDate) public {
        require(newPoolAddress != 0x0);
        balanceOf[newPoolAddress] = poolBalance;
        listOfPools[newPoolAddress] = startDate;
    }

    function setPoolStartDate(address _poolAddress, uint64 _startDate) public {
        listOfPools[_poolAddress] = _startDate;
    }

    function getPoolStartDate(address _poolAddress) public returns(uint64) {
        return listOfPools[_poolAddress];
    }

    function getPoolBalance(address _poolAddress) public returns(uint) {
        return balanceOf[_poolAddress];
    }

    function getAltCoinInfo() public returns(string, string, string) {
        return(standard, name, symbol);
    }

    /*function increasePoolBalance(address _poolAddress, uint _amount) {

    }*/

    /*function isPoolActive(address _poolAddress) returns(bool) {
        if(now >= listOfPools[_poolAddress]) {
            return true;
        }
        else {
            return false;
        }
        return false;
    }*/

    /*function getPools() public view returns(address[] memory) {
        address[] memory ret = new listOfPools[](addressRegistryCount);
        for (uint i = 0; i < addressRegistryCount; i++) {
            ret[i] = listOfPools[i];
        }
        return ret;
    }*/


	/**
		@dev send coins
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
		allowance[_from][msg.sender] = safeSub(allowance[_from][msg.sender], _value);
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
		totalSupply = safeSub(totalSupply, _amount);

        emit Transfer(_from, this, _amount);
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
        balanceOf[this] = safeSub(balanceOf[this], _amount);
        emit Transfer(this, _to, _amount);
//        totalSupply = safeAdd(totalSupply, _amount);
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
        balanceOf[this] = safeAdd(balanceOf[this], _amount);
        emit Transfer(_from, this, _amount);
        emit Convert(_from, _blockcertsAddress, _amount);
//        totalSupply = safeSub(totalSupply, _amount);
        return true;
    }
}
