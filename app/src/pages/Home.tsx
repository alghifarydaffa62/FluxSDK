import { FluxSDK } from '@flux/sdk'

export default function Home() {
    console.log("Flux SDK Class:", FluxSDK); 

    return (
        <div className="min-h-screen bg-gray-900 text-white p-10">
            <h1 className="text-4xl font-bold mb-4">Flux Protocol</h1>
            <div className="p-4 border border-green-500 rounded-lg bg-green-900/20">
                <p className="text-green-400 font-mono">✅ SDK Integrated Successfully</p>
            </div>
        </div>
    )
}