import { VaultStatsProps } from "../../types/types";
import { Wallet } from "lucide-react";

export default function VaultStats({ data }: VaultStatsProps) {
    return(
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
                    {data.assetAddress.slice(0, 10)}...{data.assetAddress.slice(-10)}
                    </a>
                </div>
            </div>
        </div>
    )
}