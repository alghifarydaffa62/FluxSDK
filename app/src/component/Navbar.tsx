import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useState } from "react"
import { Menu, X } from 'lucide-react'
import Logo from "../asset/logo.png"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200 z-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-around items-center h-16">
                    <div className="flex items-center space-x-2">
                        <img src={Logo} alt="" className="w-20 h-20"/>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#about" className="text-zinc-600 hover:text-zinc-900 transition-colors">About</a>
                        <a href="#features" className="text-zinc-600 hover:text-zinc-900 transition-colors">Features</a>
                        <a href="https://flux-sdk.gitbook.io/flux-sdk-docs/" target="_blank" className="text-zinc-600 hover:text-zinc-900 transition-colors">Docs</a>
                    </div>

                    <ConnectButton/>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t border-zinc-200">
                    <div className="px-6 py-4 space-y-4">
                        <a href="#features" className="block text-zinc-600">Features</a>
                        <a href="#solutions" className="block text-zinc-600">Solutions</a>
                        <a href="#docs" className="block text-zinc-600">Docs</a>
                        <ConnectButton/>
                    </div>
                </div>
            )}
        </nav>
    )
}