// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {FluxVault} from "./FluxVault.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FluxFactory {
    struct VaultInfo {
        address vaultAddress;
        address assetAddress;
        string name;
        string symbol;
    }

    VaultInfo[] public allVaults;

    event VaultDeployed(address indexed vault, address indexed asset, string name, string symbol);

    function deployVault(address _asset, string memory _name, string memory _symbol) external returns (address) {
        require(_asset != address(0), "Invalid asset Address");
        require(bytes(_name).length > 0, "Invalid name");
        require(bytes(_symbol).length > 0, "Invalid symbol");

        FluxVault newVault = new FluxVault(IERC20(_asset), _name, _symbol, msg.sender);

        allVaults.push(VaultInfo({vaultAddress: address(newVault), assetAddress: _asset, name: _name, symbol: _symbol}));

        emit VaultDeployed(address(newVault), _asset, _name, _symbol);

        return address(newVault);
    }

    function getAllVaults() external view returns (VaultInfo[] memory) {
        return allVaults;
    }
}
