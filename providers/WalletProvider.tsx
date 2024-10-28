'use client';

import { Coin98AdapterProvider } from '@/components/ui/wallets/Coin98AdapterProvider';
import dynamic from 'next/dynamic';
import React from 'react';

const Coin98AdapterModal = dynamic(
  async () =>
    (await import('@/components/ui/wallets/Coin98AdapterModal'))
      .Coin98AdapterModal,
  {
    ssr: false,
  },
);

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Coin98AdapterProvider>
      {children}
      <Coin98AdapterModal />
    </Coin98AdapterProvider>
  );
};

export default WalletProvider;
