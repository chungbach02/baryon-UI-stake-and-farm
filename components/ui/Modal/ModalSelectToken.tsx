import { DEFAULT_DEBOUNCE } from '@/constants';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { MAIN_COIN_AMM, W_MAIN_COIN } from '@/constants/tokens';
import { useBalance } from '@/hook/useBalance';
import { useDebounceCallback } from '@/hook/useDebounceCallback';
import { useFavorite } from '@/hook/useFavorite';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse } from '@/types/base.model';
import { IBaseTokenModel, ITokenInfoModel } from '@/types/token.model';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { convertWeiToBalance } from '@dagora/utils';
import { ChainId } from '@dagora/web3-services';
import { Input, Modal } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { find, get, lowerCase, map, uniqBy } from 'lodash';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import FavoriteList from '../FavoriteList';
import { TokensTable } from '../TokensTable';

interface ModalSelectTokenProps {
  withIcon?: string;
  handleClose?: () => void;
  onSetOpen: (isOpen: boolean) => void;
  onSelected: (value: ITokenInfoModel) => void;
  open: boolean;
}
const numSliceCoinLocal = 20;

const ModalSelectToken = ({
  handleClose,
  withIcon,
  onSetOpen,
  onSelected,
  open,
}: ModalSelectTokenProps) => {
  const t = useTranslations();
  const { address: walletAddress } = useWallet();
  const { balance: nativeBalance } = useBalance();

  const { activeChain, activeChainId, localCoins } = useGlobalStore();
  const { baryonApiService, baryonUtilsService } = useBaryonServices();
  const { takeFavorite, isFavorite } = useFavorite();
  const [search, setSearch] = useState<string>('');
  const [tokenList, setTokenList] = useState<ITokenInfoModel[]>([]);
  const handleSearchDebounce = useDebounceCallback((keyword) => {
    setSearch(keyword);
  }, DEFAULT_DEBOUNCE.SEARCH);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.TOKEN_LIST, activeChain],
    queryFn: () =>
      baryonApiService.base.get<IBaseResponse<IBaseTokenModel[]>>(
        ENDPOINTS.TOKEN_LIST,
        {
          params: { chain: activeChain },
        },
      ),
  });

  const handleSelect = (token: ITokenInfoModel) => {
    onSelected(token);
    onSetOpen(false);
  };

  const handleFavorite = (token?: ITokenInfoModel) => {
    takeFavorite(token?.address ? [token?.address] : [], 'baryonToken');
  };

  const handleUpdateList = useCallback(async () => {
    const combinedList = [
      ...get(data, 'data', []),
      ...get(localCoins, activeChain, []).slice(0, numSliceCoinLocal),
    ];

    const uniqueListToken = uniqBy(combinedList, (t) => t.address).filter(
      (item) => {
        const isAddress = item.address;
        const isNotWrap =
          lowerCase(item.address) !==
          lowerCase(get(W_MAIN_COIN, `[${activeChain}].address`, ''));
        return isAddress && isNotWrap;
      },
    );

    uniqueListToken.unshift(W_MAIN_COIN[activeChain]);

    const balanceList = await baryonUtilsService.getTokensBalance({
      chainId: activeChainId as ChainId,
      tokenAddresses: uniqueListToken.map((t) => t.address),
      userAddress: walletAddress ?? '',
    });

    const mergedList = map(uniqueListToken, (item) => {
      const token = find(balanceList, { address: item.address });
      return {
        ...item,
        balance: convertWeiToBalance(
          Number(token?.balance ?? 0),
          item.decimal,
        ).toNumber(),
      };
    });

    mergedList.unshift({
      ...MAIN_COIN_AMM[activeChain],
      balance: nativeBalance,
    });

    setTokenList(
      mergedList
        .filter(
          (token) =>
            !search ||
            lowerCase(token.name).includes(lowerCase(search)) ||
            lowerCase(token.symbol).includes(lowerCase(search)) ||
            token.address === search,
        )
        .sort((a, b) => {
          const aFavorite = isFavorite(String(a.address), 'baryonToken');
          const bFavorite = isFavorite(String(b.address), 'baryonToken');

          return (
            Number(bFavorite) - Number(aFavorite) ||
            Number(b.balance) - Number(a.balance)
          );
        }),
    );
  }, [data, activeChain, search]);

  useEffect(() => {
    handleUpdateList();
  }, [data, activeChain, search]);

  useEffect(() => {
    setTokenList((prev) =>
      prev.toSorted((a, b) => {
        const aFavorite = isFavorite(String(a.address), 'baryonToken');
        const bFavorite = isFavorite(String(b.address), 'baryonToken');

        return Number(bFavorite) - Number(aFavorite);
      }),
    );
  }, [open]);

  return (
    <Modal
      heading={t('common_select_token')}
      open={open}
      className="bg-background-primary"
      onSetOpen={onSetOpen}
      size="lg"
    >
      <div className="flex flex-col gap-2">
        <Input
          placeholder={t('common_search_by_token_name')}
          isSearch
          isFull
          onChangeValue={handleSearchDebounce}
          className="flex-row-reverse"
        />
        <div className="-mx-2">
          <FavoriteList className="text-xs" />
        </div>
        <TokensTable
          tokenList={tokenList}
          onClick={handleSelect}
          onHandleFavorite={handleFavorite}
        />
      </div>
    </Modal>
  );
};

export default ModalSelectToken;
