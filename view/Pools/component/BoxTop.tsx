import CurrencyValue from '@/components/common/CurrencyValue';
import BoxPrimary from '@/components/ui/BoxPrimary';
import Tag from '@/components/ui/Tag';
import TokenInfo from '@/components/ui/TokenInfo';
import TokenPair from '@/components/ui/TokenPair';
import { EndpointGenerator } from '@/constants/generatePath';
import { IBaseTokenModel } from '@/types/token.model';
import { Skeleton } from '@ne/uikit-dex';
import { get } from 'lodash';
import Link from 'next/link';

export type ITopItem = {
  poolAddress?: string;
  token0?: IBaseTokenModel;
  token1?: IBaseTokenModel;
  value?: number;
  percent?: number;
};
interface props {
  title?: string;
  items: ITopItem[];
  isLoading?: boolean;
  isSingle?: boolean;
}

const BoxTop = ({ title, items, isLoading, isSingle }: props) => {
  if (!items.length) return <></>;

  return (
    <BoxPrimary className="w-1/3 ipad:w-full">
      <h4>{title}</h4>
      <div className="mt-5 flex flex-col space-y-4">
        {isLoading && [
          ...Array(3)
            .fill(1)
            .map((it, idx) => {
              return (
                <div className="w-full" key={idx}>
                  <Skeleton height={24} width={'100%'} />
                </div>
              );
            }),
        ]}
        {!isLoading &&
          items.map((item, index) => {
            return (
              <div className="flex-between gap-2" key={index}>
                <Link
                  href={
                    isSingle
                      ? EndpointGenerator.getTokenPoolDetail(
                          get(item, 'token0.address', ''),
                          true,
                        )
                      : EndpointGenerator.getTokenPoolDetail(
                          get(item, 'poolAddress', ''),
                          false,
                        )
                  }
                  className="flex items-center hover:text-brand-primary duration-200"
                >
                  {isSingle ? (
                    <TokenInfo
                      classNameMain="capitalize duration-200 group-hover:text-brand-primary"
                      classNameSub="uppercase text-txt-secondary"
                      dir="hor"
                      token={{
                        img:
                          get(item, 'token0.image', '') ||
                          get(item, 'token0.URI', ''),
                        subName: get(item, 'token0.symbol', ''),
                        name: get(item, 'token0.name', ''),
                      }}
                    />
                  ) : (
                    <TokenPair token0={item?.token0} token1={item?.token1} />
                  )}
                </Link>
                {item.value && <CurrencyValue value={item?.value} />}
                {item?.percent && (
                  <Tag
                    type={Number(item.percent) > 0 ? 'success' : 'error'}
                    className="bg-transparent p-0"
                    postfix="%"
                    prefix={Number(item.percent) > 0 ? '+' : '-'}
                  >
                    {Number(item.percent).toFixed(2)}
                  </Tag>
                )}
              </div>
            );
          })}
      </div>
    </BoxPrimary>
  );
};

export default BoxTop;
