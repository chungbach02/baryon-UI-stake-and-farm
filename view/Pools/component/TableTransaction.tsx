'use client';

import CurrencyValue from '@/components/common/CurrencyValue';
import EmptyState from '@/components/ui/EmptyState';
import { DEFAULT_PAGINATION } from '@/constants';
import { DATE_FORMATS } from '@/constants/dateFormats';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useFilterParams } from '@/hook/useFilterParams';
import { mapTransactionType } from '@/mapper/transaction.mapper';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse, IPaginationResponse } from '@/types/base.model';
import { ITransactionModel } from '@/types/transaction.model';
import { formatDate, formatReadableNumber } from '@/utils/format';
import { PaginationParams } from '@baryon/sdk';
import { formatAddress } from '@dagora/utils';
import { Card, TabButton, TabItem, Table, useBreakPoint } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}
const TableTransaction = ({ className }: Props) => {
  const t = useTranslations();
  const { isIpad, isIpadPro } = useBreakPoint();
  const { activeChain } = useGlobalStore();
  const { baryonApiService } = useBaryonServices();

  const { params, setParams } = useFilterParams<
    PaginationParams & { type?: string }
  >({
    page: DEFAULT_PAGINATION.PAGE_NUMBER,
    size: DEFAULT_PAGINATION.PAGE_SIZE,
    type: 'all',
  });

  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS, params, activeChain],
    queryFn: () =>
      baryonApiService.base.post<
        IBaseResponse<IPaginationResponse<ITransactionModel>>
      >(ENDPOINTS.TRANSACTION, {
        chain: activeChain,
        ...params,
        type: params.type !== 'all' ? params.type : undefined,
      }),
  });

  const items: TabItem[] = [
    {
      title: t('common_all'),
      key: 'all',
    },
    {
      title: t('common_swap'),
      key: 'swap',
    },
    {
      title: t('common_add'),
      key: 'addLiquidity',
    },
    {
      title: t('common_remove'),
      key: 'removeLiquidity',
    },
  ];

  return (
    <Card
      classNames={{
        header: 'ipad:flex-col items-start'
      }}
      className={twMerge('rounded-xl ipad:p-4', className)}
      title={<h4>{t('common_transaction')}</h4>}
      extra={
        <div className="flex items-center gap-4">
          {items.map((it, idx) => {
            const isActive = params.type === it.key;
            return (
              <TabButton
                variant="blur"
                isSelected={isActive}
                key={idx}
                onClick={() => setParams({ type: it.key })}
              >
                {it?.title}
              </TabButton>
            );
          })}
        </div>
      }
    >
      <Table
        className='min-h-[400px]'
        isLoading={isPending}
        isHoverLine
        emptyRender={<EmptyState className="my-20" />}
        dataSource={get(data, 'data.data', [])}
        columns={[
          {
            title: t('common_action'),
            key: 'action',
            width: 20,
            render: (_, row) => {
              const { token0: first, token1: second } = row;
              const display = `${t(mapTransactionType(row.type))} ${first?.symbol.toUpperCase()} and ${second?.symbol.toUpperCase()}`;
              return (
                <Link href={''} className="text-brand-primary">
                  {display}
                </Link>
              );
            },
          },

          {
            dataIndex: 'amountUSD',
            key: 'amountUSD',
            title: t('common_total_value'),
            align: 'end',
            render: (value) => <CurrencyValue value={Number(value || 0)} />,
            hide: isIpad,
          },
          {
            key: 'amount0',
            title: t('common_total_amount'),
            align: 'end',
            render: (_, row) => {
              const { token0: token, amount0: amount } = row;
              return (
                <div className="flex items-center gap-1">
                  <span>
                    {formatReadableNumber(Number(amount), {
                      isTokenAmount: true,
                    })}
                  </span>
                  <span className="uppercase text-txt-secondary">
                    {get(token, 'symbol', '')}
                  </span>
                </div>
              );
            },
            hide: isIpad,
          },
          {
            key: 'amount1',
            title: t('common_total_amount'),
            align: 'end',
            render: (_, row) => {
              const { token1: token, amount1: amount } = row;
              return (
                <div className="flex items-center gap-1">
                  <span>
                    {formatReadableNumber(Number(amount), {
                      isTokenAmount: true,
                    })}
                  </span>
                  <span className="uppercase text-txt-secondary">
                    {get(token, 'symbol', '')}
                  </span>
                </div>
              );
            },
            hide: isIpad,
          },
          {
            key: 'from',
            dataIndex: 'from',
            title: t('common_account'),
            align: 'end',
            hide: isIpadPro,
            render: (value) => (
              <div className="text-brand-primary">
                {formatAddress(String(value), 5)}
              </div>
            ),
          },
          {
            key: 'time',
            dataIndex: 'createdAt',
            title: t('common_time'),
            align: 'end',
            render: (value) =>
              formatDate(String(value), DATE_FORMATS.TIME_DATE),
          },
        ]}
      />
    </Card>
  );
};

export default TableTransaction;
