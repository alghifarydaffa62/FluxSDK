import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import DashboardLayout from "./layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Vaults from "./pages/Vaults"
import Portfolio from "./pages/Portfolio"
import CreateVault from "./pages/CreateVault"
import VaultDetail from "./pages/VaultDetail"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="vaults" element={<Vaults/>}/>
            <Route path="portfolio" element={<Portfolio/>}/>
            <Route path="create" element={<CreateVault/>}/>
            <Route path="vaults/:vaultAddress" element={<VaultDetail/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
