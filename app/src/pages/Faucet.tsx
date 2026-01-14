import { useConnection } from "wagmi"
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useState, useEffect } from "react"
import { parseEther } from "viem"
import mUSDYABI from "../abi/MockUSDY.json"

const MOCK_USDY_ADDRESS = '0xAd6E3094496DcBd3C720Afa758e7086F71cBD702'

export default function Faucet() {
    const { address } = useConnection()
    const { writeContract, data: hash, isPending } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const [amount, setAmount] = useState('');
    const [mounted, setMounted] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (isSuccess) {
            setAmount('');
        }
    }, [isSuccess]);

    const handleMint = () => {
        if(!address) return;
        writeContract({
            address: MOCK_USDY_ADDRESS,
            abi: mUSDYABI.abi,
            functionName: 'mint',
            args: [address, parseEther(amount || '0')], 
        });
    }

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(MOCK_USDY_ADDRESS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const MAX_AMOUNT = 50000;
    const isValidAmount = Number(amount) > 0 && Number(amount) <= MAX_AMOUNT;

    if (!mounted) return null;
    
    return(
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
                <div className="w-full max-w-lg p-8 space-y-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-2xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-500 via-cyan-500 to-blue-600"></div>

                    <div className="space-y-3">
                        <h1 className="text-4xl font-black bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent tracking-tight">
                            Testnet Faucet
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            Get free <span className="font-bold text-blue-500">Mock USDY</span> to test Flux Protocol.
                        </p>
                    </div>

                    <div className="bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-left space-y-2">
                        
                        <div className="flex items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 group hover:border-blue-400 transition-colors">
                            <code className="text-sm font-mono text-gray-600 dark:text-gray-300 truncate w-full">
                                {MOCK_USDY_ADDRESS}
                            </code>
                            <button 
                                onClick={handleCopyAddress}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors text-gray-500"
                                title="Copy Address"
                            >
                                {copied ? (
                                    <span className="text-green-500 font-bold text-xs">Copied!</span>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="bg-linear-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-900/50 p-8 rounded-2xl border border-dashed border-gray-300 dark:border-zinc-700 space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">
                            Amount to Mint
                        </label>
                        
                        <div className="relative flex items-center justify-center">
                            <input 
                                type="number"
                                value={amount}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === '' || Number(val) >= 0) {
                                        setAmount(val);
                                    }
                                }}
                                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                onKeyDown={(e) => ["-", "+", "e", "E"].includes(e.key) && e.preventDefault()}
                                placeholder="0"
                                min="0" 
                                max={MAX_AMOUNT}
                                className={`w-full text-5xl font-black text-center bg-transparent focus:outline-none transition-colors placeholder-gray-200 dark:placeholder-zinc-800 ${
                                    Number(amount) > MAX_AMOUNT 
                                    ? 'text-red-500' 
                                    : 'text-blue-600 dark:text-blue-400'
                                }`}
                            />
                        </div>
                        <p className="text-sm font-bold text-gray-400">Mock USDY</p>

                        <div className="h-6 mt-2">
                            {Number(amount) > MAX_AMOUNT && (
                                <p className="text-red-500 text-xs font-bold animate-pulse bg-red-50 dark:bg-red-900/20 py-1 px-2 rounded-full inline-block">
                                    ⚠️ Max limit is {MAX_AMOUNT.toLocaleString()} per mint
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleMint}
                            disabled={isPending || isConfirming || !isValidAmount}
                            className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white shadow-xl shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-400 disabled:to-gray-500"
                        >
                            {isPending ? 'Confirming in Wallet...' : 
                             isConfirming ? 'Minting in progress...' : 
                             !isValidAmount ? 'Enter Amount' :
                             `Mint ${Number(amount).toLocaleString()} Tokens`}
                        </button>
                    </div>

                    {isSuccess && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 text-green-700 dark:text-green-400 rounded-xl text-sm font-medium flex items-center gap-3 text-left">
                            <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                                ✅
                            </div>
                            <div>
                                <p className="font-bold">Mint Successful!</p>
                                <p className="text-xs opacity-80 mt-1">
                                    Don't forget to import <span className="font-mono">{MOCK_USDY_ADDRESS.slice(0,6)}...</span> to your wallet using the button above.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    )
}