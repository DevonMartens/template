"use client";

import React, { ReactNode } from "react";
import { wagmiAdapter, projectId } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { mainnet, sepolia } from "@reown/appkit/networks";
import { cookieToInitialState, WagmiProvider, Config } from "wagmi";

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

const selectedNetwork =
  process.env.NEXT_PUBLIC_CHAIN === "mainnet" ? mainnet : sepolia;

export const metadata = {
  name: "Claim Template",
  description: "Claim Template",
  url: "",
  icons: [""],
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [selectedNetwork],
  defaultNetwork: selectedNetwork,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: false,
    emailShowWallets: false,
  },
  themeMode: "dark",
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies,
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
