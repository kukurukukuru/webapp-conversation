import { WALLET_CONNECT_METADATA, WALLET_CONNECT_PROJECT_ID } from "@/config";
import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { base, mantle } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const walletConnectConnector = walletConnect({
  projectId: WALLET_CONNECT_PROJECT_ID,
  metadata: WALLET_CONNECT_METADATA,
});

export const getWagmiConfig = () => {
  return createConfig({
    chains: [base],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    connectors: [injected(), walletConnectConnector],
    transports: {
      [base.id]: http(
        "https://lively-chaotic-star.base-mainnet.quiknode.pro/5be380c059b3b32c8144ea76ac3cda0f72cf6c72/"
      ),
    },
  });
};
