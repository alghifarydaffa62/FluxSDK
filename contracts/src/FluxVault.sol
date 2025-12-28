// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

contract FluxVault is ERC4626, Ownable, Pausable {
    error ZeroAssets();
    error ZeroAddress();

    constructor(IERC20 _asset, string memory _name, string memory _symbol, address _admin)
        ERC4626(_asset)
        ERC20(_name, _symbol)
        Ownable(_admin)
    {
        if (address(_asset) == address(0) || _admin == address(0)) revert ZeroAddress();
    }

    function deposit(uint256 assets, address receiver) public override whenNotPaused returns (uint256) {
        if (assets == 0) revert ZeroAssets();
        if (receiver == address(0)) revert ZeroAddress();

        return super.deposit(assets, receiver);
    }

    function mint(uint256 shares, address receiver) public override whenNotPaused returns (uint256) {
        if (shares == 0) revert ZeroAssets();
        if (receiver == address(0)) revert ZeroAddress();

        return super.mint(shares, receiver);
    }

    function withdraw(uint256 assets, address receiver, address owner)
        public
        override
        whenNotPaused
        returns (uint256)
    {
        if (receiver == address(0) || owner == address(0)) revert ZeroAddress();
        if (assets == 0) revert ZeroAssets();
        return super.withdraw(assets, receiver, owner);
    }

    function redeem(uint256 shares, address receiver, address owner) public override whenNotPaused returns (uint256) {
        if (receiver == address(0) || owner == address(0)) revert ZeroAddress();
        if (shares == 0) revert ZeroAssets();
        return super.redeem(shares, receiver, owner);
    }

    function decimals() public view virtual override(ERC4626) returns (uint8) {
        return super.decimals();
    }

    function emergencyRescue(address token) external onlyOwner {
        if (token == asset()) revert("Cannot rescue underlying asset");
        IERC20(token).transfer(msg.sender, IERC20(token).balanceOf(address(this)));
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
