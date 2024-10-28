'use client';

import BoxSecondary from '@/components/ui/BoxSecondary';
import InputToken from '@/components/ui/InputToken';
import ModalReceive from '@/components/ui/Modal/ModalReceive';
import { useSuccessModal } from '@/components/ui/ModalSuccess/useSuccessModal';
import { useLiquidityServices } from '@/hook/services/useLiquidityServices';
import { useApproval } from '@/hook/useApproval';
import { useBalance } from '@/hook/useBalance';
import { useUtility } from '@/hook/useUtility';
import { useAddLiquidity } from '@/providers/AddLiquidityProvider';
import { useLiquidityInfo } from '@/providers/LiquidityInfoProvider';
import { formatReadableNumber } from '@/utils/format';
import { convertBalanceToWei } from '@dagora/utils';
import { Button, Icon, Modal } from '@ne/uikit-dex';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useApproveModal } from '../Modals/useApproveModal';
import { useToast } from '@/components/ui/Toast';
import { useInvalidateQueryKey } from '@/hook/useInvalidateQueryKey';

interface Props {
  slippage: number;
}

const Add = ({ slippage }: Props) => {
  const t = useTranslations();
  const { toast } = useToast();
  const { isNativeToken } = useUtility();
  const [supplyModal, setSupplyModal] = useState<boolean>(false);
  const { invalidatePoolInfo } = useInvalidateQueryKey();
  const { modal: successModal, openModal: openSuccessModal } =
    useSuccessModal();

  const { modal: approveModal, openModal: openApproveModal } = useApproveModal({
    onSuccess: (tx) => {
      invalidatePoolInfo();
      openSuccessModal(tx);
    },
  });
  const { poolInfo, isNotExist } = useLiquidityInfo();
  const { token0, setToken0, token1, setToken1 } = useAddLiquidity();
  const { depositService } = useLiquidityServices();
  const { isApprove: isApproveToken0 } = useApproval(
    token0?.address,
    Number(token0?.amount ?? 0),
  );
  const { isApprove: isApproveToken1 } = useApproval(
    token1?.address,
    Number(token1?.amount ?? 0),
  );

  const [{ balance: balance0 }, { balance: balance1 }] = [
    useBalance(isNativeToken(token0?.id) ? undefined : token0?.address),
    useBalance(isNativeToken(token1?.id) ? undefined : token1?.address),
  ];

  const isSufficient0 =
    Number(token0?.amount ?? 0) && balance0 >= Number(token0?.amount);
  const isSufficient1 =
    Number(token0?.amount ?? 0) && balance1 >= Number(token1?.amount);

  let rate = poolInfo?.poolRate ?? 0;
  if (isNotExist && token0?.amount && token1?.amount) {
    rate = Number(token0.amount) / Number(token1.amount);
  }
  const rateReverse = rate ? 1 / rate : 0;

  const shareOfPool = !isNotExist
    ? Number(token0?.amount ?? 0) /
      (Number(token0?.amount) + Number(poolInfo?.token0Amount))
    : 1;

  const poolStats = [
    {
      key: 1,
      value: rate,
      content: `${get(token0, 'symbol', '').toUpperCase()} ${t('common_per')} ${get(token1, 'symbol', '').toUpperCase()}`,
    },
    {
      key: 2,
      value: rateReverse,
      content: `${get(token1, 'symbol', '').toUpperCase()} ${t('common_per')} ${get(token0, 'symbol', '').toUpperCase()}`,
    },
    {
      key: 3,
      value: shareOfPool * 100,
      content: t('liquidity_share_of_pool'),
      postfix: '%',
    },
  ];

  const handleDepositLiquidity = () => {
    if (!token0 || !token1) {
      return;
    }

    depositService.deposit({
      firstTokenInfo: { address: token0?.address, decimals: token0?.decimal },
      secondTokenInfo: { address: token1?.address, decimals: token1?.decimal },
      firstTokenAmount: convertBalanceToWei(
        token0.amount ?? 0,
        token0.decimal,
      ).toString(),
      secondTokenAmount: convertBalanceToWei(
        token1.amount ?? 0,
        token1.decimal,
      ).toString(),
      slippage,
      isWaitTx: true,
      isCreatePool: isNotExist,
    });
  };

  useEffect(() => {
    if (depositService.error) {
      setSupplyModal(false);
      toast({ type: 'error', text: String(depositService.error) });
    }
  }, [depositService.error]);

  return (
    <div>
      {successModal}
      {approveModal}
      <BoxSecondary>
        <InputToken onChange={setToken0} token={token0} disabled={!token0} />
      </BoxSecondary>
      <div className="flex justify-center my-3">
        <span className="text-3xl text-txt-secondary">+</span>
      </div>
      <BoxSecondary>
        <InputToken onChange={setToken1} token={token1} disabled={!token1} />
      </BoxSecondary>
      {isNotExist && (
        <BoxSecondary className="mt-4">
          <div className="flex gap-3">
            <Icon
              size="xl"
              iconName="tick_circle_check"
              className="mt-1 text-brand-primary"
            />
            <div>
              <h6> {t('liquidity_you_are_first')}</h6>
              <div className="mt-1">
                <p>{t('liquidity_the_ratio_of_tokens')}</p>
                <p className="mt-1">{t('liquidity_once_you_are_happy')}</p>
              </div>
            </div>
          </div>
        </BoxSecondary>
      )}
      {token0 && token1 && (
        <BoxSecondary className="mt-4">
          <span>{t('liquidity_prices_and_pool_share')}</span>
          <div className="mt-4 grid grid-cols-3">
            {poolStats.map((it) => {
              return (
                <div
                  key={it.key}
                  className="flex-center flex-col text-base gap-1 text-txt-secondary text-center"
                >
                  <span>
                    {formatReadableNumber(it?.value ?? 0, {
                      postfix: it.postfix,
                    })}
                  </span>
                  <span className="text-xs">{it?.content}</span>
                </div>
              );
            })}
          </div>
        </BoxSecondary>
      )}
      <div className="mt-4 flex items-center gap-4">
        {token0 && !isNativeToken(token0.id) && !isApproveToken0 && (
          <Button
            isBlock
            size="lg"
            className="gap-1"
            disabled={!isSufficient0}
            onClick={() => openApproveModal(token0)}
          >
            {t('common_approve')}
            <span className="uppercase">{token0.symbol}</span>
          </Button>
        )}
        {token1 && !isNativeToken(token1.id) && !isApproveToken1 && (
          <Button
            isBlock
            size="lg"
            className="gap-1"
            disabled={!isSufficient1}
            onClick={() => openApproveModal(token1)}
          >
            {t('common_approve')}
            <span className="uppercase">{token1.symbol}</span>
          </Button>
        )}
      </div>
      <Button
        isBlock
        size="lg"
        className="mt-4"
        onClick={() => setSupplyModal(true)}
        disabled={!isSufficient0 || !isSufficient1}
      >
        {t('common_supply')}
      </Button>

      <Modal
        isHideClose
        heading={t('modal_you_will_receive')}
        open={supplyModal}
        onSetOpen={setSupplyModal}
      >
        <ModalReceive
          isCreatePool={isNotExist}
          lpInfo={poolInfo}
          rate={rate}
          poolOfShare={shareOfPool * 100}
          rateReverse={rateReverse}
          token0={token0}
          token1={token1}
          onConfirm={handleDepositLiquidity}
          loading={depositService.isLoading}
          onCancel={() => setSupplyModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Add;
