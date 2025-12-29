import { useConnection, useConnections } from "wagmi"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Dashboard() {
    const { address } = useConnection()
    const connection = useConnections()
    const navigate = useNavigate()

    useEffect(() => {
        if(connection.length == 0) {
            navigate('/')
        }
    }, [connection, navigate])

    return(
        <div className="bg-blue-950 min-h-screen">
            <h1 className="text-xl text-white">Welcome to dashboard, {address?.slice(0, 10)}...{address?.slice(-10)}</h1>

            <ConnectButton showBalance={false}/>
        </div>
    )
}