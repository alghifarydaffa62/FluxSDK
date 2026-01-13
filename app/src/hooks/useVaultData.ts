import { useCallback, useEffect, useState } from "react";
import { useFlux } from "./useFlux";
import { useConnection } from "wagmi";
import { type Address } from "viem";
import { VaultInfo } from "@flux_protocol/flux-sdk";

export function useVaultData(vaultAddress: string | undefined) {
    const flux = useFlux()
    const { address: userAddress } = useConnection()
    const [data, setData] = useState<VaultInfo | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchDetail = useCallback(async () => {
        if (!flux || !vaultAddress) return;

        setIsLoading(true)
        setError(null)

        try {
            const info = await flux.getVaultInfo(
                vaultAddress as Address,
                userAddress
            )

            setData(info as VaultInfo)
        } catch(err: any) {
            console.error("error fetching details: ", err)
            setError(err.message || "error fetching details")
        } finally {
            setIsLoading(false)
        }
    }, [flux, vaultAddress, userAddress])

    useEffect(() => {
        if(flux && vaultAddress) {
            fetchDetail();
        }
    }, [flux, vaultAddress, fetchDetail])

    return {
        data,
        isLoading,
        error,
        refetch: fetchDetail
    }
}