import { ArrowLeft, Coins, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { HeaderProps } from "../../types/types"

export default function Header({ data, onRefresh }: HeaderProps) {
    const navigate = useNavigate()

    return(
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
                    onClick={onRefresh}
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    title="Refresh Data"
                >
                    <TrendingUp className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}