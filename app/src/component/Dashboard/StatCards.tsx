import { ShieldCheck, TrendingUp, Users, Wallet, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { StatCardProps } from "../../types/types";

export default function StatCards({ protocolTVL, userNetWorth, yieldGenerated }: StatCardProps) {
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 bg-blue-500/10 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">Protocol TVL</span>
                </div>
                <p className="text-3xl font-bold text-white font-mono">
                    ${protocolTVL.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" /> Based on live chain data
                </p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-20 bg-green-500/10 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                        <Wallet className="w-5 h-5" />
                    </div>
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">Your Net Worth</span>
                </div>
                <p className="text-3xl font-bold text-white font-mono">
                    ${userNetWorth.toLocaleString()}
                </p>
                <div className="mt-4">
                    <Link to="/dashboard/portfolio" className="text-xs text-green-400 hover:text-white flex items-center gap-1 transition-colors">
                        View Portfolio <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        <Users className="w-5 h-5" />
                    </div>
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">Total Yield Generated</span>
                </div>
                <p className="text-3xl font-bold text-white font-mono">
                    ${yieldGenerated.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                    Paid out to liquidity providers
                </p>
            </div>
        </div>
    )
}