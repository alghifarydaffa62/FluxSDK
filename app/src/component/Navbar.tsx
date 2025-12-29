import { Link } from "react-router-dom"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Navbar() {
    return(
        <nav className="flex justify-around">
            <h1>Flux Protocol</h1>

            <ul className="flex gap-5">
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/'>About</Link>
                </li>
                <li>
                    <Link to='/'>Features</Link>
                </li>
            </ul>

            <ConnectButton/>
        </nav>
    )
}