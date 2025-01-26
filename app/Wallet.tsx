"use client";
import React, { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { CoinbaseWalletAdapter } from "@solana/wallet-adapter-coinbase";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { TorusWalletAdapter } from "@solana/wallet-adapter-torus";
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect";
import { SafePalWalletAdapter } from "@solana/wallet-adapter-safepal";
import { WALLET_CONNECT_METADATA, WALLET_CONNECT_PROJECT_ID } from "@/config";

interface WalletProps {
  children: ReactNode;
}

export const Wallet: FC<WalletProps> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(
    () =>
      "https://lingering-omniscient-feather.solana-mainnet.quiknode.pro/444d2fae17579b4233093e9c1e05019d3d415e6a/",
    []
  );

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/anza-xyz/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new PhantomWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new WalletConnectWalletAdapter({
        network: WalletAdapterNetwork.Mainnet,
        options: {
          projectId: WALLET_CONNECT_PROJECT_ID,
          metadata: WALLET_CONNECT_METADATA,
        },
      }),
      new SafePalWalletAdapter(),
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* <WalletMultiButton />
          <WalletDisconnectButton /> */}
          {/* Your app's components go here, nested within the context providers. */}
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
