import { CreateVaultButtonProps } from "../types/types"
import { Loader2, CheckCircle } from "lucide-react"

export default function CreateVaultButton({ isLoading, isSuccess }: CreateVaultButtonProps) {
    return(
        <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`
              cursor-pointer w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
              ${isLoading 
                ? 'bg-gray-800 text-gray-400 cursor-not-allowed' 
                : isSuccess 
                  ? 'bg-green-500 text-black cursor-default'
                  : 'bg-white text-black hover:bg-gray-200'
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Deploying Vault...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Vault Deployed!
              </>
            ) : (
              "Deploy Vault"
            )}
          </button>
    )
}