import { Hammer } from "lucide-react"

export default function CreateVaultHeader() {
    return(
        <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
                <Hammer className="w-6 h-6 text-green-400" />
            </div>
                Factory (Admin)
            </h1>
            <p className="text-gray-400">
                Deploy a new ERC-4626 Vault wrapper for any ERC-20 token on Mantle.
            </p>
        </div>
    )
}