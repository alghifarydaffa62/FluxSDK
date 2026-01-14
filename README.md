# Flux Protocol

Flux is the infrastructure layer designed to unlock the liquidity of Real World Assets (RWA) on the Mantle Network. It acts as a universal liquid wrapper, transforming rigid assets (like USDY or T-Bills) into composable, yield-bearing **ERC-4626 vaults**.

By standardizing RWAs into the ERC-4626 format, Flux ensures that these assets can be seamlessly integrated into the broader DeFi ecosystem (Lending markets, DEXs, and Yield Aggregators) with minimal friction.

## Project Overview

Real World Assets are often fragmented and technically complex to integrate. Flux solves this by providing:

1.  **Liquid Wrappers:** A smart contract factory that wraps arbitrary assets into compliant ERC-4626 vaults.
2.  **Developer SDK:** A fully typed TypeScript SDK (`@flux_protocol/flux-sdk`) for easy integration.
3.  **Asset Management Dashboard:** A UI for asset managers to deploy vaults and for investors to manage their portfolios.

## Repository Structure

This project is organized as a monorepo.

## Tech Stack

* **Blockchain:** Mantle Network (Sepolia Testnet)
* **Contracts:** Solidity, Hardhat/Foundry, ERC-4626 Standard
* **Frontend:** Wagmi, Vite, Tailwindcss, Rainbow Wallet, Framer Motion
* **SDK:** TypeScript, Viem

## Getting Started

### Prerequisites

* Node.js (v18 or higher)
* pnpm (recommended) or npm/yarn

### Installation

1.  Create a new directory:
    ```bash
    mdkir my-project
    cd my-project
    ```

2.  Install Flux SDK:
    ```bash
    npm install @flux_protocol/flux-sdk
    # or
    yarn install @flux_protocol/flux-sdk
    ```

## Smart Contracts (Mantle Sepolia)

| Contract | Address | Description |
|Data | Value | Description |
| :--- | :--- | :--- |
| **FluxFactory** | `0x7f0A1F76F2Bc41Cae039801C2A93712743069491` | Factory contract to deploy new RWA Vaults |
| **Vault Implementation** | `0xEB5CCf37Bc988374B9F397dE7d1a69721afdf8FB` | Base logic for the Mock USDY ERC-4626 vaults |
| **Mock USDY** | `0xAd6E3094496DcBd3C720Afa758e7086F71cBD702 ` | Testnet token for simulation |

> *Note: Contracts are currently deployed on Mantle Sepolia Testnet for demonstration purposes.*

## SDK Usage

The core logic of Flux is encapsulated in our SDK, which is available on NPM.

## Example usage to fetch vault data:
```Typescript
import { FluxSDK } from '@flux_protocol/flux-sdk';
import { createPublicClient, http } from 'viem';
import { mantleSepolia } from 'viem/chains';

const client = createPublicClient({ 
  chain: mantleSepolia, 
  transport: http() 
});

const sdk = new FluxSDK(client);

// Fetch specific vault details
const vaultInfo = await sdk.getVaultInfo('0xVaultAddress...');
console.log(vaultInfo.formattedTVL);
```

### Further documentation visit: https://flux-sdk.gitbook.io/flux-sdk-docs/

# Disclaimer & Support

### ⚠️ Risk Warning

Flux Protocol is currently in the **Beta / MVP stage** and is deployed on the **Mantle Sepolia Testnet** for demonstration purposes only.

* **No Real Value:** Assets used in this dApp (e.g., Mock USDY, Mock T-Bills) are simulated tokens and hold **zero financial value**.
* **Audit Status:** The smart contracts have **not yet been audited** by a third-party security firm.
* **Use at Your Own Risk:** While we strive for security, experimental software may contain bugs. Do not use this protocol with real funds on Mainnet until an official release is announced.

### 📞 Contact & Support

Need integration help or have questions about the SDK?

* **Email:** daffa.alghifary62@gmail.com