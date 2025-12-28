// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {FluxVault} from "../src/FluxVault.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDY is ERC20 {
    constructor() ERC20("Mock USDY", "mUSDY") {
        _mint(msg.sender, 1000000 * 10**18);
    }
}

contract FluxVaultTest is Test {
    FluxVault public vault;
    MockUSDY public asset;

    address public user = address(1);
    address public admin = address(2);

    function setUp() public {
        vm.startPrank(admin);
        asset = new MockUSDY();

        vault = new FluxVault(
            asset,
            "Flux USDY",
            "fxUSDY",
            admin
        );
        vm.stopPrank();

        vm.startPrank(admin);
        asset.transfer(user, 1000 * 10**18);
    }

    function testDeposit() public {
        vm.startPrank(user);

        uint256 amount  = 100 * 10**18;
        asset.approve(address(vault), amount);

        uint256 shares = vault.deposit(amount, user);

        assertEq(asset.balanceOf(user), 900 * 10**18);
        assertEq(asset.balanceOf(address(vault)), amount);
        assertGt(shares, 0);

        console.log("Deposit Success!: ", shares);
        vm.stopPrank();
    }

    function testWithdraw() public {
        vm.startPrank(user);
        uint256 amount = 100 * 10**18;
        asset.approve(address(vault), amount);
        uint256 shares = vault.deposit(amount, user);

        vault.redeem(shares, user, user);

        assertEq(asset.balanceOf(user), 1000 * 10**18); 
        console.log("Withdraw Success!");
        vm.stopPrank();
    }
}