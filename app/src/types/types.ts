import { Dispatch, SetStateAction, FormEvent } from 'react';

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