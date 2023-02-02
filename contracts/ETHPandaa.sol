//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Pandaa.sol";

contract ETHPandaa is Pandaa {
    constructor(address _bridge, uint256 initialSupply)
        Pandaa(_bridge, initialSupply)
    {}
}
