import { useMemo } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { FluxSDK } from "@flux_protocol/flux-sdk"

export function useFlux() {
    const publicClient = usePublicClient()
    const { data: walletClient } = useWalletClient()

    const flux = useMemo(() => {
        if(!publicClient) return null

        return new FluxSDK(publicClient, walletClient ?? undefined, 5003)
    }, [publicClient, walletClient])

    return flux
}