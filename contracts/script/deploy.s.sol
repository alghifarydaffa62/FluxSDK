// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {FluxFactory} from "../src/FluxFactory.sol";

contract DeployFlux is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        FluxFactory factory = new FluxFactory();
        console.log("Flux Factory Deployed at:", address(factory));

        vm.stopBroadcast();
    }
}