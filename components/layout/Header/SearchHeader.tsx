import EmptyState from '@/components/ui/EmptyState';
import TokenInfo from '@/components/ui/TokenInfo';
import TokenPair from '@/components/ui/TokenPair';
import { DEFAULT_DEBOUNCE } from '@/constants';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useDebounceCallback } from '@/hook/useDebounceCallback';
import { useFilterParams } from '@/hook/useFilterParams';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse } from '@/types/base.model';
import { ISearchModel } from '@/types/common.model';
import { Input } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';

const SearchHeader = ({ isPhone }: { isPhone?: boolean }) => {
  const t = useTranslations();
  const { baryonApiService } = useBaryonServices();
  const { activeChain } = useGlobalStore();

  const { params, setParams } = useFilterParams<{
    keyword: string;
  }>({});

  const handleSearchDebounce = useDebounceCallback((keyword) => {
    setParams({ keyword });
  }, DEFAULT_DEBOUNCE.SEARCH);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH, params],
    queryFn: () =>
      baryonApiService.base.get<IBaseResponse<ISearchModel>>(ENDPOINTS.SEARCH, {
        params: { ...params, chain: activeChain },
      }),
  });
  const coinList = get(data, 'data.coin', []);
  const poolList = get(data, 'data.pool', []);

  const isEmpty = !coinList.length && !poolList.length;

  return (
    <div className="relative group">
      <Input
        className={twMerge(
          'w-[20rem] duration-200',
          // 'desktopLg:focus-within:w-[16rem] focus-within:w-[20rem]',
          isPhone && 'w-full ipad:focus-within:w-full',
        )}
        placeholder={t('header_search_pools_or_tokens')}
        isSearch
        isFull={isPhone}
        onChangeValue={handleSearchDebounce}
      />
      <div
        className={twMerge(
          'absolute rounded-lg bg-background-secondary w-full pt-2 mt-2 min-h-[15rem] translate-y-full duration-200',
          'opacity-0 invisible -bottom-10',
          // '-bottom-4 opacity-100 visible',
          'group-focus-within:-bottom-4 group-focus-within:opacity-100 group-focus-within:visible',
          isPhone &&
            'static bottom-0 opacity-100 visible translate-y-0 bg-transparent',
        )}
      >
        {isEmpty && (
          <EmptyState className="w-[200px] h-[200px]" dynamic={true} />
        )}
        {!isEmpty && (
          <div>
            {coinList.length && (
              <div>
                <div className="flex-between gap-2 px-3">
                  <span className="font-semibold">{t('common_tokens')}</span>
                  <span className="text-txt-secondary">
                    {t('common_price')}
                  </span>
                </div>
                <div
                  className={twMerge(
                    'flex flex-col gap-2 mt-2 overflow-auto max-h-[10rem]',
                    isPhone && 'max-h-[30vh]',
                  )}
                >
                  {coinList.map((coin) => (
                    <div
                      key={coin.id}
                      className="flex-between gap-2 px-3 py-2 hover:bg-background-hover duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <TokenInfo
                          token={{ img: coin.icon, name: coin.symbol }}
                        />
                      </div>
                      <span className="text-brand-primary">$1</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-3">
              <div className="flex-between gap-2 px-3">
                <span className="font-semibold">{t('common_pools')}</span>
                <span className="text-txt-secondary">
                  {t('common_liquidity')}
                </span>
              </div>
              <div
                className={twMerge(
                  'flex flex-col gap-2 mt-2 overflow-auto max-h-[10rem]',
                  isPhone && 'max-h-[30vh]',
                )}
              >
                {poolList.map((pool) => (
                  <div
                    key={pool.id}
                    className="flex-between gap-2 px-3 py-2 hover:bg-background-hover duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <TokenPair
                          token0={get(pool, 'token0')}
                          token1={get(pool, 'token1')}
                        />
                      </div>
                    </div>
                    <span className="text-brand-primary">$145.309.21</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;
