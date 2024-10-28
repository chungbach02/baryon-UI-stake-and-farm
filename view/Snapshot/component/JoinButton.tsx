import { useToast } from '@/components/ui/Toast';
import { ENDPOINTS } from '@/constants/endpoints';
import { useInvalidateQueryKey } from '@/hook/useInvalidateQueryKey';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { IError } from '@/types/base.model';
import { IJoinSnapshotRequest } from '@/types/snapshot.model';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { Button, Modal } from '@ne/uikit-dex';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { MouseEventHandler, useEffect, useState } from 'react';

interface JoinButtonProps {
  isEnd?: boolean;
  isJoined?: boolean;
  id?: string;
}
const JoinButton = ({
  id,
  isEnd = false,
  isJoined = false,
}: JoinButtonProps) => {
  const t = useTranslations();
  const { address } = useWallet();
  const { toast } = useToast();
  const { baryonApiService } = useBaryonServices();
  const { invalidateSnapshot } = useInvalidateQueryKey();
  const [openModal, setOpenModal] = useState(false);

  const {
    mutate: joinSnapshot,
    isSuccess,
    isError,
    error,
  } = useMutation<string, IError, IJoinSnapshotRequest>({
    mutationFn: (data) =>
      baryonApiService.base.post(ENDPOINTS.SNAPSHOT_PARTICIPANT, data),
    onSuccess: () => invalidateSnapshot(),
  });

  const handleOpenModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!address) {
      toast({
        type: 'error',
        text: t('toast_no_wallet'),
      });
      return;
    }
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleConfirm = () => {
    if (address && id) {
      joinSnapshot({ id, address });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        type: 'success',
        text: t('toast_successfully_join_snapshot'),
      });
      setOpenModal(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error) {
      toast({
        type: 'error',
        text: String(error),
      });
      setOpenModal(false);
    }
  }, [isError, error]);

  const renderButton = () => {
    if (isEnd) {
      return <Button disabled>{t('snapshot_camp_end')}</Button>;
    }
    if (isJoined) {
      return <Button disabled>{t('snapshot_joined')}</Button>;
    }
    return <Button onClick={handleOpenModal}>{t('snapshot_join_now')}</Button>;
  };

  return (
    <>
      {renderButton()}
      <Modal
        open={openModal}
        onSetOpen={setOpenModal}
        withIcon={isEnd ? 'success' : 'slippage'}
      >
        <p className="text-txt-secondary text-center text-base">
          {t('modal_join_snapshot')}
        </p>
        <div className="flex items-center gap-6 mt-8">
          <Button isBlock color="secondary" onClick={handleCancel}>
            {t('common_cancel')}
          </Button>
          <Button isBlock onClick={handleConfirm}>
            {t('common_confirm')}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default JoinButton;
