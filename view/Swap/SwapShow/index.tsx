'use client';

import CurrencyValue from '@/components/common/CurrencyValue';
import BoxPrimary from '@/components/ui/BoxPrimary';
import ChartBox from '@/components/ui/ChartBox';
import EmptyState from '@/components/ui/EmptyState';
import TokenInfo from '@/components/ui/TokenInfo';
import { DEFAULT_CHART_FILTER } from '@/constants';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useUtility } from '@/hook/useUtility';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { ISwapChartModal } from '@/types/chart.model';
import { formatDate } from '@/utils/format';
import { Icon, Table } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

const tableData = [...Array(20)].fill(1).map((item, index) => {
  return {
    key: index,
    name: 'Coin 98',
    symbol: 'c98',
    value: 0.0001,
  };
});

const timeFilter = [
  {
    value: '1',
    name: '24h',
  },
  {
    value: '7',
    name: '1W',
  },
  {
    value: '30',
    name: '1M',
  },
  {
    value: '365',
    name: '1Y',
  },
];

const SwapShow = () => {
  const t = useTranslations();
  const { findToken } = useUtility();
  const { infoService } = useBaryonServices();
  const [active, setActive] = useState(timeFilter[0]);
  const tokenInfo = findToken('0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6');

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.SWAP_CHART, active.value, tokenInfo?.cgkId],
    queryFn: () =>
      infoService.baseAPI.get<ISwapChartModal>(ENDPOINTS.COIN_CGK_CHART, {
        params: {
          day: active.value,
          id: tokenInfo?.cgkId,
          interval: DEFAULT_CHART_FILTER.INTERVAL,
        },
      }),
    // enabled: !!token,
    placeholderData: (previousData) => previousData,
  });
  // const priceChange = Number(tokenInfo.price_change_percentage_24h);

  const length = data?.prices?.length;
  const lastValue = length && length > 1 ? data?.prices[length - 1] : undefined;
  const defaultChartItem = lastValue && {
    label: String(lastValue[2]),
    value: lastValue[1],
  };

  const statistics = [
    {
      label: t('common_market_cap'),
      // value: get(tokenInfo, 'market_data.market_cap.usd'),
    },
    {
      label: t('common_total_supply'),
      // value: get(tokenInfo, 'market_data.total_supply'),
    },
    {
      label: t('common_all_time_low'),
      // value: get(tokenInfo, 'market_data.atl.usd'),
    },
    {
      label: t('common_all_time_high'),
      // value: get(tokenInfo, 'market_data.ath.usd'),
    },
  ];

  const tickCount = useMemo(() => {
    switch (active.value) {
      case '1':
        return 10;
      case '7':
        return 8;
      case '30':
        return 7;
      default:
        return 5;
    }
  }, [active.value]);

  return (
    <div>
      <BoxPrimary>
        <ChartBox
          className="p-0 ipad:p-0 bg-transparent"
          tabs={timeFilter}
          data={get(data, 'prices', []).map((d) => ({
            label: String(d[2] / 1000),
            value: d[1],
          }))}
          chartType="area"
          onChange={(val) => setActive(val)}
          tickCount={tickCount}
          customHeader={(current, tabContainer) => (
            <div className="space-y-2">
              <TokenInfo
                classNameSub="uppercase"
                token={{
                  img: tokenInfo?.image,
                  name: tokenInfo?.name,
                  subName: `(${tokenInfo?.symbol})`,
                }}
                dir="hor"
              />
              <div className="flex justify-between gap-2 ipad:flex-col">
                <div className="flex items-end gap-3">
                  <h3 className="text-brand-primary">
                    <CurrencyValue value={current?.value} />
                  </h3>
                  <h4 className="uppercase">{tokenInfo?.symbol}</h4>
                </div>
                {tabContainer}
              </div>
              <div className="text-center text-txt-placeholder">
                {current?.label && formatDate(Number(current?.label))}
              </div>
            </div>
          )}
        />
        {/* <div className="grid grid-cols-4 ipad:grid-cols-2 gap-6 ipad:gap-4 mt-8 ipad:mt-6">
          {total.map((it, idx) => {
            return (
              <div
                key={idx}
                className="bg-background-secondary rounded-xl p-4 flex-center gap-1 flex-col"
              >
                <span className="text-xl">{it?.value}</span>
                <span className="text-xs text-txt-secondary">{it?.title}</span>
              </div>
            );
          })}
        </div> */}
      </BoxPrimary>

      <BoxPrimary className="mt-6 ipad:mt-4">
        <button className=" mb-4 pb-2 border-b border-brand-primary text-base text-brand-primary">
          {t('common_history')}
        </button>
        <div className="max-h-[40vh] min-h-[300px] overflow-auto relative">
          <Table
            classNameHeader="hidden"
            emptyRender={<EmptyState />}
            columns={[
              {
                key: 'token',
                align: 'start',
                width: 40,
                render: (_, row) => (
                  <TokenInfo
                    size="lg"
                    token={{
                      img: get(row, 'image'),
                      name: get(row, 'value', ''),
                      subName: get(row, 'name', ''),
                    }}
                  />
                ),
              },
              {
                key: 'swap',
                align: 'start',
                width: 30,
                render: () => (
                  <Icon className="text-txt-secondary" iconName="swap" />
                ),
              },
              {
                key: 'token',
                align: 'start',
                width: 30,
                render: (_, row) => (
                  <TokenInfo
                    size="lg"
                    token={{
                      name: get(row, 'value', ''),
                      subName: get(row, 'name', ''),
                    }}
                  />
                ),
              },
              {
                key: 'time',
                align: 'end',
                width: 50,
                render: (time) => (
                  <span className="text-txt-secondary"> 15:34 23/09/24</span>
                ),
              },
            ]}
            dataSource={tableData}
          />
        </div>
      </BoxPrimary>
    </div>
  );
};

export default SwapShow;
