import { PortfolioItem } from "../types/types";
import { useState, useEffect } from "react";
import { useConnection } from "wagmi";
import { useFlux } from "./useFlux";
import { Address } from "viem";

const FACTORY = "0x7f0A1F76F2Bc41Cae039801C2A93712743069491"

export function usePortfolio() {
    const flux = useFlux()
    const { address: userAddress } = useConnection()

    const [ positions, setPositions ] = useState<PortfolioItem[]>([])
    const [netWorth, setNetWorth] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPortfolio = async () => {
            if (!flux || !userAddress) return;

            setIsLoading(true)

            try {
                const vaults = await flux.getAllVaults(FACTORY as Address)

                const infoPromises = vaults.map((vault: any) => 
                    flux.getVaultInfo(vault.vaultAddress, userAddress)
                )

                const vaultsData = await Promise.all(infoPromises);

                const activePositions: PortfolioItem[] = [];
                let totalValue = 0;

                vaultsData.forEach((info) => {
                    if(info.userAssetValue > 0n) {
                        const balanceFormatted = info.formattedUserBalance
                        const valueUsd = parseFloat(balanceFormatted)

                        totalValue += valueUsd

                        activePositions.push({
                            name: info.name,
                            symbol: info.symbol,
                            address: info.address,
                            balance: balanceFormatted,
                            balanceUsd: valueUsd,
                            decimals: info.decimals
                        })
                    }
                })

                setPositions(activePositions);
                setNetWorth(totalValue);
            } catch (error) {
                console.error("Error loading portfolio:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPortfolio();
    }, [flux, userAddress])

    return { positions, netWorth, isLoading }
}