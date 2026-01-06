import { PositionProps } from "../../types/types"
import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function PositionBox({ position }: PositionProps) {
    const navigate = useNavigate()

    return(
        <div 
            key={position.address} 
            onClick={() => navigate(`/dashboard/vaults/${position.address}`)}
            className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center hover:bg-white/5 transition-all cursor-pointer group"
        >
            <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center font-bold text-gray-300">
                    {position.symbol.substring(0, 2)}
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">{position.name}</h3>
                    <p className="text-gray-500 text-sm font-mono">{position.symbol}</p>
                </div>
            </div>

            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                    <p className="font-bold text-white text-xl font-mono">{position.balance}</p>
                    <p className="text-xs text-green-400 font-mono">≈ ${position.balanceUsd.toFixed(2)}</p>
                </div>
                
                <ArrowRight className="text-gray-600 group-hover:text-white transition-colors" />
            </div>
        </div>
    )
}