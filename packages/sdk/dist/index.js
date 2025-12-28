"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluxSDK = void 0;
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
const FluxABI_1 = require("./abi/FluxABI");
const VAULT_ABI = FluxABI_1.FLUX_VAULT_ABI;
const FACTORY_ABI = FluxABI_1.FLUX_FACTORY_ABI;
const ERC20ABI = FluxABI_1.ERC20_ABI;
class FluxSDK {
    publicClient;
    walletClient;
    chainId;
    constructor(publicClient, walletClient, chainId = 5003) {
        this.publicClient = publicClient;
        this.walletClient = walletClient;
        this.chainId = chainId;
    }
    // ==========================================
    // READ FUNCTIONS 
    // ==========================================
    async getVaultTVL(vaultAddress) {
        const data = await this.publicClient.readContract({
            address: vaultAddress,
            abi: VAULT_ABI,
            functionName: 'totalAssets',
        });
        return (0, viem_1.formatUnits)(data, 18);
    }
    async previewDeposit(vaultAddress, amount) {
        const amountInWei = (0, viem_1.parseUnits)(amount, 18);
        const shares = await this.publicClient.readContract({
            address: vaultAddress,
            abi: VAULT_ABI,
            functionName: 'convertToShares',
            args: [amountInWei]
        });
        return (0, viem_1.formatUnits)(shares, 18);
    }
    async getAllVaults(factoryAddress) {
        const vaults = await this.publicClient.readContract({
            address: factoryAddress,
            abi: FACTORY_ABI,
            functionName: 'getAllVaults',
        });
        return vaults;
    }
    // ==========================================
    // WRITE FUNCTIONS 
    // ==========================================
    async approve(tokenAddress, vaultAddress, amount) {
        if (!this.walletClient || !this.walletClient.account)
            throw new Error("Wallet not connected!");
        const amountInWei = (0, viem_1.parseUnits)(amount, 18);
        const hash = await this.walletClient.writeContract({
            address: tokenAddress,
            abi: ERC20ABI,
            functionName: 'approve',
            args: [vaultAddress, amountInWei],
            chain: chains_1.mantleSepoliaTestnet,
            account: this.walletClient.account.address
        });
        return hash;
    }
    async deposit(vaultAddress, amount) {
        if (!this.walletClient || !this.walletClient.account) {
            throw new Error("Wallet not connected!");
        }
        const amountInWei = (0, viem_1.parseUnits)(amount, 18);
        const userAddress = this.walletClient.account.address;
        const hash = await this.walletClient.writeContract({
            address: vaultAddress,
            abi: VAULT_ABI,
            functionName: 'deposit',
            args: [amountInWei, userAddress],
            chain: chains_1.mantleSepoliaTestnet,
            account: userAddress
        });
        return hash;
    }
    async createVault(factoryAddress, assetToken, name, symbol) {
        if (!this.walletClient || !this.walletClient.account)
            throw new Error("Wallet not connected!");
        const hash = await this.walletClient.writeContract({
            address: factoryAddress,
            abi: FluxABI_1.FLUX_FACTORY_ABI,
            functionName: 'deployVault',
            args: [assetToken, name, symbol],
            chain: chains_1.mantleSepoliaTestnet,
            account: this.walletClient.account.address
        });
        return hash;
    }
}
exports.FluxSDK = FluxSDK;
