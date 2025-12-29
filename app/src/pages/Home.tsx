import Navbar from '../component/Navbar'
import { useNavigate } from 'react-router-dom'
import { useConnections } from 'wagmi'
import { useEffect } from 'react'

export default function Home() {
    const connection = useConnections()
    const navigate = useNavigate()

    useEffect(() => {
        if(connection.length > 0) {
            navigate('/dashboard')
        }
    }, [connection, navigate])

    return (
        <div className="min-h-screen bg-gray-900 text-white p-10">
            <Navbar/>
            <h1 className="text-4xl font-bold mb-4">Flux Protocol</h1>
            <div className="p-4 border border-green-500 rounded-lg bg-green-900/20">
                <p className="text-green-400 font-mono">✅ SDK Integrated Successfully</p>
            </div>
        </div>
    )
}