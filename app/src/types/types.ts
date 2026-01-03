import { Dispatch, SetStateAction, FormEvent } from 'react';
import { Address } from 'viem';
export interface VaultData {
    vaultAddress: string;
    assetAddress: string;
    name: string;
    symbol: string;
    totalAssets?: string;
}

export interface VaultInfo {
    address: Address;
    name: string;
    symbol: string;
    decimals: number;
    assetAddress: Address;
    totalAssets: bigint;
    userShareBalance: bigint;
    userAssetValue: bigint;
    formattedTVL: string;
    formattedUserBalance: string;
}

export interface VaultFormData {
    asset: string;
    name: string;
    symbol: string;
}

export interface CreateVaultFormProps {
    formData: VaultFormData;
    setFormData: Dispatch<SetStateAction<VaultFormData>>;
    handleSubmit: (e: FormEvent) => void;
    isLoading: boolean;
    isSuccess: boolean;
}

export interface CreateVaultButtonProps {
    isLoading: boolean;
    isSuccess: boolean;
}