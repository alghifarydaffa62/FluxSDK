import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function Hero () {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const phrases = [
        'tokenize Real World Assets.',
        'build Yield-Bearing Vaults.',
        'standardize DeFi liquidity.'
    ];

    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex];
        const timeout = setTimeout(() => {
        if (!isDeleting) {
            if (displayText.length < currentPhrase.length) {
                setDisplayText(currentPhrase.substring(0, displayText.length + 1));
            } else {
                setTimeout(() => setIsDeleting(true), 2000);
            }
        } else {
            if (displayText.length > 0) {
                setDisplayText(displayText.substring(0, displayText.length - 1));
            } else {
                setIsDeleting(false);
                setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
            }
        }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentPhraseIndex]);

    return (
        <section className="pt-32 pb-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 leading-tight">
                        <span className='text-cyan-600'>Flux SDK.</span>
                        <br/>
                        The infrastructure to
                        <br />
                        <span className="text-cyan-600">
                            {displayText}
                        <span className="animate-pulse">|</span>
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-zinc-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Turn static assets into liquid, composable ERC-4626 tokens with a single line of code.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="bg-zinc-900 text-white px-8 py-4 rounded-lg hover:bg-zinc-800 transition-colors font-medium text-lg flex items-center gap-2">
                            Start Building
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="cursor-pointer border-2 border-zinc-900 text-zinc-900 px-8 py-4 rounded-lg hover:bg-zinc-50 transition-colors font-medium text-lg flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            Read Documentation
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                >
                    {[
                        { label: 'Total Value Locked', value: '$45M+' },
                        { label: 'Active Vaults', value: '250+' },
                        { label: 'Developers', value: '1,200+' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center p-6 border border-zinc-200 rounded-lg bg-zinc-50">
                        <div className="text-3xl font-bold text-zinc-900 mb-2">{stat.value}</div>
                        <div className="text-sm text-zinc-600 uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}