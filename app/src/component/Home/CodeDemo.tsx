import { motion } from 'framer-motion';
import { Check} from 'lucide-react';

export default function CodeDemo() {
    return(
        <section id="about" className="py-20 px-6 lg:px-8 bg-zinc-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
                        Why Flux?
                    </h2>
                    <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                        Building tokenized asset infrastructure shouldn't require months of smart contract development. Flux SDK abstracts the complexity, giving you production-ready vaults in minutes.
                    </p>
                    <ul className="space-y-4">
                        {[
                            'ERC-4626 standard compliance out of the box',
                            'Zero custody risk with non-custodial architecture',
                            'Automated yield harvesting and compounding',
                            'Type-safe SDK with comprehensive documentation'
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-[#FF4F00] mt-1 shrink-0" />
                                <span className="text-zinc-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Right: Code Window */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-zinc-900 rounded-xl overflow-hidden shadow-2xl"
                >
                    <div className="bg-zinc-800 px-4 py-3 flex items-center gap-2 border-b border-zinc-700">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 text-center">
                            <span className="text-zinc-400 text-sm font-mono">vault.ts</span>
                        </div>
                    </div>

                    <div className="p-6 font-mono text-sm">
                        <div className="text-zinc-500">// Install the SDK</div>
                        <div className="text-green-400 mb-4">$ npm install @flux/sdk</div>
                    
                        <div className="text-zinc-500 mt-6">// Create a vault in seconds</div>
                        <div className="text-purple-400">
                            import
                            <span className="text-white"> {'{ FluxSDK }'} </span>
                            <span className="text-purple-400">from</span>
                            <span className="text-yellow-300"> '@flux/sdk'</span>
                            <span className="text-white">;</span>
                        </div>

                        <div className="mt-4 text-purple-400">
                            const
                            <span className="text-blue-400"> vault </span>
                            <span className="text-white">= </span>
                            <span className="text-purple-400">await</span>
                            <span className="text-white"> flux.</span>
                            <span className="text-yellow-300">createVault</span>
                            <span className="text-white">({'{'}</span>
                        </div>
                        
                        <div className="pl-4">
                            <div>
                                <span className="text-blue-400">asset</span>
                                <span className="text-white">: </span>
                                <span className="text-green-300">'USDC'</span>
                                <span className="text-white">,</span>
                            </div>
                            <div>
                                <span className="text-blue-400">name</span>
                                <span className="text-white">: </span>
                                <span className="text-green-300">'Flux US Treasury'</span>
                                <span className="text-white">,</span>
                            </div>
                            <div>
                                <span className="text-blue-400">symbol</span>
                                <span className="text-white">: </span>
                                <span className="text-green-300">'fUST'</span>
                            </div>
                        </div>

                        <span className="text-white">{'}'});</span>

                        <div className="mt-6 text-zinc-500">// ✅ Production-ready vault deployed</div>
                    </div>
                </motion.div>
                </div>
            </div>
        </section>
    )
}