'use client';

import { useGlobalStore } from '@/stores/global.store';
import {
  ancient8,
  bitkub,
  bsc,
  viction,
  WalletModalC98,
} from '@coin98-com/wallet-adapter-react-ui';

export const Coin98AdapterModal = () => {
  const { activeChainId } = useGlobalStore();
  const defaultChains = [bsc, viction, bitkub, ancient8];

  return (
    <WalletModalC98
      isHiddenSocial
      isC98Theme
      enableChains={defaultChains}
      activeChainId={activeChainId}
    />
  );
};
