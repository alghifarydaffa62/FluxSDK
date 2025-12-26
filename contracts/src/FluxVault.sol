// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract FluxVault is ERC4626, Ownable {
    constructor(IERC20 _asset, string memory _name, string memory _symbol, address _initialOwner)
        ERC4626(_asset)
        ERC20(_name, _symbol)
        Ownable(_initialOwner)
    {}
}
