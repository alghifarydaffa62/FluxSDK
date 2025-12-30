import { useState, useEffect, useCallback } from "react";
import { useFlux } from "./useFlux";
import { VaultData } from "../types/types";
import { type Address } from "viem";

export default function useFetchVaults() {
    const flux = useFlux()
    const FACTORY = "0x7f0A1F76F2Bc41Cae039801C2A93712743069491"

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [vaults, setVaults] = useState<VaultData[]>([])

    const fetchAllVaults = useCallback(async () => {
        if(!flux) return

        setIsLoading(true)
        setError(null)

        try {
            const data = await flux.getAllVaults(FACTORY as Address)

            const formattedVaults: VaultData[] = data.map((item: any) => ({
                vaultAddress: item.vaultAddress || item[0],
                assetAddress: item.assetAddress || item[1],
                name: item.name || item[2],
                symbol: item.symbol || item[3]
            }))

            setVaults(formattedVaults)
        } catch (error: any) {
            console.error("error fetching vaults: ", error)
            setError(error.message || "error fetching vaults")
        } finally {
            setIsLoading(false)
        }
    }, [flux])

    useEffect(() => {
        if (flux) {
            fetchAllVaults();
        }
    }, [flux, fetchAllVaults]);

    return {
        vaults,
        isLoading,
        error,
        refetch: fetchAllVaults
    }
}