'use client';

import CurrencyValue from '@/components/common/CurrencyValue';
import EmptyState from '@/components/ui/EmptyState';
import Tag from '@/components/ui/Tag';
import TokenInfo from '@/components/ui/TokenInfo';
import { DEFAULT_PAGINATION, DURATION } from '@/constants';
import { ENDPOINTS } from '@/constants/endpoints';
import { EndpointGenerator } from '@/constants/generatePath';
import { QUERY_KEYS } from '@/constants/keys';
import { useFavorite } from '@/hook/useFavorite';
import { useFilterParams } from '@/hook/useFilterParams';
import { useUtility } from '@/hook/useUtility';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse, IPaginationResponse } from '@/types/base.model';
import { ITokenModel } from '@/types/token.model';
import { formatReadableNumber } from '@/utils/format';
import { PaginationParams } from '@baryon/sdk';
import {
  Card,
  Icon,
  PieLoading,
  Table,
  Tooltip,
  useBreakPoint,
} from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

const TableTopToken = ({ className }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const { takeFavorite, isFavorite } = useFavorite();
  const { baryonApiService } = useBaryonServices();
  const { findGeckoToken } = useUtility();
  const { activeChain } = useGlobalStore();
  const { isIpad } = useBreakPoint();
  const [tableData, setTableData] = useState<ITokenModel[]>([]);

  const { params, setParams } = useFilterParams<PaginationParams>({
    page: DEFAULT_PAGINATION.PAGE_NUMBER,
    size: DEFAULT_PAGINATION.PAGE_SIZE,
  });

  const { data, isPending, refetch } = useQuery({
    queryKey: [QUERY_KEYS.TOKEN_TOP, params, activeChain],
    queryFn: () =>
      baryonApiService.base.post<
        IBaseResponse<IPaginationResponse<ITokenModel>>
      >(ENDPOINTS.TOKEN_TOP, {
        chain: activeChain,
        ...params,
      }),
  });

  useEffect(() => {
    const fetchTableData = async () => {
      const items = get(data, 'data.data', []);
      const updatedTableData = await Promise.all(
        items.map(async (item) => {
          const geckoToken = await findGeckoToken(get(item, 'info.id', ''));
          return {
            ...item,
            price: Number(get(geckoToken, 'current_price', 0)),
            priceChange: Number(
              get(geckoToken, 'price_change_percentage_24h', 0),
            ),
          };
        }),
      );
      setTableData(updatedTableData);
    };

    fetchTableData();
  }, [data]);

  return (
    <Card
      className={twMerge('rounded-xl ipad:p-4', className)}
      title={<h4>{t('pool_top_tokens')}</h4>}
      extra={
        <Tooltip id="topTokens" trigger={t('common_data_auto_refresh')}>
          <PieLoading
            size={20}
            duration={DURATION.PIE_LOADING}
            onComplete={refetch}
          />
        </Tooltip>
      }
    >
      <Table
        className='min-h-[400px]'
        isLoading={isPending}
        isHoverLine
        emptyRender={<EmptyState className="my-20" />}
        onClickRow={(row) =>
          router.push(EndpointGenerator.getTokenPoolDetail(row.address, true))
        }
        pagination={{
          current: get(data, 'data.currentPage', params.page),
          pageSize: params.size,
          totalPage: get(data, 'data.total', 1),
          onChange: (page) => setParams({ page }),
        }}
        dataSource={tableData}
        columns={[
          {
            key: 'like',
            width: 3,
            align: 'center',
            render: (_, row) => {
              const isLike = isFavorite(row.address, 'baryonToken');
              return (
                <Icon
                  iconName={isLike ? 'like_active' : 'like'}
                  className={twMerge(
                    isLike ? 'text-brand-primary' : 'text-txt-secondary',
                    'h-fit',
                  )}
                  size="xl"
                  isHover
                  onClick={(e) => {
                    e.stopPropagation();
                    takeFavorite(
                      row?.address ? [row?.address] : [],
                      'baryonToken',
                    );
                  }}
                />
              );
            },
          },

          {
            key: 'rank',
            width: 3,
            hide: isIpad,
            render: (_, __, idx) => {
              return <span>{++idx}</span>;
            },
          },
          {
            title: t('common_name'),
            key: 'name',
            width: 20,
            render: (_, row) => {
              return (
                <TokenInfo
                  dir="hor"
                  classNameSub="uppercase"
                  token={{
                    img: get(row, 'info.image'),
                    name: get(row, 'info.name'),
                    subName: `(${get(row, 'info.symbol', '')})`,
                  }}
                />
              );
            },
          },
          {
            title: t('common_price'),
            key: 'price',
            dataIndex: 'price',
            width: 15,
            align: 'end',
            render: (value) => {
              return <CurrencyValue value={Number(value)} />;
            },
          },
          {
            title: t('common_price_change'),
            key: 'priceChange',
            dataIndex: 'priceChange',
            width: 15,
            align: 'end',
            hide: isIpad,
            render: (value) => {
              return (
                <Tag
                  type={Number(value) > 0 ? 'success' : 'error'}
                  className="bg-transparent p-0"
                  postfix="%"
                  prefix={
                    Number(value) > 0 ? (
                      <Icon iconName="up_fill" size="sm" className="mr-1" />
                    ) : (
                      <Icon iconName="down_fill" size="sm" className="mr-1" />
                    )
                  }
                >
                  {formatReadableNumber(Number(value))}
                </Tag>
              );
            },
          },
          {
            title: t('common_volume'),
            key: 'volume',
            dataIndex: 'volume24h',
            width: 15,
            align: 'end',
            hide: isIpad,
            render: (value) => <CurrencyValue value={Number(value ?? 0)} />,
          },
          {
            title: t('common_liquidity'),
            key: 'liquidity',
            dataIndex: 'totalLiquidity',
            width: 20,
            align: 'end',
            hide: isIpad,
            render: (value) => <CurrencyValue value={Number(value ?? 0)} />,
          },
        ]}
      />
    </Card>
  );
};

export default TableTopToken;
