import { useEffect } from "react";
import { useConnections } from "wagmi";
import { useNavigate } from "react-router-dom";
import useFetchVaults from "../hooks/useFetchVaults";
import VaultBox from "../component/VaultBox";
import { Loader2, AlertCircle } from "lucide-react";
import ErrorMessage from "../component/ErrorMessage";

export default function Vaults() {
    const connection = useConnections()
    const navigate = useNavigate()

    useEffect(() => {
        if(connection.length == 0) {
            navigate('/')
        }
    }, [connection, navigate])
    
    const { vaults, isLoading, error } = useFetchVaults()

    return(
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Available Vaults</h1>
                <p className="text-gray-400">Choose a vault to deposit your RWA tokens and start earning yield.</p>
            </div>

            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-green-500" />
                    <p>Fetching vaults from blockchain...</p>
                </div>
            )}

            {error && !isLoading && (
                <ErrorMessage message={error}/>
            )}

            {!isLoading && !error && vaults.length === 0 && (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                    <p className="text-gray-400 mb-4">No vaults found yet.</p>
                    <button 
                        onClick={() => navigate('/dashboard/create')}
                        className="text-green-400 hover:underline"
                    >
                        Create your first vault?
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vaults.map((vault) => (
                    <VaultBox key={vault.vaultAddress} vault={vault} />
                ))}
            </div>
        </div>
    )
}