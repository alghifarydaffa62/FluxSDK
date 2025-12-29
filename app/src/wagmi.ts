import { createConfig, http } from 'wagmi'
import { mantleSepoliaTestnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [mantleSepoliaTestnet],
  transports: {
    [mantleSepoliaTestnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
