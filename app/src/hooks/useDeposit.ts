import { Address } from "viem";
import { useFlux } from "./useFlux";
import { useState } from "react";

export function useDeposit() {
    const flux = useFlux()

    const [amount, setAmount] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [txHash, setTxHash] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const deposit = async (vaultAddress: Address, amount: string) => {
        if(!flux) {
            setError("SDK Not intialized!")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const tx = await flux.deposit(vaultAddress, amount)
            setAmount("")
            setTxHash(typeof tx == 'string' ? tx : (tx as any).hash)
        } catch(error: any) {
            console.error("error deposit: ", error)
            setError(error.message || "error deposit")
        } finally {
            setIsLoading(false)
        }
    }

    return {
        amount,
        setAmount,
        isLoading,
        setIsLoading,
        txHash,
        error,
        deposit
    }
}