import BoxSecondary from '@/components/ui/BoxSecondary';
import EmptyState from '@/components/ui/EmptyState';
import { useSuccessModal } from '@/components/ui/ModalSuccess/useSuccessModal';
import TokenInfo from '@/components/ui/TokenInfo';
import { useApproval } from '@/hook/useApproval';
import { useUtility } from '@/hook/useUtility';
import { useLiquidityInfo } from '@/providers/LiquidityInfoProvider';
import { formatReadableNumber } from '@/utils/format';
import { calculateTokenAmountInPool } from '@/utils/function';
import { convertWeiToBalance } from '@dagora/utils';
import { Button, InputNumber, Skeleton, SliderBrand } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useApproveModal } from '../Modals/useApproveModal';
import { useRemoveLiquidityModal } from '../Modals/useRemoveLiquidityModal';
import { MAIN_COIN_AMM, W_MAIN_COIN } from '@/constants/tokens';
import { useGlobalStore } from '@/stores/global.store';
import { MAIN_TOKEN } from '@baryon/sdk';

export const SkeletonRemove = () => {
  return (
    <div>
      <BoxSecondary>
        <Skeleton width={'100%'} height={30} />
        <div className="mt-2">
          <Skeleton width={'100%'} height={20} />
          <Skeleton className="mt-4 pb-4" width={'100%'} height={20} />
        </div>
      </BoxSecondary>
      <BoxSecondary className="mt-6">
        <Skeleton width={'100%'} height={20} />
        <div className="mt-2 flex flex-col gap-2">
          <Skeleton width={'100%'} height={20} />
          <Skeleton width={'100%'} height={20} />
        </div>
      </BoxSecondary>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Skeleton width={'100%'} height={20} />
        <div className="">
          <Skeleton width={'100%'} height={20} />
          <Skeleton className="mt-4" width={'100%'} height={20} />
        </div>
      </div>
      <Skeleton className="mt-4" width={'100%'} height={40} />
      <Skeleton className="mt-4" width={'100%'} height={40} />
    </div>
  );
};

interface Props {
  slippage: number;
}

const Remove = ({ slippage }: Props) => {
  const t = useTranslations();
  const [value, setValue] = useState<string>('');
  const { activeChain } = useGlobalStore();
  const { poolInfo, isNotExist, isLoading } = useLiquidityInfo();
  const { findToken } = useUtility();
  const { modal: successModal, openModal: openSuccessModal } =
    useSuccessModal();

  const { modal: approveModal, openModal: openApproveModal } = useApproveModal({
    onSuccess: openSuccessModal,
  });

  const token0 =
    poolInfo?.firstToken.address === W_MAIN_COIN[activeChain].address
      ? MAIN_COIN_AMM[activeChain]
      : findToken(poolInfo?.firstToken.address);
  const token1 =
    poolInfo?.secondToken.address === W_MAIN_COIN[activeChain].address
      ? MAIN_COIN_AMM[activeChain]
      : findToken(poolInfo?.secondToken.address);

  const rate = poolInfo?.poolRate;
  const rateReverse = poolInfo?.poolRateReverse;
  const lpAmount = convertWeiToBalance(
    poolInfo?.userLpBalance ?? '',
    poolInfo?.lpDecimals,
  ).toNumber();

  const { amountToken0: token0Amount, amountToken1: token1Amount } =
    calculateTokenAmountInPool({
      lpInfo: poolInfo,
      lpInPool: Number(value),
      token0,
      token1,
    });

  const { modal: removeLiquidityModal, openModal: openRemoveLiquidityModal } =
    useRemoveLiquidityModal({
      onSuccess: openSuccessModal,
      lpInfo: poolInfo ?? undefined,
      token0,
      token1,
      slippage,
      lpAmount: Number(value),
    });

  const { isApprove } = useApproval(poolInfo?.poolAddress, lpAmount);
  const lpSufficient = Number(value) <= lpAmount && Number(value) > 0;
  const isEmpty = isNotExist || !poolInfo;

  return (
    <div className="relative">
      {successModal}
      {approveModal}
      {removeLiquidityModal}
      {isLoading && <SkeletonRemove />}
      {!isLoading && isEmpty && <EmptyState className="my-20" />}

      {!isLoading && !isEmpty && (
        <div>
          <BoxSecondary>
            <InputNumber
              isFull
              value={value}
              onChangeValue={(value) => setValue(value)}
              className="bg-background-secondary p-0"
              classNameInput="placeholder:font-semibold text-xl placeholder:text-xl font-semibold"
              placeholder="0.0"
              isAllowed={(values) => {
                const { floatValue } = values;
                return !floatValue || floatValue <= lpAmount;
              }}
            />
            <div>
              <span className="text-txt-secondary">
                {t('common_pool_token')}:{' '}
              </span>
              <button className="text-brand-primary">
                {formatReadableNumber(lpAmount, { isTokenAmount: true })}
              </button>
              <div className="mt-4 pb-4">
                <SliderBrand
                  value={Number(value)}
                  onChange={(value) =>
                    value ? setValue(String(value)) : setValue('')
                  }
                  className="w-full"
                  max={lpAmount}
                  step={lpAmount / 100}
                  tipFormatter={(e) =>
                    `${(lpAmount ? Number((e * 100) / lpAmount) : 0).toFixed(2)}%`
                  }
                />{' '}
              </div>
            </div>
          </BoxSecondary>
          <BoxSecondary className="mt-6">
            <h6>{t('liquidity_you_will_receive')}</h6>

            <div className="mt-2 flex flex-col gap-2">
              <div className="flex-between">
                <TokenInfo
                  classNameMain="uppercase"
                  token={{
                    img: token0?.image,
                    name: token0?.symbol,
                  }}
                />
                <span className="text-txt-secondary">
                  {formatReadableNumber(token0Amount, { isTokenAmount: true })}
                </span>
              </div>
              <div className="flex-between">
                <TokenInfo
                  classNameMain="uppercase"
                  token={{
                    img: token1?.image,
                    name: token1?.symbol,
                  }}
                />
                <span className="text-txt-secondary">
                  {formatReadableNumber(token1Amount, { isTokenAmount: true })}
                </span>
              </div>
            </div>
          </BoxSecondary>
          <div className="flex justify-between gap-2 mt-6">
            <h6 className="text-txt-secondary">{t('common_rates')}</h6>
            <div className="flex flex-col items-end gap-2 uppercase">
              <span>{`1 ${token0?.symbol} = ${rate} ${token1?.symbol}`}</span>
              <span>{`1 ${token1?.symbol} = ${rateReverse} ${token0?.symbol}`}</span>
            </div>
          </div>
          {!isApprove && (
            <Button
              size="lg"
              isBlock
              className="mt-6"
              disabled={!lpSufficient}
              onClick={() =>
                openApproveModal({
                  address: poolInfo?.poolAddress ?? '',
                  symbol: 'LP',
                })
              }
            >
              {t('liquidity_approve_lp')}
            </Button>
          )}
          <Button
            onClick={openRemoveLiquidityModal}
            size="lg"
            isBlock
            className="mt-6"
            disabled={!lpSufficient || !isApprove}
          >
            {t('common_remove')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Remove;
