import { useNavigate } from "react-router-dom"
import { AlertCircle } from "lucide-react"

export default function BackButton({error}: any) {
    const navigate = useNavigate()

    return(
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
    )
}