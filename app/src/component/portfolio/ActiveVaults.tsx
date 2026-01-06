import { TrendingUp } from "lucide-react"

export default function ActiveVaults({total}: {total: number}) {
    return(
        <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl group hover:border-blue-500/50 transition-colors">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
               <TrendingUp className="w-6 h-6" />
             </div>
             <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Active Vaults</p>
           </div>
           
           <p className="text-4xl font-bold text-white font-mono">
             {total} <span className="text-lg text-gray-500 font-sans font-normal">Positions</span>
           </p>
        </div>
    )
}