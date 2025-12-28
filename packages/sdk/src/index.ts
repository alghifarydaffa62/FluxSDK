import { 
  parseUnits, 
  formatUnits,
  type PublicClient, 
  type WalletClient,
  type Address
} from 'viem';
import { mantleSepoliaTestnet } from 'viem/chains';
import { FLUX_VAULT_ABI, FLUX_FACTORY_ABI, ERC20_ABI } from './abi/FluxABI';

const VAULT_ABI = FLUX_VAULT_ABI
const FACTORY_ABI = FLUX_FACTORY_ABI
const ERC20ABI = ERC20_ABI

export class FluxSDK {
  publicClient: PublicClient;
  walletClient?: WalletClient; 
  chainId: number;

  constructor(publicClient: PublicClient, walletClient?: WalletClient, chainId: number = 5003) {
    this.publicClient = publicClient;
    this.walletClient = walletClient;
    this.chainId = chainId
  }

  // ==========================================
  // READ FUNCTIONS 
  // ==========================================

  async getVaultTVL(vaultAddress: Address): Promise<string> {
    const data = await this.publicClient.readContract({
      address: vaultAddress,
      abi: VAULT_ABI,
      functionName: 'totalAssets',
    });

    return formatUnits(data, 18);
  }

  async previewDeposit(vaultAddress: Address, amount: string): Promise<string> {
    const amountInWei = parseUnits(amount, 18);
    
    const shares = await this.publicClient.readContract({
      address: vaultAddress,
      abi: VAULT_ABI,
      functionName: 'convertToShares',
      args: [amountInWei]
    });

    return formatUnits(shares, 18);
  }

  async getAllVaults(factoryAddress: Address) {
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
  async approve(tokenAddress: Address, vaultAddress: Address, amount: string): Promise<string> {
    if (!this.walletClient || !this.walletClient.account) throw new Error("Wallet not connected!");
    
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

  async deposit(vaultAddress: Address, amount: string): Promise<string> {
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

  async createVault(factoryAddress: Address, assetToken: Address, name: string, symbol: string): Promise<string> {
    if (!this.walletClient || !this.walletClient.account) throw new Error("Wallet not connected!");

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