'use client';

import { Icon, Switch } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import PoolDetail from './PoolDetail';
import PoolList from './PoolList';
import { useCustomRouter } from '@/hook/useCustomRouter';
import { IPairTokenParams } from '@/types/base.model';

const BoxLeft = () => {
  const t = useTranslations();

  const [isListPool, setIsListPool] = useState<boolean>(false);
  const { token0, token1, replace, pathname } =
    useCustomRouter<IPairTokenParams>();

  useEffect(() => {
    setIsListPool(!token0 || !token1);
  }, [token0, token1]);

  useEffect(() => {
    if (isListPool) replace(pathname);
  }, [isListPool]);

  return (
    <div>
      <div>
        <div
          className={twMerge('gap-2 hidden flex-between', isListPool && 'flex')}
        >
          <div className="flex items-center gap-3 ">
            <span className=" font-semibold text-xl">
              {t('liquidity_your_liquidity')}
            </span>
            <span className="text-txt-secondary text-base">0</span>
          </div>
          <div>
            <Switch
              className="text-txt-secondary"
              label={t('common_farming')}
            />
          </div>
        </div>
        <button
          onClick={() => setIsListPool(true)}
          className={twMerge(
            'inline-flex items-center gap-1 group hover:text-brand-primary duration-300 cursor-pointer',
            isListPool && 'hidden',
          )}
        >
          <Icon
            size="xl"
            className="text-txt-secondary"
            iconName="arrow_left"
          />
          <span className="text-base">{t('liquidity_manage_pool')}</span>
        </button>
      </div>
      <div className="mt-6 relative">
        {isListPool && <PoolList onSelect={() => setIsListPool(true)} />}
        {!isListPool && <PoolDetail onBack={() => setIsListPool(false)} />}
      </div>
    </div>
  );
};

export default BoxLeft;
