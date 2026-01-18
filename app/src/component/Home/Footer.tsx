import { Github, Twitter } from 'lucide-react';

export default function Footer() {
    return(
        <footer className="bg-white border-t border-zinc-200 py-12 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-sm">F</span>
                        </div>
                        <span className="text-xl font-bold text-zinc-900">Flux</span>
                    </div>
                    <p className="text-zinc-600 text-sm">
                    The infrastructure layer for tokenized real-world assets.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold text-zinc-900 mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-zinc-600">
                        <li><a href="#" className="hover:text-zinc-900">About</a></li>
                        <li><a href="#" className="hover:text-zinc-900">Features</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-zinc-900 mb-4">Developers</h4>
                    <ul className="space-y-2 text-sm text-zinc-600">
                        <li><a href="https://flux-sdk.gitbook.io/flux-sdk-docs/" target='_blank' className="hover:text-zinc-900">Documentation</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-zinc-900 mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-zinc-600">
                        <li><a href="#" className="hover:text-zinc-900">About</a></li>
                        <li><a href="#" className="hover:text-zinc-900">Blog</a></li>
                        <li><a href="#" className="hover:text-zinc-900">Careers</a></li>
                        <li><a href="#" className="hover:text-zinc-900">Contact</a></li>
                    </ul>
                </div>
            </div>

            <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-zinc-600">
                    © 2025 Flux Protocol. Powered by Mantle Network.
                </p>
                <div className="flex gap-6">
                    <a href="#" className="text-zinc-600 hover:text-zinc-900">
                    <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-zinc-600 hover:text-zinc-900">
                    <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
    )
}