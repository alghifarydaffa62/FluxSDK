import { useState } from "react"
import { useFlux } from "./useFlux"
import { type Address } from "viem"

export default function useCreateVault() {
    const flux = useFlux()

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [txHash, setTxHash] = useState<string | null>(null)

    const FACTORY = import.meta.env.VITE_FACTORY_ADDRESS

    const deployVault = async(assetAddress: string, name: string, symbol: string) => {
        if(!flux) {
            setError("SDK Not intialized!")
            return
        }

        setIsLoading(true)
        setError(null)
        setIsSuccess(false)

        try {
            const tx = await flux.createVault(FACTORY as Address, assetAddress as Address, name, symbol)

            setTxHash(typeof tx == 'string' ? tx : (tx as any).hash)

            setIsSuccess(true)
        } catch(error: any) {
            console.error("failed deploy new vault: ", error)
            setError(error.message || "Failed to create vault");
        } finally {
            setIsLoading(false)
        }
    }

    return {
        deployVault,
        isLoading,
        isSuccess,
        error,
        txHash
    };
}