"use client";

import { getWagmiConfig } from "@/lib/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";

type Props = {
  children: ReactNode;
  initialState: State | undefined;
};

export function WagmiProviders({ children, initialState }: Props) {
  const [config] = useState(() => getWagmiConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
