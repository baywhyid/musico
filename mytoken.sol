// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyToken {
    string public name = "AITHEO";
    string public symbol = "AITH";
    uint8 public decimals = 18;

    uint public totalSupply;
    address public owner;

    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    constructor(uint _initialSupply) {
        owner = msg.sender;

        uint supply = _initialSupply * (10 ** decimals);
        totalSupply = supply;
        balanceOf[msg.sender] = supply;

        emit Transfer(address(0), msg.sender, supply); // mint awal
    }

    function transfer(address _to, uint _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Saldo kurang");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value) public returns (bool) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns (bool) {
        require(balanceOf[_from] >= _value, "Saldo kurang");
        require(allowance[_from][msg.sender] >= _value, "Allowance kurang");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;
    }

    function mint(address _to, uint _amount) public {
        require(msg.sender == owner, "Bukan owner");

        uint amountWithDecimals = _amount * (10 ** decimals);

        balanceOf[_to] += amountWithDecimals;
        totalSupply += amountWithDecimals;

        emit Transfer(address(0), _to, amountWithDecimals);
    }
}