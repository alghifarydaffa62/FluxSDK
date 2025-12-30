import { CheckCircle } from "lucide-react";

export default function SuccessMessage({ txHash, isSuccess }: { txHash: string | null, isSuccess: boolean }) {
    if (!isSuccess || !txHash) return null;

    return (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl space-y-2 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-green-400 font-bold">
                <CheckCircle className="w-4 h-4" /> Success
            </div>
            <p className="text-sm text-gray-400">Transaction Hash:</p>
            <a 
                href={`https://sepolia.mantlescan.xyz/tx/${txHash}`}
                target="_blank"
                rel="noreferrer" 
                className="text-xs font-mono text-green-400 hover:underline break-all"
            >
                {txHash}
            </a>
        </div>
    );
}