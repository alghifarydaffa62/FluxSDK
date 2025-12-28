import { 
  parseUnits, 
  formatUnits,
  type PublicClient, 
  type WalletClient,
  type Address
} from 'viem';
import { mantleTestnet } from 'viem/chains'; 

const VAULT_ABI = [
  {
    name: 'deposit',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'assets', type: 'uint256' }, { name: 'receiver', type: 'address' }],
    outputs: [{ name: 'shares', type: 'uint256' }]
  },
  {
    name: 'totalAssets',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'convertToShares',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'assets', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }]
  }
] as const;

export class FluxSDK {
  publicClient: PublicClient;
  walletClient?: WalletClient; 

  constructor(publicClient: PublicClient, walletClient?: WalletClient) {
    this.publicClient = publicClient;
    this.walletClient = walletClient;
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

  // ==========================================
  // WRITE FUNCTIONS 
  // ==========================================

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
      chain: mantleTestnet, 
      account: userAddress
    });

    return hash; 
  }
}