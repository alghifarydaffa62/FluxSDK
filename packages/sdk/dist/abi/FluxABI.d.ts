export declare const ERC20_ABI: {
    type: string;
    name: string;
    inputs: {
        name: string;
        type: string;
        internalType: string;
    }[];
    outputs: {
        name: string;
        type: string;
        internalType: string;
    }[];
    stateMutability: string;
}[];
export declare const FLUX_FACTORY_ABI: readonly [{
    readonly type: "function";
    readonly name: "allVaults";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "vaultAddress";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "assetAddress";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "name";
        readonly type: "string";
        readonly internalType: "string";
    }, {
        readonly name: "symbol";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "deployVault";
    readonly inputs: readonly [{
        readonly name: "_asset";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "_name";
        readonly type: "string";
        readonly internalType: "string";
    }, {
        readonly name: "_symbol";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "getAllVaults";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple[]";
        readonly internalType: "struct FluxFactory.VaultInfo[]";
        readonly components: readonly [{
            readonly name: "vaultAddress";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "assetAddress";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "name";
            readonly type: "string";
            readonly internalType: "string";
        }, {
            readonly name: "symbol";
            readonly type: "string";
            readonly internalType: "string";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "event";
    readonly name: "VaultDeployed";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "asset";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "name";
        readonly type: "string";
        readonly indexed: false;
        readonly internalType: "string";
    }, {
        readonly name: "symbol";
        readonly type: "string";
        readonly indexed: false;
        readonly internalType: "string";
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "InvalidNameOrSymbol";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ZeroAddress";
    readonly inputs: readonly [];
}];
export declare const FLUX_VAULT_ABI: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_asset";
        readonly type: "address";
        readonly internalType: "contract IERC20";
    }, {
        readonly name: "_name";
        readonly type: "string";
        readonly internalType: "string";
    }, {
        readonly name: "_symbol";
        readonly type: "string";
        readonly internalType: "string";
    }, {
        readonly name: "_admin";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "allowance";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "approve";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "asset";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "balanceOf";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "convertToAssets";
    readonly inputs: readonly [{
        readonly name: "shares";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "convertToShares";
    readonly inputs: readonly [{
        readonly name: "assets";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "decimals";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint8";
        readonly internalType: "uint8";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "deposit";
    readonly inputs: readonly [{
        readonly name: "assets";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "receiver";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "emergencyRescue";
    readonly inputs: readonly [{
        readonly name: "token";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "maxDeposit";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "maxMint";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "maxRedeem";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "maxWithdraw";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "mint";
    readonly inputs: readonly [{
        readonly name: "shares";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "receiver";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "name";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "owner";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "pause";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "paused";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "previewDeposit";
    readonly inputs: readonly [{
        readonly name: "assets";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "previewMint";
    readonly inputs: readonly [{
        readonly name: "shares";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "previewRedeem";
    readonly inputs: readonly [{
        readonly name: "shares";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "previewWithdraw";
    readonly inputs: readonly [{
        readonly name: "assets";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "redeem";
    readonly inputs: readonly [{
        readonly name: "shares";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "receiver";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "renounceOwnership";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "symbol";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "totalAssets";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "totalSupply";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "transfer";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "transferFrom";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "transferOwnership";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "unpause";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "withdraw";
    readonly inputs: readonly [{
        readonly name: "assets";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "receiver";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "event";
    readonly name: "Approval";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "spender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Deposit";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "owner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "assets";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "shares";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "OwnershipTransferred";
    readonly inputs: readonly [{
        readonly name: "previousOwner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "newOwner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Paused";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Transfer";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Unpaused";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Withdraw";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "receiver";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "owner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "assets";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "shares";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "ERC20InsufficientAllowance";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "allowance";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "needed";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InsufficientBalance";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "balance";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "needed";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InvalidApprover";
    readonly inputs: readonly [{
        readonly name: "approver";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InvalidReceiver";
    readonly inputs: readonly [{
        readonly name: "receiver";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InvalidSender";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InvalidSpender";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC4626ExceededMaxDeposit";
    readonly inputs: readonly [{
        readonly name: "receiver";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "assets";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "max";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC4626ExceededMaxMint";
    readonly inputs: readonly [{
        readonly name: "receiver";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "shares";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "max";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC4626ExceededMaxRedeem";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "shares";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "max";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC4626ExceededMaxWithdraw";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "assets";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "max";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "EnforcedPause";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ExpectedPause";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "OwnableInvalidOwner";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "OwnableUnauthorizedAccount";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "SafeERC20FailedOperation";
    readonly inputs: readonly [{
        readonly name: "token";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ZeroAddress";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ZeroAssets";
    readonly inputs: readonly [];
}];
