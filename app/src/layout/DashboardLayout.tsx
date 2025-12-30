import Sidebar from "../component/Sidebar"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Vault, 
  Wallet, 
  Hammer, 
} from 'lucide-react';

const MENU_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/dashboard/vaults', label: 'Vaults', icon: Vault },
  { path: '/dashboard/portfolio', label: 'Portfolio', icon: Wallet },
  { path: '/dashboard/create', label: 'Create Vaults', icon: Hammer }, // Admin features biasanya ditaruh bawah
];

export default function DashboardLayout() {
    const location = useLocation();

    const currentTitle = MENU_ITEMS.find(item => item.path === location.pathname)?.label || 'Flux Interface';

    return (
        <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden font-sans selection:bg-white/20">
        
        <Sidebar />

        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <header className="h-20 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between px-8 z-10 sticky top-0">
                <div>
                    <h2 className="text-2xl font-semibold text-white tracking-tight">{currentTitle}</h2>
                    <p className="text-xs text-gray-500 font-mono mt-1">
                    Protocol V1 • Mantle Sepolia
                    </p>
                </div>

                <div>
                    <ConnectButton showBalance={false} />
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white/5 via-[#0A0A0A] to-[#0A0A0A] pointer-events-none -z-10"></div>

                <div className="max-w-6xl mx-auto z-10 relative">
                    <Outlet />
                </div>
            </main>

        </div>
        </div>
    );
}