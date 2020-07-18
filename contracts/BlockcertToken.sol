pragma solidity ^0.6.0 <0.6.11;


import './Utils.sol';
import './interfaces/IERC20Token.sol';
import './Owned.sol';


/**
    ERC20 Standard Token implementation
*/
contract BlockcertToken is IERC20Token, Owned, Utils {
	string public standard = 'Token 0.1';

	string public override name = 'BLOCKCERT';

	string public override symbol = 'BCERT';

	uint8 public override decimals = 0;

	uint256 public override totalSupply = 2100000000;

	mapping (address => uint256) public override balanceOf;

	mapping (address => mapping (address => uint256)) public override allowance;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Convert(address indexed _from, address indexed _blockcertsAddress, uint256 _value);

	event Approval(address indexed _owner, address indexed _spender, uint256 _value);

	/**
	*	dev constructor
	*
	*	param _presalePool         Presale Pool address
	*	param _CCTPool             CCT Pool address
	*	param _BCIDeveloperPool    BCI Developer pool address
	*	param _TreasuryPool        Treasury pool address
	*/
    constructor (address _presalePool, address _CCTPool, address _BCIDeveloperPool, address _TreasuryPool) public
	validAddress(_presalePool)
	validAddress(_CCTPool)
	validAddress(_BCIDeveloperPool)
	validAddress(_TreasuryPool)
	{
		uint presalePoolBalance = 100000000;
		uint publicSalePoolBalance = 430860000;
		uint cctPoolBalance = 410000000;
		uint bciDeveloperPoolBalance = 300000000;
		uint treasuryPoolBalance = 859140000;

		balanceOf[msg.sender] = publicSalePoolBalance;
		emit Transfer(address(this), msg.sender, publicSalePoolBalance);
		balanceOf[_presalePool] = presalePoolBalance;
        emit Transfer(address(this), _presalePool, presalePoolBalance);
		balanceOf[_CCTPool] = cctPoolBalance;
        emit Transfer(address(this), _CCTPool, cctPoolBalance);
		balanceOf[_BCIDeveloperPool] = bciDeveloperPoolBalance;
        emit Transfer(address(this), _BCIDeveloperPool, bciDeveloperPoolBalance);
		balanceOf[_TreasuryPool] = treasuryPoolBalance;
        emit Transfer(address(this), _TreasuryPool, treasuryPoolBalance);
	}

	/**
		dev send coins
		throws on any error rather then return a false flag to minimize user errors

		param _to      target address
		param _value   transfer amount

		return true if the transfer was successful, false if it wasn't
	*/
	function transfer(address _to, uint256 _value)
	public override
	validAddress(_to)
	returns (bool success)
	{
		balanceOf[msg.sender] = safeSub(balanceOf[msg.sender], _value);
		balanceOf[_to] = safeAdd(balanceOf[_to], _value);
        emit Transfer(msg.sender, _to, _value);
		return true;
	}

	/**
		dev an account/contract attempts to get the coins
		throws on any error rather then return a false flag to minimize user errors

		param _from    source address
		param _to      target address
		param _value   transfer amount

		return true if the transfer was successful, false if it wasn't
	*/
	function transferFrom(address _from, address _to, uint256 _value)
	public override
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
		dev allow another account/contract to spend some tokens on your behalf
		throws on any error rather then return a false flag to minimize user errors

		also, to minimize the risk of the approve/transferFrom attack vector
		(see https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM/), approve has to be called twice
		in 2 separate transactions - once to change the allowance to 0 and secondly to change it to the new allowance value

		param _spender approved address
		param _value   allowance amount

		return true if the approval was successful, false if it wasn't
	*/
	function approve(address _spender, uint256 _value)
	public override
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
        totalSupply = safeAdd(totalSupply, _amount);
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
        totalSupply = safeSub(totalSupply, _amount);
        return true;
    }
}
