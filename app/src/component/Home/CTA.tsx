import { motion } from 'framer-motion';

export default function CTA () {
    return(
        <section className="py-20 px-6 lg:px-8 bg-zinc-900">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to build the future of finance?
                </h2>
                <p className="text-xl text-zinc-400 mb-10">
                    Join hundreds of developers building on Flux Protocol today.
                </p>
                <button className="bg-[#FF4F00] text-white px-10 py-4 rounded-lg hover:bg-[#E64500] transition-colors font-medium text-lg">
                    Get Started for Free
                </button>
            </motion.div>
        </section>
    )
}