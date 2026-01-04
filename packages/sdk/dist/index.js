import { parseUnits, formatUnits } from 'viem';
import { mantleSepoliaTestnet } from 'viem/chains';
import { FLUX_VAULT_ABI, FLUX_FACTORY_ABI, ERC20_ABI } from './abi/FluxABI';
const VAULT_ABI = FLUX_VAULT_ABI;
const FACTORY_ABI = FLUX_FACTORY_ABI;
const ERC20ABI = ERC20_ABI;
export class FluxSDK {
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
    async getVaultInfo(vaultAddress, userAddress) {
        if (!vaultAddress)
            throw new Error("Vault address required");
        const vaultContract = {
            address: vaultAddress,
            abi: VAULT_ABI
        };
        const [name, symbol, decimals, asset, totalAssets] = await Promise.all([
            this.publicClient.readContract({ ...vaultContract, functionName: 'name' }),
            this.publicClient.readContract({ ...vaultContract, functionName: 'symbol' }),
            this.publicClient.readContract({ ...vaultContract, functionName: 'decimals' }),
            this.publicClient.readContract({ ...vaultContract, functionName: 'asset' }),
            this.publicClient.readContract({ ...vaultContract, functionName: 'totalAssets' }),
        ]);
        let userShareBalance = 0n;
        let userAssetValue = 0n;
        if (userAddress) {
            userShareBalance = await this.publicClient.readContract({
                ...vaultContract,
                functionName: 'balanceOf',
                args: [userAddress]
            });
            if (userShareBalance > 0n) {
                userAssetValue = await this.publicClient.readContract({
                    ...vaultContract,
                    functionName: 'convertToAssets',
                    args: [userShareBalance]
                });
            }
        }
        return {
            address: vaultAddress,
            name: name,
            symbol: symbol,
            decimals: Number(decimals),
            assetAddress: asset,
            totalAssets: totalAssets,
            userShareBalance: userShareBalance,
            userAssetValue: userAssetValue,
            formattedTVL: formatUnits(totalAssets, Number(decimals)),
            formattedUserBalance: formatUnits(userAssetValue, Number(decimals))
        };
    }
    async getVaultTVL(vaultAddress) {
        const data = await this.publicClient.readContract({
            address: vaultAddress,
            abi: VAULT_ABI,
            functionName: 'totalAssets',
        });
        return formatUnits(data, 18);
    }
    async previewDeposit(vaultAddress, amount) {
        const amountInWei = parseUnits(amount, 18);
        const shares = await this.publicClient.readContract({
            address: vaultAddress,
            abi: VAULT_ABI,
            functionName: 'convertToShares',
            args: [amountInWei]
        });
        return formatUnits(shares, 18);
    }
    async getAllVaults(factoryAddress) {
        const vaults = await this.publicClient.readContract({
            address: factoryAddress,
            abi: FACTORY_ABI,
            functionName: 'getAllVaults',
        });
        return vaults;
    }
    async getAllowance(vaultAddress, assetAddress, owner) {
        const allowance = await this.publicClient.readContract({
            address: assetAddress,
            abi: ERC20ABI,
            functionName: "allowance",
            args: [owner, vaultAddress]
        });
        return allowance;
    }
    // ==========================================
    // WRITE FUNCTIONS 
    // ==========================================
    async approve(tokenAddress, vaultAddress, amount) {
        if (!this.walletClient || !this.walletClient.account)
            throw new Error("Wallet not connected!");
        const amountInWei = parseUnits(amount, 18);
        const hash = await this.walletClient.writeContract({
            address: tokenAddress,
            abi: ERC20ABI,
            functionName: 'approve',
            args: [vaultAddress, amountInWei],
            chain: mantleSepoliaTestnet,
            account: this.walletClient.account.address
        });
        return hash;
    }
    async deposit(vaultAddress, amount) {
        if (!this.walletClient || !this.walletClient.account) {
            throw new Error("Wallet not connected!");
        }
        const amountInWei = parseUnits(amount, 18);
        const userAddress = this.walletClient.account.address;
        const hash = await this.walletClient.writeContract({
            address: vaultAddress,
            abi: VAULT_ABI,
            functionName: 'deposit',
            args: [amountInWei, userAddress],
            chain: mantleSepoliaTestnet,
            account: userAddress
        });
        return hash;
    }
    async createVault(factoryAddress, assetToken, name, symbol) {
        if (!this.walletClient || !this.walletClient.account)
            throw new Error("Wallet not connected!");
        const hash = await this.walletClient.writeContract({
            address: factoryAddress,
            abi: FLUX_FACTORY_ABI,
            functionName: 'deployVault',
            args: [assetToken, name, symbol],
            chain: mantleSepoliaTestnet,
            account: this.walletClient.account.address
        });
        return hash;
    }
}
