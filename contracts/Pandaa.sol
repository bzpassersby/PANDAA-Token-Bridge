//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pandaa is Ownable, ERC20 {
    address public bridge;
    string private _name = "Pandaa Token";
    string private _symbol = "PANDAA";

    constructor(address _bridge, uint256 initialSupply) ERC20(_name, _symbol) {
        bridge = _bridge;
        _mint(msg.sender, initialSupply);
    }

    modifier onlyBridge() {
        require(
            msg.sender == bridge,
            "Only Bridge contract can call this function!"
        );
        _;
    }

    function bridgeMint(address _to, uint256 _amount) public onlyBridge {
        _mint(_to, _amount);
    }

    function bridgeBurn(address _owner, uint256 _amount) public onlyBridge {
        _burn(_owner, _amount);
    }

    function setBridge(address _bridge) public onlyOwner {
        bridge = _bridge;
    }
}
