import { useVaultData } from "../hooks/useVaultData"
import { useParams, useNavigate } from "react-router-dom"
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from "react";
import { useConnections } from "wagmi";
import Header from "../component/VaultDetail/Header";
import VaultStats from "../component/VaultDetail/VaultStats";
import BackButton from "../component/BackButton";
import DepositForm from "../component/VaultDetail/DepositForm";
import WithdrawForm from "../component/VaultDetail/WithdrawForm";

export default function VaultDetail() {
    const { vaultAddress } = useParams<{ vaultAddress: string }>()
    const { data, error, isLoading, refetch } = useVaultData(vaultAddress)
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
    const connection = useConnections()
    const navigate = useNavigate()

    useEffect(() => {
        if(connection.length == 0) {
            navigate('/')
        }
    }, [connection, navigate])

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

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl flex items-start gap-3">
                <span className="text-xl">💡</span>
                <div className="text-sm">
                    <p className="font-semibold text-blue-700 dark:text-blue-300">
                        Need Testnet Assets?
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 mt-1">
                        To test the feature, you need Mock USDY. 
                        <a 
                            href="/dashboard/faucet" 
                            className="underline font-bold hover:text-blue-800 ml-1"
                            >
                            Mint tokens at Faucet ↗
                        </a>
                    </p>
                </div>
            </div>

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
                        <div>
                            <WithdrawForm 
                                vaultAddress={data.address} 
                                decimals={data.decimals} 
                                symbol={data.symbol}
                                maxBalance={data.formattedUserBalance}
                                onSuccess={() => refetch()}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}