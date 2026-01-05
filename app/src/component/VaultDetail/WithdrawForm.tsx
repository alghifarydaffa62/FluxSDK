import { useWithdraw } from "../../hooks/useWithdraw";
import { WithdrawProps } from "../../types/types";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function WithdrawForm({ vaultAddress, decimals, symbol, maxBalance, onSuccess }: WithdrawProps) {
    const {
        amount, setAmount,
        isLoading, statusMessage,
        error, handleWithdraw,
        isSuccess, txHash
    } = useWithdraw(vaultAddress, decimals)

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
                    disabled={isLoading}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-2xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50 pr-36 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0.0"
                />
                
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                    <button 
                        onClick={() => setAmount(maxBalance)}
                        disabled={isLoading}
                        className="text-xs font-bold bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-red-400 transition-colors"
                    >
                        MAX
                    </button>

                    <span className="text-gray-500 font-bold font-mono select-none">
                        {symbol}
                    </span>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" /> {error}
                </div>
            )}

            {isSuccess && (
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 p-3 rounded-lg animate-pulse">
                        <CheckCircle className="w-4 h-4" /> Withdraw Successful!
                    </div>
                    {txHash && (
                        <a 
                            href={`https://sepolia.mantlescan.xyz/tx/${txHash}`}
                            target="_blank"
                            rel="noreferrer" 
                            className="block text-xs text-center text-gray-500 hover:text-white underline"
                        >
                            View Transaction
                        </a>
                    )}
                </div>
            )}

            <button
                onClick={handleWithdraw}
                disabled={isLoading || !amount || Number(amount) <= 0}
                className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-900/20"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {statusMessage}
                    </>
                ) : (
                    "Withdraw Assets"
                )}
            </button>
        </div>
    )
}