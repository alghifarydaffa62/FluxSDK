import { useState } from "react"
import useCreateVault from "../hooks/useCreateVault"
import CreateVaultHeader from "../component/CreateVaultHeader";
import CreateVaultForm from "../component/CreateVaultForm";
import ErrorMessage from "../component/ErrorMessage";
import SuccessMessage from "../component/SuccessMessage";

export default function CreateVault() {
    const { deployVault, isSuccess, isLoading, error, txHash } = useCreateVault()

    const [formData, setFormData] = useState({
        asset: '',
        name: '',
        symbol: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        deployVault(formData.asset, formData.name, formData.symbol);
    };
    return(
        <div className="max-w-2xl mx-auto space-y-8">
            <CreateVaultHeader/>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
                <CreateVaultForm 
                    formData={formData} 
                    setFormData={setFormData} 
                    handleSubmit={handleSubmit} 
                    isSuccess={isSuccess} 
                    isLoading={isLoading}
                />
                <ErrorMessage message={error}/>
                <SuccessMessage txHash={txHash} isSuccess={isSuccess}/>
            </div>
        </div>
    )
}