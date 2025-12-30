import { useEffect } from "react";
import { useConnections } from "wagmi";
import { useNavigate } from "react-router-dom";

export default function Portfolio() {
    const connection = useConnections()
    const navigate = useNavigate()

    useEffect(() => {
        if(connection.length == 0) {
            navigate('/')
        }
    }, [connection, navigate])
    
    return(
        <div>
            <h1>Portfolio Page</h1>
        </div>
    )
}