// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Token is ERC20 {
    // An address type variable is used to store ethereum accounts.
    address public owner;

    mapping(uint256 => TaskLedger[]) public taskLedgers;

    struct TaskLedger {
        uint256 taskId;
        bytes32 sysNoticeType;
        bytes32 taskTransactionType;
        bytes32 txId;
    }

    constructor() ERC20("PerformanceToken", "PTC") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
        owner = msg.sender;
        console.log("owner", owner);
    }

    /**
     * A function to transfer tokens.
     *
     * The `external` modifier makes a function *only* callable from outside
     * the contract.
     */
    function transferTo(address from, address to, uint256 amount) external {
        // Check if the transaction sender has enough tokens.
        // If `require`'s first argument evaluates to `false` then the
        // transaction will revert.
        require(msg.sender == owner, "Not owner user");
        require(balanceOf(from) >= amount, "Not enough tokens");

        console.log("Sender balance is %s tokens", balanceOf(from));
        console.log("Trying to send %s tokens to %s", amount, to);

        // Transfer the amount.
        transfer(to, amount);
    }
}
