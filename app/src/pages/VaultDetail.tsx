import { useVaultData } from "../hooks/useVaultData"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Loader2, Wallet, Coins, TrendingUp, AlertCircle } from 'lucide-react';
import { useState } from "react";

export default function VaultDetail() {
    const { vaultAddress } = useParams<{ vaultAddress: string }>()
    const { data, error, isLoading, refetch } = useVaultData(vaultAddress)
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
    const navigate = useNavigate()

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
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="p-4 bg-red-500/10 rounded-full text-red-500">
                <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Failed to load Vault</h2>
            <p className="text-gray-400 max-w-md text-center">{error || "Vault not found"}</p>
            <button 
                onClick={() => navigate('/dashboard/vaults')}
                className="text-green-400 hover:underline"
            >
            &larr; Back to all vaults
            </button>
        </div>
        );
    }

    return(
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="space-y-4">
                <button 
                    onClick={() => navigate('/dashboard/vaults')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Vaults
                </button>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-green-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-green-400">
                            <Coins className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">{data.name}</h1>
                            <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                                <span>{data.symbol}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                <span className="truncate max-w-37.5">{data.address}</span>
                            </div>
                        </div>
                    </div>
                
                    <button 
                        onClick={() => refetch()}
                        className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Refresh Data"
                    >
                        <TrendingUp className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-500 text-xs uppercase font-bold mb-2">Total Value Locked</p>
                    <p className="text-2xl font-bold text-white font-mono">
                        {data.formattedTVL} <span className="text-sm text-gray-500">{data.symbol}</span>
                    </p>
                </div>

                {/* Card: User Balance */}
                <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-500 text-xs uppercase font-bold mb-2">Your Deposit</p>
                    <p className="text-2xl font-bold text-white font-mono">
                        {data.formattedUserBalance} <span className="text-sm text-gray-500">{data.symbol}</span>
                    </p>
                </div>

                {/* Card: Asset Info */}
                <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-500 text-xs uppercase font-bold mb-2">Underlying Asset</p>
                    <div className="flex items-center gap-2 text-green-400 font-mono text-sm truncate">
                        <Wallet className="w-4 h-4" />
                        <a 
                            href={`https://sepolia.mantlescan.xyz/address/${data.assetAddress}`}
                            target="_blank" 
                            rel="noreferrer"
                            className="hover:underline truncate"
                        >
                        {data.assetAddress}
                        </a>
                    </div>
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
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-200 text-sm">
                                🚧 <strong>Deposit Component Here</strong> <br/>
                                Nanti kita masukin form deposit di sini. <br/>
                                Butuh: Input Amount, Tombol Approve, Tombol Deposit.
                            </div>
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