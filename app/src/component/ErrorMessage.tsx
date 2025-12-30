import { AlertCircle } from "lucide-react";

export default function ErrorMessage({message}: { message: string | null }) {
    if (!message) return null;
    return(
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
        {message}
    </div>
    )
}