// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Ico {
    uint public tokenPrice = 1;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor () {
        owner = msg.sender; // the publisher of the contract becomes the owner
    }

    // constructor (address payable _wallet) { 
    //     owner = _wallet; // the publisher of the contract becomes the owner
    // }

    mapping(address => uint) public balances; // keep track of how many tokens each address should have

    function buyTokens(uint _ethAmount) public { // We should change this to msg.value later
        uint amountOfJnsTokens = calculateAmountOfJnsTokens(_ethAmount);
        balances[msg.sender] = amountOfJnsTokens;
    }

    function calculateAmountOfJnsTokens(uint _ethAmount) view internal returns(uint) {
        uint jnsTokens = _ethAmount * tokenPrice;
        return jnsTokens;
    }

    function changeTokenPrice(uint _newTokenPrice) public onlyOwner {
        tokenPrice = _newTokenPrice;
    }

}