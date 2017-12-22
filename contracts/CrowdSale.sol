pragma solidity ^0.4.17;


import './Owned.sol';
import './SafeMath.sol';

contract CrowdSale is Owned {

    // crowdsale start date
    uint public startDate = now;
    // crowdsale end date
    uint public endDate = now + 600;

    // amount of wei we need to reach
    uint public capInWei;

    uint costInWeiPerToken;

    bool public transferEnabled;
    bool public halted = false;

    uint public publicSalePool = 430869000;
    uint public treasuryPool = 589140000;
    uint public cctPool = 410000000;
    uint public bciDeveloperPool = 300000000;


    uint public totalSupply;
    // 2.1 bln tokens
    uint public maxSupply = 2100000000;

    uint constant DECIMALS = 0;

    string public name = "BLOCKCERT";
    string public symbol = "BCERT";

    mapping (address => uint) public balanceOf;

    modifier validAddress(address _address) {
        require(_address != 0x0);
        _;
    }

    modifier validPurchase() {
        require(now >= startDate);
        require(now <= endDate);
        require(msg.value > 0);
        _;
    }

    modifier validUnHalt(){
        require(halted == false);
        _;
    }

    modifier transferAllowed() {
        require(transferEnabled == true);
        _;
    }

    function ()
        external
        transferAllowed
        validAddress(msg.sender)
        validPurchase
        validUnHalt
        payable
    {
        uint tokenAmount = msg.value / costInWeiPerToken;

        require(tokenAmount <= publicSalePool);

    }


    function CrowdSale(
        bool _transferEnabled,
        uint _costInWeiPerToken
    ) public
    {
        transferEnabled = _transferEnabled;
        costInWeiPerToken = _costInWeiPerToken;
    }

    function haltTransfer() external onlyOwner {
        
    }











}