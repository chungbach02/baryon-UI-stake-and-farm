'use client';

import {
  BLOCKCHAINS_DATA,
  WalletProvider,
} from '@coin98-com/wallet-adapter-react';
import { WalletModalProvider } from '@coin98-com/wallet-adapter-react-ui';
import React from 'react';

// @ts-expect-error error from package
import { Coin98WalletAdapter } from '@coin98-com/wallet-adapter-coin98';
// @ts-expect-error error from package
import { MetaMaskWalletAdapter } from '@coin98-com/wallet-adapter-metamask';
// @ts-expect-error error from package
import { Ancient8WalletAdapter } from '@coin98-com/wallet-adapter-ancient8';
import { useTheme } from 'next-themes';

export const adapters = {
  coin98: Coin98WalletAdapter,
  metamask: MetaMaskWalletAdapter,
  ancient8: Ancient8WalletAdapter,
};

interface Coin98AdapterProviderProps {
  children: React.ReactNode;
}

export const Coin98AdapterProvider = ({
  children,
}: Coin98AdapterProviderProps) => {
  const { theme } = useTheme();
  const enables = [BLOCKCHAINS_DATA.ethereum];

  return (
    <WalletProvider
      enables={enables}
      wallets={[adapters.coin98, adapters.metamask, adapters.ancient8]}
      autoConnect
    >
      <WalletModalProvider theme={theme === 'dark' ? 'dark' : 'light'}>
        {children}
      </WalletModalProvider>
    </WalletProvider>
  );
};
