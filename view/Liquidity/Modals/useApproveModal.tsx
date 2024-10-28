import ModalApproval from '@/components/ui/Modal/ModalApproval';
import { useLiquidityServices } from '@/hook/services/useLiquidityServices';
import { useApproval } from '@/hook/useApproval';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { MODAL } from '@/public';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { EvmTx } from '@dagora/web3-services';
import { Modal } from '@ne/uikit-dex';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface IApproveTokenModel {
  address: string;
  symbol: string;
}

export const useApproveModal = ({
  onSuccess,
}: {
  onSuccess: (tx: string) => void;
}) => {
  const t = useTranslations();
  const { onSendTransaction, liquidityService } = useBaryonServices();
  const { approveTokenService } = useLiquidityServices();
  const { address } = useWallet();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<IApproveTokenModel>();

  const openModal = (token: IApproveTokenModel) => {
    setToken(token);
    setOpen(true);
  };

  const closeModal = () => {
    setToken(undefined);
    setOpen(false);
  };

  const handleApprove = () => {
    approveTokenService.approveToken({
      onSendTransaction: (tx) => onSendTransaction(tx as EvmTx),
      ownerAddress: address ?? '',
      spenderAddress: liquidityService.getLiquidityAddress(),
      tokenAddress: get(token, 'address', ''),
      isWaitTx: true,
    });
  };

  useEffect(() => {
    if (approveTokenService.tx && approveTokenService.isSuccess) {
      setOpen(false);
      onSuccess?.(approveTokenService.tx);
    }
  }, [
    approveTokenService.isSuccess,
    approveTokenService.isLoading,
    approveTokenService.tx,
  ]);

  useEffect(() => {
    if (approveTokenService.error) {
      setOpen(false);
    }
  }, [approveTokenService.error]);

  const modal = (
    <Modal
      withImg={MODAL.reviewOrder}
      heading={t('modal_approval_confirmation')}
      open={open}
      onSetOpen={setOpen}
      size="lg"
      className="max-w-none w-max"
    >
      <ModalApproval
        loading={approveTokenService.isLoading}
        token={token?.symbol}
        onConfirm={() => handleApprove()}
        onCancel={() => setOpen(false)}
      />
    </Modal>
  );

  return {
    modal,
    openModal,
    closeModal,
  };
};
