// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Erc20Token is ERC20 {
    // An address type variable is used to store ethereum accounts.
    address public owner;

    constructor() ERC20("ERC20Token", "ERC20") {
        _mint(msg.sender, 1000000 * 18 ** decimals());
        owner = msg.sender;
        console.log("owner", owner);
    }
}
