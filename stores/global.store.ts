import { Chain, CHAIN_DATA, DEFAULT_CHAIN, DEFAULT_CHAIN_ID } from '@/constants/chain';
import { Currency } from '@/constants/currency';
import { LOCAL_STORAGE_KEYS } from '@/constants/keys';
import { IFavoriteListModel } from '@/types/favorite.model';
import { IPoolModel } from '@/types/pool.model';
import { ITokenInfoModel } from '@/types/token.model';
import { getItemStorage, setItemStorage } from '@/utils/storage';
import { Socket } from 'socket.io-client';
import { create } from 'zustand';

type GlobalState = {
  localCoins?: Record<string, ITokenInfoModel[]>;
  socketClient?: Socket;
  currency?: Currency;
  priceRate: number;
  activeChain: Chain;
  activeChainId?: string;
  favoriteList?: IFavoriteListModel;
  favoritePools: IPoolModel[];
};

type GlobalAction = {
  setLocalCoins: (localCoins: Record<string, ITokenInfoModel[]>) => void;
  setSocketClient: (socketClient?: Socket) => void;
  setCurrency: (currency: Currency) => void;
  setPriceRate: (priceRate: number) => void;
  setActiveChain: (activeChain: Chain) => void;
  setFavoriteList: (favoriteList?: IFavoriteListModel) => void;
  setFavoritePools: (pools: IPoolModel[]) => void;
};

const activeChainLocalStorage = getItemStorage<Chain>(
  LOCAL_STORAGE_KEYS.ACTIVE_CHAIN,
);

export const useGlobalStore = create<GlobalState & GlobalAction>((set) => ({
  localCoins: undefined,
  setLocalCoins: (localCoins) => set(() => ({ localCoins })),
  socketClient: undefined,
  setSocketClient: (socketClient) => set(() => ({ socketClient })),
  currency: (getItemStorage(LOCAL_STORAGE_KEYS.CURRENCY) as Currency) || 'USD',
  setCurrency: (currency) => set(() => ({ currency })),
  priceRate: 1,
  setPriceRate: (priceRate) => set(() => ({ priceRate })),
  activeChain: getItemStorage(LOCAL_STORAGE_KEYS.ACTIVE_CHAIN) ?? DEFAULT_CHAIN,
  setActiveChain: (activeChain) =>
    set(() => {
      setItemStorage(
        LOCAL_STORAGE_KEYS.ACTIVE_CHAIN,
        JSON.stringify(activeChain),
      );

      return {
        activeChain,
        activeChainId: CHAIN_DATA[activeChain]?.chainId,
      };
    }),

  activeChainId: activeChainLocalStorage
    ? CHAIN_DATA[activeChainLocalStorage]?.chainId
    : DEFAULT_CHAIN_ID,
  favoritePools: [],
  setFavoritePools: (favoritePools) => set(() => ({ favoritePools })),
  favoriteList: undefined,
  setFavoriteList: (favoriteList) => set(() => ({ favoriteList })),
}));
