import { useFavorite } from '@/hook/useFavorite';
import { useUtility } from '@/hook/useUtility';
import { IPoolModel } from '@/types/pool.model';
import { ITokenInfoModel } from '@/types/token.model';
import { Button, Icon } from '@ne/uikit-dex';
import { get } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import TokenInfo from './TokenInfo';
import TokenPair from './TokenPair';

const FavoriteList = ({
  onClickItem,
  onClickPool,
  isPool = false,
  detail = false,
  className,
}: {
  onClickItem?: (token: ITokenInfoModel) => void;
  onClickPool?: (token: IPoolModel) => void;
  isPool?: boolean;
  className?: string;
  detail?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isShow, setIsShow] = useState(false);

  const { findToken } = useUtility();
  const {
    favoriteTokenList,
    takeFavorite,
    favoritePoolList,
    takeFavoritePool,
  } = useFavorite();
  const favoriteTokenInfos = favoriteTokenList.map((address) =>
    findToken(address),
  );

  const handleTake = (token?: ITokenInfoModel) => {
    takeFavorite(token?.address ? [token?.address] : [], 'baryonToken');
  };

  const handleTakePool = (pool?: IPoolModel) => {
    takeFavoritePool(pool ? [pool] : []);
  };

  useEffect(() => {
    const evenListener = () => {
      const current = ref?.current?.scrollTop || 0;
      const lengthData = favoriteTokenInfos.length;
      if (current > 0 && lengthData > 12) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };
    ref?.current?.addEventListener('scroll', evenListener);
    return () => {
      ref?.current?.removeEventListener('scroll', evenListener);
    };
  }, [ref, JSON.stringify(favoriteTokenInfos)]);

  if(favoritePoolList.length === 0 || favoriteTokenInfos.length === 0) return null


  return (
    <div
      ref={ref}
      className={twMerge(
        'grid grid-cols-4 phone:grid-cols-2 gap-3 max-h-[110px] overflow-auto duration-500 p-4 -m-2',
        className,
        isShow && 'max-h-[155px]',
      )}
    >
      {!isPool
        ? favoriteTokenInfos.map((token, index) =>
            token?.symbol ? (
              <button
                className="group relative bg-background-secondary p-2 rounded-lg flex gap-1 items-center justify-center cursor-pointer hover:bg-background-hover transition-all"
                onClick={() => token && onClickItem?.(token)}
                key={index}
              >
                <TokenInfo
                  token={{
                    img: get(token, 'image', ''),
                    subName: detail
                      ? get(token, 'symbol', '').toUpperCase()
                      : undefined,
                    name: !detail
                      ? get(token, 'symbol', '').toUpperCase()
                      : get(token, 'name', ''),
                  }}
                  classNameMain="max-w-full truncate"
                  dir="hor"
                />
                <Icon
                  size="xl"
                  className="absolute right-0 translate-x-1/2 -translate-y-1/2 text-txt-secondary top-4 group-hover:top-0 duration-300
            opacity-0 group-hover:opacity-100 rotate-0 group-hover:rotate-180"
                  iconName="close_circle_bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTake(token);
                  }}
                />
              </button>
            ) : (
              <></>
            ),
          )
        : favoritePoolList.map((pool, index) => {
            return (
              <button
                className="group relative bg-background-secondary p-2 rounded-lg flex gap-1 items-center justify-center cursor-pointer hover:bg-background-hover transition-all group"
                onClick={() => pool && onClickPool?.(pool)}
                key={index}
              >
                <TokenPair
                  token0={get(pool, 'info.token0')}
                  token1={get(pool, 'info.token1')}
                />
                <Icon
                  size="xl"
                  className="absolute right-0 translate-x-1/2 -translate-y-1/2 text-txt-secondary top-4 group-hover:top-0 duration-300
        opacity-0 group-hover:opacity-100 rotate-0 group-hover:rotate-180"
                  iconName="close_circle_bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTakePool(pool);
                  }}
                />
              </button>
            );
          })}
    </div>
  );
};

export default FavoriteList;
