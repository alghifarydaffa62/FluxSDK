import { Wallet } from "lucide-react"

export default function NetWorthBox({ netWorth }: { netWorth: number }) {
    return(
        <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-green-500/50 transition-colors">
           <div className="absolute top-0 right-0 p-32 bg-green-500/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
           
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
               <Wallet className="w-6 h-6" />
             </div>
             <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Net Worth</p>
           </div>
           
           <p className="text-4xl font-bold text-white font-mono">
             ${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}
           </p>
        </div>
    )
}