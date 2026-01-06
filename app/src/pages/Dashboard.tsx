import { useConnection, useConnections } from "wagmi"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDashboard } from "../hooks/useDashboard"
import StatCards from "../component/Dashboard/StatCards"
import { Loader2 } from "lucide-react"

export default function Dashboard() {
    const { address } = useConnection()
    const connection = useConnections()
    const navigate = useNavigate()

    const { stats, isLoading } = useDashboard()

    useEffect(() => {
        if(connection.length == 0) {
            navigate('/')
        }
    }, [connection, navigate])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="w-10 h-10 animate-spin text-green-500" />
            </div>
        );
    }

    return(
        <div className="space-y-8 pb-20 max-w-6xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                    <h1 className="text-gray-400 mt-1">Hello, {address?.slice(0, 10)}...{address?.slice(-10)}</h1>
                    <p className="text-gray-400 mt-1">Welcome back, here is what's happening today.</p>
                </div>
                <div className="text-right hidden md:block">
                   <p className="text-xs text-gray-500 uppercase font-bold">Network Status</p>
                   <div className="flex items-center gap-2 text-green-400 text-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Mantle Sepolia Testnet
                   </div>
                </div>
            </div>
            <StatCards
                protocolTVL={stats.protocolTVL}
                userNetWorth={stats.userNetWorth}
                yieldGenerated={stats.yieldGenerated}
            />
        </div>
    )
}