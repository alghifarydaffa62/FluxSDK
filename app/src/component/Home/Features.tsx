import { motion } from 'framer-motion';
import { Code2, Shield, Zap, Terminal } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: <Code2 className="w-8 h-8" />,
            title: 'ERC-4626 Standard',
            description: 'Full compatibility with DeFi protocols like Aave, Uniswap, and Compound. Your vaults integrate seamlessly.',
            color: 'bg-blue-50 text-blue-600'
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Non-Custodial',
            description: 'Users maintain full control of their private keys. Zero custody risk, maximum security.',
            color: 'bg-green-50 text-green-600'
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Automated Yield',
            description: 'Built-in harvesting logic and compounding strategies. Set it once, earn forever.',
            color: 'bg-orange-50 text-[#FF4F00]'
        },
        {
            icon: <Terminal className="w-8 h-8" />,
            title: 'Developer First',
            description: 'Typed SDK, extensive documentation, and active Discord community. Build with confidence.',
            color: 'bg-purple-50 text-purple-600'
        }
    ];
    return(
        <div>
            <section id="features" className="py-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
                            Built for Modern DeFi
                        </h2>
                        <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
                            Everything you need to tokenize real-world assets and create institutional-grade yield products.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 border border-zinc-200 rounded-2xl hover:shadow-lg transition-shadow bg-white"
                            >
                                <div className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
                                <p className="text-zinc-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}