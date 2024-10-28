'use client';

import { useFavorite } from '@/hook/useFavorite';
import { IBaseTokenModel } from '@/types/token.model';
import { formatReadableNumber } from '@dagora/utils';
import { Icon } from '@ne/uikit-dex';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized';
import { twMerge } from 'tailwind-merge';
import TokenPrice from '../common/TokenPrice';
import EmptyState from './EmptyState';
import TokenInfo from './TokenInfo';

interface TokensTableProps {
  tokenList: IBaseTokenModel[];
  onClick: (token: IBaseTokenModel) => void;
  onHandleFavorite: (token?: IBaseTokenModel) => void;
}

export const TokensTable = ({
  tokenList,
  onClick,
  onHandleFavorite,
}: TokensTableProps) => {
  const t = useTranslations();
  const { isFavorite } = useFavorite();

  const renderRow: ListRowRenderer = ({ index, key, style }) => {
    const data = tokenList[index];

    const isLike = isFavorite(get(data, 'address', ''), 'baryonToken');

    return (
      <button
        style={style}
        className="grid grid-cols-12 w-full items-center cursor-pointer hover:bg-background-secondary px-6"
        onClick={() => onClick(data)}
        key={key}
      >
        <div className="col-span-6">
          <div className="flex items-center gap-4 phone:w-[40vw] overflow-hidden">
            <div>
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
                  onHandleFavorite(data);
                }}
              />
            </div>
            <TokenInfo
              size="lg"
              classNameMain="uppercase"
              token={{
                img: get(data, 'image'),
                name: get(data, 'symbol', ''),
                subName: get(data, 'name'),
              }}
            />
          </div>
        </div>

        <div className="col-span-3 text-end">
          {formatReadableNumber(Number(data.balance ?? 0), {
            isTokenAmount: true,
          })}
        </div>
        <div className="col-span-3 text-txt-secondary text-end">
          <TokenPrice id={data.id} amount={data.balance ?? 0} />
        </div>
      </button>
    );
  };

  return (
    <div className="-mx-6">
      <div className="grid grid-cols-12 mb-4 px-6">
        <div className="col-span-6">{t('common_token')}</div>
        <div className="col-span-3 text-end">{t('common_balance')}</div>
        <div className="col-span-3 text-end">{t('common_value')}</div>
      </div>
      <div className="h-[250px] relative w-full">
        {tokenList.length ? (
          <AutoSizer>
            {({ width, height }) => {
              return (
                <List
                  width={width}
                  height={height}
                  rowRenderer={renderRow}
                  rowCount={tokenList.length}
                  rowHeight={72}
                />
              );
            }}
          </AutoSizer>
        ) : (
          <EmptyState dynamic={true} />
        )}
      </div>
    </div>
  );
};
