pragma solidity ^0.8.0;

interface IToken {
    function transfer(address to, uint256 amount) external;

    function balanceOf(address account) external view returns (uint256);
}
