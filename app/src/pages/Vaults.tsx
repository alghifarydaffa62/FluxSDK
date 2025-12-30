import { useEffect } from "react";
import { useConnections } from "wagmi";
import { useNavigate } from "react-router-dom";

export default function Vaults() {
    const connection = useConnections()
    const navigate = useNavigate()

    useEffect(() => {
        if(connection.length == 0) {
            navigate('/')
        }
    }, [connection, navigate])
    
    return(
        <div>
            <h1>VAULTS PAGE</h1>
        </div>
    )
}