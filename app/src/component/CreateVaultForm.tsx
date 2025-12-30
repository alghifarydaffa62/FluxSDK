import CreateVaultButton from "./CreateVaultButton"
import { CreateVaultFormProps } from "../types/types"

export default function CreateVaultForm({ formData, setFormData, handleSubmit, isLoading, isSuccess }: CreateVaultFormProps) {
    return(
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Target Asset Address</label>
                <input 
                    type="text" 
                    placeholder="0x..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 transition-colors font-mono"
                    value={formData.asset}
                    onChange={(e) => setFormData({...formData, asset: e.target.value})}
                    required
                />
                <p className="text-xs text-gray-500">Example: USDY Address on Mantle Sepolia</p>
            </div> 

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Vault Name</label>
                    <input 
                        type="text" 
                        placeholder="Flux USDY"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 transition-colors"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Vault Symbol</label>
                    <input 
                        type="text" 
                        placeholder="fxUSDY"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-2 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 transition-colors"
                        value={formData.symbol}
                        onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                        required
                    />
                </div>
            </div> 

            <CreateVaultButton 
                isLoading={isLoading} 
                isSuccess={isSuccess}
            />
        </form>
    )
}