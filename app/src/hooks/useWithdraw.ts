import { Address, parseUnits } from "viem";
import { useFlux } from "./useFlux";
import { useConnection } from "wagmi";
import { useState, useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

export function useWithdraw(vaultAddress: Address, decimals: number) {
    const flux = useFlux()
    const { address: userAddress } = useConnection()

    const [amount, setAmount] = useState('')
    const [error, setError] = useState<string | null>(null)

    const [txHash, setTxHash] = useState<Address | undefined>(undefined)
    const [isSigning, setIsSigning] = useState(false)

    const {
        isLoading: isConfirming,
        isSuccess
    } = useWaitForTransactionReceipt({ hash: txHash })

    const handleWithdraw = async () => {
        if(!flux || !amount || !userAddress) return
        setIsSigning(true)
        setError(null)

        try {
            const amountBigint = parseUnits(amount, decimals)
            const tx = await flux.withdraw(vaultAddress, amountBigint)
            setTxHash(tx as Address)
        } catch(error: any) {
            console.error("error withdraw", error)
            setError(error.message || "error withdraw")
        } finally {
            setIsSigning(false)
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setAmount('')
            setTxHash(undefined)
        }
    }, [isSuccess])

    return {
        amount,
        setAmount,
        isLoading: isSigning || isConfirming,
        statusMessage: isSigning ? "Check Wallet..." : isConfirming ? "Withdrawing..." : null,
        error,
        handleWithdraw,
        isSuccess,
        txHash
    }
}