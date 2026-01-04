import { useVaultData } from "../hooks/useVaultData"
import { useParams } from "react-router-dom"
import { Loader2 } from 'lucide-react';
import { useState } from "react";
import Header from "../component/VaultDetail/Header";
import VaultStats from "../component/VaultDetail/VaultStats";
import BackButton from "../component/BackButton";
import DepositForm from "../component/VaultDetail/DepositForm";

export default function VaultDetail() {
    const { vaultAddress } = useParams<{ vaultAddress: string }>()
    const { data, error, isLoading, refetch } = useVaultData(vaultAddress)
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-green-500" />
                <p className="text-gray-500">Fetching vault data from blockchain...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <BackButton error={error} />

        );
    }

    return(
        <div className="max-w-4xl mx-auto space-y-8 pb-20">

            {data && <Header data={data} onRefresh={refetch}/>}
            {data && <VaultStats data={data} />}

            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('deposit')}
                        className={`flex-1 py-4 text-sm font-bold transition-colors ${
                        activeTab === 'deposit' 
                            ? 'bg-green-500/10 text-green-400 border-b-2 border-green-500' 
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        DEPOSIT
                    </button>
                    <button
                        onClick={() => setActiveTab('withdraw')}
                        className={`flex-1 py-4 text-sm font-bold transition-colors ${
                        activeTab === 'withdraw' 
                            ? 'bg-red-500/10 text-red-400 border-b-2 border-red-500' 
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        WITHDRAW
                    </button>
                </div>

                <div className="p-8">
                    {activeTab === 'deposit' ? (
                        <div className="space-y-6">
                            <DepositForm 
                                vaultAddress={data.address}
                                assetAddress={data.assetAddress}
                                symbol={data.symbol}
                                decimals={data.decimals}
                                onSuccess={() => {
                                    refetch()
                                }}
                            />
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            Withdraw feature coming soon...
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}