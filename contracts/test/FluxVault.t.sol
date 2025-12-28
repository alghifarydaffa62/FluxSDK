// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {FluxVault} from "../src/FluxVault.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

contract MockUSDY is ERC20 {
    constructor() ERC20("Mock USDY", "mUSDY") {
        _mint(msg.sender, 1000000 * 10 ** 18);
    }
}

contract FluxVaultTest is Test {
    FluxVault public vault;
    MockUSDY public asset;
    
    address public admin = address(1);
    address public user = address(2);
    address public hacker = address(3);

    function setUp() public {
        vm.startPrank(admin);
        asset = new MockUSDY();
        vault = new FluxVault(asset, "Flux USDY", "fxUSDY", admin);

        asset.transfer(user, 100000 * 10**18);
        vm.stopPrank();
    }


    function test_RevertIf_DepositZero() public {
        vm.startPrank(user);
        asset.approve(address(vault), type(uint256).max);

        vm.expectRevert(FluxVault.ZeroAssets.selector);
        vault.deposit(0, user);
        vm.stopPrank();
    }


    function test_Security_HackerCannotPause() public {
        vm.startPrank(hacker);

        vm.expectRevert(abi.encodeWithSelector(
            bytes4(keccak256("OwnableUnauthorizedAccount(address)")),
            hacker
        ));
        vault.pause();
        vm.stopPrank();
    }

    function test_Security_PauseStopsDeposit() public {
        vm.prank(admin);
        vault.pause();

        vm.startPrank(user);
        uint256 amount = 100 * 10**18;
        asset.approve(address(vault), amount);

        vm.expectRevert(Pausable.EnforcedPause.selector);
        vault.deposit(amount, user);
        vm.stopPrank();
    }

    function testFuzz_DepositWithdraw(uint256 amount) public {
        amount = bound(amount, 1, 100000 * 10**18);

        vm.startPrank(user);
        asset.approve(address(vault), amount);

        uint256 shares = vault.deposit(amount, user);

        assertGt(shares, 0);
        assertEq(asset.balanceOf(address(vault)), amount);

        vault.redeem(shares, user, user);

        assertApproxEqAbs(asset.balanceOf(user), 100000 * 10**18, 1);
        
        vm.stopPrank();
    }
}