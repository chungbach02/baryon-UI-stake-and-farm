'use client';

import { DEFAULT_VERSION } from '@/constants';
import { BARYON_CHAIN_DATA_LIST } from '@/constants/chain';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import useSocket from '@/hook/useSocket';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse } from '@/types/base.model';
import { IFavoriteListModel } from '@/types/favorite.model';
import { ITokenInfoModel } from '@/types/token.model';
import { useQuery } from '@tanstack/react-query';
import { find, pickBy } from 'lodash';
import { useEffect } from 'react';
import { useBaryonServices } from './BaryonServicesProvider';

export default function GlobalStateProvider() {
  const { infoService, baryonApiService, web3Service, baryonUtilsService } =
    useBaryonServices();
  const { setLocalCoins, setFavoriteList } = useGlobalStore();
  const { connect, disconnect } = useSocket();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.COIN_LOCAL],
    queryFn: () =>
      infoService.informationAPI.get<Record<string, ITokenInfoModel[]>>(
        ENDPOINTS.COIN_LOCAL,
      ),
  });

  // GET FAVORITE LIST
  const { data: favoriteList } = useQuery({
    queryKey: [QUERY_KEYS.FAVORITE],
    queryFn: () =>
      baryonApiService.adapters.get<IBaseResponse<IFavoriteListModel>>(
        ENDPOINTS.FAVORITE,
        {
          params: { version: DEFAULT_VERSION.FAVORITE },
        },
      ),
  });

  useEffect(() => {
    if (data) {
      setLocalCoins(
        pickBy(data, (_, key) => find(BARYON_CHAIN_DATA_LIST, { chain: key })),
      );
    }
  }, [data]);

  useEffect(() => {
    if (favoriteList) {
      setFavoriteList(favoriteList.data);
    }
  }, [favoriteList]);

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  return null;
}
