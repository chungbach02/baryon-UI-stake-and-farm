'use client';

import { CURRENCY, CURRENCY_SYMBOL } from '@/constants/currency';
import { ENDPOINTS } from '@/constants/endpoints';
import { LOCAL_STORAGE_KEYS, QUERY_KEYS } from '@/constants/keys';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { COMMON_IMAGES, PNG_EXTENSION } from '@/public';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse } from '@/types/base.model';
import { setItemStorage } from '@/utils/storage';
import { Icon, Option, SelectDropdown, TokenImg } from '@ne/uikit-dex';
import { useQueryClient } from '@tanstack/react-query';
import { get } from 'lodash';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

const Currency = ({ className }: { className?: string }) => {
  const queryClient = useQueryClient();
  const { infoService } = useBaryonServices();
  const { currency, setCurrency, setPriceRate } = useGlobalStore();

  const configLanguage: Option[] = useMemo(
    () =>
      CURRENCY.map((currency) => ({
        title: currency,
        value: currency,
      })),
    [],
  );

  const handleSelect = ({ value }: Option) => {
    queryClient
      .fetchQuery({
        queryKey: [QUERY_KEYS.CURRENCY, currency],
        queryFn: () =>
          infoService.baseAdaptersAPI.get<IBaseResponse<number>>(
            `${ENDPOINTS.PROGRAM_CURRENCY}/${currency}`,
          ),
      })
      .then((data) => {
        setItemStorage(LOCAL_STORAGE_KEYS.CURRENCY, JSON.stringify(value));
        setCurrency(value);
        setPriceRate(get(data, 'data', 1));
      });
  };

  const dropdownItem = ({
    itemData,
    selected,
  }: {
    itemData: Option;
    selected: boolean;
  }) => {
    return (
      <div className="flex-between gap-3">
        <div className="flex items-center gap-2">
          <TokenImg
            src={`${COMMON_IMAGES.CURRENCY_PATH}/${itemData.value}${PNG_EXTENSION}`}
          />
          <div className="">
            <span
              className={twMerge('block', selected && 'text-brand-primary')}
            >
              {itemData.value} ({get(CURRENCY_SYMBOL, itemData.value, '')})
            </span>
            <span className="text-txt-secondary text-xs ">
              {itemData.value}
            </span>
          </div>
        </div>
        {selected && (
          <Icon
            size="sm"
            className="text-brand-primary"
            iconName={'tick_circle_check'}
          />
        )}
      </div>
    );
  };

  return (
    <SelectDropdown
      selected={configLanguage.find(({ value }) => currency === value)}
      options={configLanguage}
      onSelected={handleSelect}
      dropdownItem={dropdownItem}
      menuListClassName="min-w-[15rem]"
      buttonClassName="min-w-full gap-2 bg-transparent uppercase px-0"
      className={twMerge('w-auto', className)}
      dropdownShow={currency}
    />
  );
};

export default Currency;
