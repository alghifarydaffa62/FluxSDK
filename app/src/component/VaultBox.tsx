import { VaultData } from "@flux_protocol/flux-sdk"
import { Coins, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function VaultBox({ vault }: {vault: VaultData}) {
    return(
        <div className="group bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100"></div>

            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                    <Coins className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">{vault.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
                        <span>{vault.symbol}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                        <span>ERC-4626</span>
                    </div>
                </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-white/5">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Total Assets</p>
                    <p className="text-white font-mono font-medium">{vault.totalAssets}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Asset Address</p>
                    <p className="text-white font-mono text-xs truncate" title={vault.assetAddress}>
                        {vault.assetAddress.slice(0, 6)}...{vault.assetAddress.slice(-4)}
                    </p>
                </div>
            </div>

            <Link 
                to={`/dashboard/vaults/${vault.vaultAddress}`} 
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all"
            >
                Deposit <ArrowRight className="w-4 h-4" />
            </Link>

        </div>
    )
}