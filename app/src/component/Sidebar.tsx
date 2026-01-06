import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Vault, 
  Wallet, 
  Hammer, 
} from 'lucide-react';
import { useConnection } from 'wagmi';

const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS

const MENU_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/dashboard/vaults', label: 'Vaults', icon: Vault },
  { path: '/dashboard/portfolio', label: 'Portfolio', icon: Wallet },
  { path: '/dashboard/create', label: 'Create Vaults', icon: Hammer, adminOnly: true }, 
];

export default function Sidebar() {
    const { address } = useConnection()

    const filteredMenu = MENU_ITEMS.filter((item) => {
        if (item.adminOnly) {
            return address && address.toLowerCase() === ADMIN_ADDRESS.toLowerCase();
        }

        return true
    })

    return(
        <aside className="w-64 bg-[#0A0A0A] border-r border-white/5 flex flex-col h-full font-sans">
            <div className="h-20 flex items-center px-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-bold">F</div>
                    <span className="text-lg font-semibold text-white tracking-wide">Flux Protocol</span>
                </div>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1">
                {filteredMenu.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/dashboard'} 
                    className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden
                    ${isActive 
                        ? 'bg-white/5 text-white border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.03)]' 
                        : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
                    }
                    `}
                >
                    <item.icon className={`w-5 h-5 transition-colors ${({ isActive }: any) => isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
                    
                    <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Status</p>
                    <div className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                        <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        System Operational
                    </div>
                </div>
            </div>
        </aside>
  )
}