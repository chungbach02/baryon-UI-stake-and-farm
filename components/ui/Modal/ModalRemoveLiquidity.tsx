import { ILpInfoModel } from '@/types/pool.model';
import { IBaseTokenModel } from '@/types/token.model';
import { formatReadableNumber } from '@/utils/format';
import { Button, TokenImg } from '@ne/uikit-dex';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import React from 'react';
import BoxPrimary from '../BoxPrimary';
import { calculateTokenAmountInPool } from '@/utils/function';

const ItemInfo = ({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-txt-secondary">{label}</span>
      <div>{children}</div>
    </div>
  );
};

const ModalRemoveLiquidity = ({
  onConfirm,
  lpInfo,
  token0,
  token1,
  loading,
  onCancel,
  lpAmount,
}: {
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  lpAmount?: number;
  lpInfo?: ILpInfoModel;
  token0?: IBaseTokenModel;
  token1?: IBaseTokenModel;
}) => {
  const t = useTranslations();
  const token0Symbol = get(token0, 'symbol', '').toUpperCase();
  const token1Symbol = get(token1, 'symbol', '').toUpperCase();
  const rate = lpInfo?.poolRate ?? 0;
  const rateReverse = lpInfo?.poolRateReverse ?? 0;
  const { amountToken0, amountToken1 } = calculateTokenAmountInPool({
    lpInfo,
    lpInPool: lpAmount,
    token0,
    token1,
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-brand-primary text-3xl">
            {formatReadableNumber(amountToken0, { isTokenAmount: true })}
          </div>
          <div className="flex gap-2 text-3xl items-center">
            {token0Symbol}
            <TokenImg src={get(token0, 'image') ?? get(token0, 'logoURI')} />
          </div>
        </div>
        <div className="text-txt-secondary">+</div>
        <div className="flex justify-between items-center">
          <div className="text-brand-primary text-3xl">
            {formatReadableNumber(amountToken1, { isTokenAmount: true })}
          </div>
          <div className="flex gap-2 text-3xl items-center">
            {token1Symbol}
            <TokenImg src={get(token1, 'image') ?? get(token1, 'logoURI')} />
          </div>
        </div>
      </div>
      <BoxPrimary className="mt-6">
        <div className="flex flex-col gap-3">
          <ItemInfo label={`${token0Symbol}/${token0Symbol}`}>
            <div className="flex items-center gap-2">
              {formatReadableNumber(Number(lpAmount ?? 0), {
                isTokenAmount: true,
              })}
              <TokenImg
                size="sm"
                src={get(token0, 'image') ?? get(token0, 'logoURI')}
              />
              <TokenImg
                size="sm"
                src={get(token1, 'image') ?? get(token1, 'logoURI')}
              />
            </div>
          </ItemInfo>
          <ItemInfo label={t('common_rates')}>
            <div className="flex items-center flex-col gap-2">
              <div>
                1 {token0Symbol} = {formatReadableNumber(rate)} {token1Symbol}
              </div>
              <div>
                1 {token1Symbol} = {formatReadableNumber(rateReverse)}{' '}
                {token0Symbol}
              </div>
            </div>
          </ItemInfo>
        </div>
      </BoxPrimary>

      <div className="flex items-center gap-4 mt-6 ipad:mt-4">
        <Button
          size="lg"
          color="secondary"
          isBlock
          disabled={loading}
          onClick={onCancel}
        >
          {t('common_cancel')}
        </Button>
        <Button onClick={onConfirm} size="lg" isBlock isLoading={loading}>
          {t('common_remove')}
        </Button>
      </div>
    </>
  );
};

export default ModalRemoveLiquidity;
