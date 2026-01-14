import { useDeposit } from "../../hooks/useDeposit"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { DepositProps } from "../../types/types";

export default function DepositForm({ vaultAddress, assetAddress, decimals, symbol, onSuccess }: DepositProps) {
    const {
        amount, setAmount,
        isLoading, statusMessage,
        error, approval, approve, deposit,
        isSuccess
    } = useDeposit(vaultAddress, assetAddress, decimals)
    
    useEffect(() => {
        if (isSuccess && onSuccess) {
            onSuccess();
        }
    }, [isSuccess, onSuccess]);

    return(
        <div className="space-y-4">
             <div className="relative">
                <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    onKeyDown={(e) => ["-", "+", "e", "E"].includes(e.key) && e.preventDefault()}
                    disabled={isLoading} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-2xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
                    placeholder="0.0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                    {symbol}
                </span>
             </div>

             {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" /> {error}
                </div>
             )}

             {isSuccess && (
                <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 p-3 rounded-lg animate-pulse">
                    <CheckCircle className="w-4 h-4" /> Deposit Successful!
                </div>
             )}

             <button
                onClick={approval ? approve : deposit}
                disabled={isLoading || !amount || Number(amount) <= 0}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    approval 
                    ? "bg-yellow-500 hover:bg-yellow-400 text-black" 
                    : "bg-green-500 hover:bg-green-400 text-black"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
             >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {statusMessage} 
                    </>
                ) : approval ? (
                    `Approve Mock USDY`
                ) : (
                    "Deposit Assets"
                )}
             </button>
             
             <p className="text-center text-xs text-gray-500">
                {approval ? "Step 1/2: Approve Access" : "Step 2/2: Confirm Deposit"}
             </p>
        </div>
    )
}