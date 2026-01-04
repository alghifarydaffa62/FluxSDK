import { Address, parseUnits } from "viem";
import { useFlux } from "./useFlux";
import { useState, useEffect, useCallback } from "react";
import { useConnection, useWaitForTransactionReceipt } from "wagmi";

export function useDeposit(vaultAddress: Address, assetAddress: Address, decimals: number) {
    const flux = useFlux()
    const { address: userAddress } = useConnection()

    const [amount, setAmount] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [approval, setApproval] = useState(false)
    const [approveHash, setApproveHash] = useState<Address | undefined>(undefined)
    const [depositHash, setDepositHash] = useState<Address | undefined>(undefined)

    const [isSigning, setIsSigning] = useState(false)

    const {
        isLoading: isApproveConfirming,
        isSuccess: isApproveSuccess
    } = useWaitForTransactionReceipt({ hash: approveHash })

    const {
        isLoading: isDepositConfirming,
        isSuccess: isDepositSuccess
    } = useWaitForTransactionReceipt({ hash: depositHash })

    const checkAllowance = useCallback(async () => {
        if (!flux || !userAddress || !amount) return;

        try {
            const current = await flux.getAllowance(vaultAddress, assetAddress, userAddress)
            const amountBigInt = parseUnits(amount, decimals)
            setApproval(current < amountBigInt)
        } catch (err) {
            console.error("Error checking allowance", err)
        }
    }, [flux, userAddress, amount, vaultAddress, assetAddress, decimals])

    useEffect(() => {
        checkAllowance()
    }, [checkAllowance])

    useEffect(() => {
        if (isApproveSuccess) {
            checkAllowance()
            setApproveHash(undefined) 
        }
    }, [isApproveSuccess, checkAllowance])

    useEffect(() => {
        if (isDepositSuccess) {
            setAmount('')
            setDepositHash(undefined)
        }
    }, [isDepositSuccess])

    const approve = async () => {
        if (!flux) return
        setIsSigning(true)
        setError(null)

        try {
            const hash = await flux.approve(assetAddress, vaultAddress, amount)
            setDepositHash(hash as Address)
        } catch(error: any) {
            console.error("error approve: ", error)
            setError(error.message || "error approve")
        } finally {
            setIsSigning(false)
        }
    }

    const deposit = async () => {
        if(!flux) {
            setError("SDK Not intialized!")
            return
        }

        setIsSigning(true)
        setError(null)

        try {
            const hash = await flux.deposit(vaultAddress, amount)
            setDepositHash(hash as Address)
        } catch(error: any) {
            console.error("error deposit: ", error)
            setError(error.message || "error deposit")
        } finally {
            setIsSigning(false)
        }
    }

    const isLoading = isSigning || isApproveConfirming || isDepositConfirming;

    const statusMessage = isSigning ? "Check Wallet..." 
        : isApproveConfirming ? "Approving..." 
        : isDepositConfirming ? "Depositing..." 
        : null;

    return {
        amount,
        setAmount,
        isLoading,
        statusMessage,
        error,
        approval,
        approve,
        deposit,
        isSuccess: isDepositSuccess
    }
}