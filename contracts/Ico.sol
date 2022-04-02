// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Ico {
    uint public tokenPrice = 10;
    address payable public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor () {
        owner = payable(msg.sender); // the publisher of the contract becomes the owner
    }

    // @notice Will receive any eth sent to the contract
    receive() external payable {
        buyTokens();
    }

    mapping(address => uint) public balances; // keep track of how many tokens each address should have

    function buyTokens() public payable {
        uint amountOfJnsTokens = calculateAmountOfJnsTokens(msg.value);
        balances[msg.sender] = amountOfJnsTokens;
        // Give tokens to contract owner.
        owner.transfer(msg.value);
    }

    function calculateAmountOfJnsTokens(uint _weiAmount) view internal returns(uint) {
        uint etherAmount = _weiAmount / (10**18); // convert to eth
        uint jnsTokens = etherAmount * tokenPrice; // Default is, 1 eth gives 10 tokens.
        return jnsTokens;
    }

    function changeTokenPrice(uint _newTokenPrice) public onlyOwner {
        tokenPrice = _newTokenPrice;
    }

}