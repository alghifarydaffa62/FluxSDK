import { useEffect } from "react";
import { useConnections } from "wagmi";
import { useNavigate } from "react-router-dom";
import { usePortfolio } from "../hooks/usePortfolio";
import { Loader2 } from "lucide-react";
import NetWorthBox from "../component/portfolio/NetWorthBox";
import ActiveVaults from "../component/portfolio/ActiveVaults";
import PositionBox from "../component/portfolio/PositionBox";

export default function Portfolio() {
    const connection = useConnections()
    const navigate = useNavigate()
    const { positions, netWorth, isLoading } = usePortfolio()
    const totalPosition = positions.length

    useEffect(() => {
        if(connection.length == 0) {
            navigate('/')
        }
    }, [connection, navigate])

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-green-500" />
                <p className="text-gray-400 animate-pulse">Scanning blockchain data...</p>
            </div>
        )
    }
    
    return(
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">My Portfolio</h1>
                <p className="text-gray-400">Track your yields and active positions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NetWorthBox netWorth={netWorth}/>
                <ActiveVaults total={totalPosition}/>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Your Assets</h2>
                
                {positions.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/5">
                        <p className="text-gray-400 mb-4">You don't have any active deposits yet.</p>
                        <button 
                            onClick={() => navigate('/dashboard/vaults')}
                            className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-all"
                        >
                        Explore Vaults
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {positions.map((pos) => (
                            <PositionBox position={pos}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}