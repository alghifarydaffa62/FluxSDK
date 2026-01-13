import { Dispatch, SetStateAction, FormEvent } from 'react';
import { Address } from 'viem';
import { VaultStatsInfo } from '@flux_protocol/flux-sdk';
import { PortfolioItem } from '@flux_protocol/flux-sdk';

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

export interface HeaderVaultDetail {
    address: Address;
    name: string;
    symbol: string;
}

export interface HeaderProps {
    data: HeaderVaultDetail;
    onRefresh: () => void; 
}

export interface VaultStatsProps {
    data: VaultStatsInfo;
}

export interface DepositProps {
    vaultAddress: Address;
    assetAddress: Address;
    symbol: string;
    decimals: number;
    onSuccess?: () => void;
}

export interface WithdrawProps {
    vaultAddress: Address;
    decimals: number;
    symbol: string;
    maxBalance: string;
    onSuccess?: () => void;
}

export interface PositionProps {
    position: PortfolioItem
}

export interface StatCardProps {
    protocolTVL: number;
    userNetWorth: number;
    yieldGenerated: number;
}