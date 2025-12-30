import { useConnection, useConnections } from "wagmi"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

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
        <div>
            <h1>Hello, {address?.slice(0, 10)}...{address?.slice(-10)}</h1>
        </div>
    )
}