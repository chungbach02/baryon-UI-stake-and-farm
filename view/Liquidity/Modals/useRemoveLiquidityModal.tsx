import ModalApproval from '@/components/ui/Modal/ModalApproval';
import ModalRemoveLiquidity from '@/components/ui/Modal/ModalRemoveLiquidity';
import { useToast } from '@/components/ui/Toast';
import { useLiquidityServices } from '@/hook/services/useLiquidityServices';
import { useInvalidateQueryKey } from '@/hook/useInvalidateQueryKey';
import { MODAL } from '@/public';
import { ILpInfoModel } from '@/types/pool.model';
import { IBaseTokenModel } from '@/types/token.model';
import { calculateTokenAmountInPool } from '@/utils/function';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { convertBalanceToWei, convertWeiToBalance } from '@dagora/utils';
import { Modal } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export const useRemoveLiquidityModal = ({
  onSuccess,
  lpInfo,
  token0,
  token1,
  slippage,
  lpAmount,
}: {
  onSuccess: (tx: string) => void;
  lpInfo?: ILpInfoModel;
  token0?: IBaseTokenModel;
  token1?: IBaseTokenModel;
  slippage: number;
  lpAmount: number;
}) => {
  const t = useTranslations();
  const { toast } = useToast();
  const { invalidatePoolInfo } = useInvalidateQueryKey();
  const { withdrawService } = useLiquidityServices();
  const [open, setOpen] = useState(false);
  const { amountToken0, amountToken1 } = calculateTokenAmountInPool({
    lpInfo,
    lpInPool: lpAmount,
    token0,
    token1,
  });

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const handleWithdrawLiquidity = () => {
    if (!token0 || !token1) {
      return;
    }

    withdrawService.withdraw({
      firstTokenInfo: { address: token0?.address, decimals: token0?.decimal },
      secondTokenInfo: { address: token1?.address, decimals: token1?.decimal },
      firstTokenAmount: convertBalanceToWei(
        amountToken0 ?? 0,
        token0.decimal,
      ).toString(),
      secondTokenAmount: convertBalanceToWei(
        amountToken1 ?? 0,
        token1.decimal,
      ).toString(),
      lpTokenAmount: convertBalanceToWei(lpAmount, lpInfo?.decimal).toString(),
      slippage,
      isWaitTx: true,
    });
  };

  useEffect(() => {
    if (withdrawService.error) {
      setOpen(false);
      toast({ type: 'error', text: String(withdrawService.error) });
    }
  }, [withdrawService.error]);

  useEffect(() => {
    if (withdrawService.isSuccess && withdrawService.tx) {
      onSuccess(withdrawService.tx);
      invalidatePoolInfo();
      setOpen(false);
    }
  }, [withdrawService.tx, withdrawService.isSuccess]);

  const modal = (
    <Modal
      heading={t('modal_you_will_receive')}
      open={open}
      isHideClose
      onSetOpen={setOpen}
    >
      <ModalRemoveLiquidity
        onConfirm={() => handleWithdrawLiquidity()}
        onCancel={() => setOpen(false)}
        lpInfo={lpInfo}
        token0={token0}
        token1={token1}
        lpAmount={lpAmount}
        loading={withdrawService.isLoading}
      />
    </Modal>
  );

  return {
    modal,
    openModal,
    closeModal,
  };
};
