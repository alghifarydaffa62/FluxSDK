import { useState, useEffect } from "react";
import { useFlux } from "./useFlux";
import { useConnection } from "wagmi";
import { Address } from "viem";

const FACTORY = "0x7f0A1F76F2Bc41Cae039801C2A93712743069491"

export function useDashboard() {
    const flux = useFlux()
    const { address: userAddress } = useConnection()

    const [stats, setStats] = useState({
        protocolTVL: 0,
        userNetWorth: 0,
        yieldGenerated: 12450
    })

    const [topVault, setTopVault] = useState<any>(null);
    const [chartData, setChartData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if(!flux) return

            try {
                const vaultsData = await flux.getAllVaults(FACTORY as Address)

                const vaultsList = [...vaultsData]

                let totalTvl = 0;
                let userTotal = 0;
                let highestTvl = -1;
                let bestVault = null;

                const promises = vaultsList.map(async (v) => {
                    const tvlWei = await flux.getVaultTVL(v.vaultAddress)
                    const tvlNum = parseFloat(tvlWei)

                    let myBalance = 0

                    if(userAddress) {
                        const info = await flux.getVaultInfo(v.vaultAddress, userAddress)
                        myBalance = parseFloat(info.formattedUserBalance)
                    }

                    return {...v, tvlNum, myBalance}
                })

                const results = await Promise.all(promises)

                results.forEach(res => {
                    totalTvl += res.tvlNum
                    userTotal += res.myBalance

                    if (res.tvlNum > highestTvl) {
                        highestTvl = res.tvlNum;
                        bestVault = res;
                    }
                })

                setStats({
                    protocolTVL: totalTvl,
                    userNetWorth: userTotal,
                    yieldGenerated: 12450 + (totalTvl * 0.05) 
                })

                setTopVault(bestVault)

                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                const historyData = days.map((day, i) => {
                    const randomVariance = Math.random() * 0.1
                    const growthFactor = 0.7 + (i * 0.05)
                    
                    return {
                        name: day,
                        tvl: Math.floor(totalTvl * growthFactor * (1 - randomVariance))
                    };
                });

                historyData[6].tvl = totalTvl; 

                setChartData(historyData);
            } catch(error) {
                console.error("Dashboard error: ", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadData();
    }, [flux, userAddress])

    return { stats, topVault, chartData, isLoading }
}