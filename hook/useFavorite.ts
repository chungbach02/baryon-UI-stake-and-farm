import { ENDPOINTS } from '@/constants/endpoints';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { IError } from '@/types/base.model';
import { FavoriteType, ITakeFavoriteRequest } from '@/types/favorite.model';
import { IPoolModel } from '@/types/pool.model';
import { useMutation } from '@tanstack/react-query';
import { xor, xorBy } from 'lodash';
import { useCallback } from 'react';
import { useInvalidateQueryKey } from './useInvalidateQueryKey';

export const useFavorite = () => {
  const { favoriteList, favoritePools, setFavoritePools } = useGlobalStore();
  const { baryonApiService } = useBaryonServices();
  const { invalidateFavorite } = useInvalidateQueryKey();

  const takeFavorite = useMutation<string, IError, ITakeFavoriteRequest>({
    mutationFn: (data) =>
      baryonApiService.adapters.post(ENDPOINTS.FAVORITE_TAKE, data),
    onSuccess: () => invalidateFavorite(),
  });

  const isFavorite = useCallback(
    (address: string, type: FavoriteType) =>
      favoriteList?.[type].includes(address),
    [favoriteList],
  );

  const isFavoritePools = useCallback(
    (address: string) => favoritePools.find((p) => p.poolAddress === address),
    [favoritePools],
  );

  const handleTakeFavorite = (addressList: string[], type: FavoriteType) => {
    const list = favoriteList?.[type] || [];
    const requestList = xor(addressList, list);
    takeFavorite.mutate({ bonusValue: requestList, type });
  };

  const handleTakeFavoritePools = (pools: IPoolModel[]) => {
    const requestList = xorBy(favoritePools, pools, 'poolAddress');

    setFavoritePools(requestList);
  };

  return {
    favoriteTokenList: favoriteList?.baryonToken || [],
    favoritePoolList: favoritePools,
    favoriteSwapList: favoriteList?.baryonRecentSwap || [],

    takeFavorite: handleTakeFavorite,
    takeFavoritePool: handleTakeFavoritePools,
    isFavorite,
    isFavoritePools,
  };
};
