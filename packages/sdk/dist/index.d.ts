import { type PublicClient, type WalletClient, type Address } from 'viem';
export declare class FluxSDK {
    publicClient: PublicClient;
    walletClient?: WalletClient;
    chainId: number;
    constructor(publicClient: PublicClient, walletClient?: WalletClient, chainId?: number);
    getVaultTVL(vaultAddress: Address): Promise<string>;
    previewDeposit(vaultAddress: Address, amount: string): Promise<string>;
    getAllVaults(factoryAddress: Address): Promise<readonly {
        vaultAddress: `0x${string}`;
        assetAddress: `0x${string}`;
        name: string;
        symbol: string;
    }[]>;
    approve(tokenAddress: Address, vaultAddress: Address, amount: string): Promise<string>;
    deposit(vaultAddress: Address, amount: string): Promise<string>;
    createVault(factoryAddress: Address, assetToken: Address, name: string, symbol: string): Promise<string>;
}
