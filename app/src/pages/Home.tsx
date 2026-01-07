import Navbar from '../component/Navbar'
import { useNavigate } from 'react-router-dom'
import { useConnections } from 'wagmi'
import { useEffect } from 'react'
import Hero from '../component/Home/Hero'
import CodeDemo from '../component/Home/CodeDemo'
import Features from '../component/Home/Features'
import CTA from '../component/Home/CTA'
import Footer from '../component/Home/Footer'

export default function Home() {
    const connection = useConnections()
    const navigate = useNavigate()

    useEffect(() => {
        if(connection.length > 0) {
            navigate('/dashboard')
        }
    }, [connection, navigate])

    return (
        <div className="bg-white min-h-screen">
            <Navbar/>
            <Hero/>
            <CodeDemo/>
            <Features/>
            <CTA/>
            <Footer/>
        </div>
    )
}