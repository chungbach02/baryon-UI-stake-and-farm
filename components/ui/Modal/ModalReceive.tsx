import { IBaseTokenModel } from '@/types/token.model';
import { formatReadableNumber } from '@/utils/format';
import { Button } from '@ne/uikit-dex';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import React from 'react';
import BoxPrimary from '../BoxPrimary';
import { TokenImg } from '../TokenImg';
import {
  calculateLpReceive,
  calculateTokenAmountInPool,
} from '@/utils/function';
import { ILpInfoModel } from '@/types/pool.model';

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

interface Props {
  token0?: IBaseTokenModel;
  token1?: IBaseTokenModel;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  rate: number;
  rateReverse: number;
  poolOfShare: number;
  isCreatePool: boolean;
  lpInfo?: ILpInfoModel | null;
}

const ModalReceive = ({
  token0,
  token1,
  onConfirm,
  loading,
  onCancel,
  rate,
  rateReverse,
  poolOfShare,
  isCreatePool,
  lpInfo,
}: Props) => {
  const t = useTranslations();

  const token0Symbol = get(token0, 'symbol', '').toUpperCase();
  const token1Symbol = get(token1, 'symbol', '').toUpperCase();
  const lpReceive = calculateLpReceive({
    token: token0,
    isCreatePool,
    lpInfo,
  });

  return (
    <>
      <div className="text-center">
        <div className="text-5xl text-brand-primary ">
          {formatReadableNumber(lpReceive)}
        </div>
        <div className="flex-center text-center gap-2 flex-col mt-6">
          <div className="flex items-center gap-2">
            <TokenImg
              size="lg"
              src={get(token0, 'image') ?? get(token0, 'logoURI')}
            />
            <TokenImg
              size="lg"
              src={get(token1, 'image') ?? get(token1, 'logoURI')}
            />
          </div>
          <span className="text-txt-secondary text-base">
            {`${token0Symbol}/${token1Symbol}  ${t('common_pool_tokens')}`}
          </span>
        </div>
      </div>
      <BoxPrimary className="mt-6">
        <div className="flex flex-col gap-3">
          <ItemInfo label={`${token0Symbol} ${t('common_deposit')}`}>
            <div className="flex items-center gap-1">
              {formatReadableNumber(Number(token0?.amount ?? 0), {
                isTokenAmount: true,
              })}{' '}
              <TokenImg src={get(token0, 'image') ?? get(token0, 'logoURI')} />
            </div>
          </ItemInfo>
          <ItemInfo label={`${token1Symbol} ${t('common_deposit')}`}>
            {' '}
            <div className="flex items-center gap-1">
              {formatReadableNumber(Number(token1?.amount ?? 0), {
                isTokenAmount: true,
              })}{' '}
              <TokenImg src={get(token1, 'image') ?? get(token1, 'logoURI')} />
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
          <ItemInfo label={t('common_share_of_pool')}>
            {formatReadableNumber(poolOfShare, { postfix: '%' })}
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
          {t('common_supply')}
        </Button>
      </div>
    </>
  );
};

export default ModalReceive;
