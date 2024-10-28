import { MODAL } from '@/public';
import { Modal } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ModalSuccess from './ModalSuccess';

export const useSuccessModal = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [tx, setTx] = useState('');

  const openModal = (tx: string) => {
    setOpen(true);
    setTx(tx);
  };
  const closeModal = () => {
    setOpen(false);
    setTx('');
  };

  const modal = (
    <Modal
      withImg={MODAL.checkSuccess}
      heading={t('common_success')}
      open={open}
      onSetOpen={setOpen}
    >
      <ModalSuccess transaction={tx} onClose={closeModal} />
    </Modal>
  );
  return {
    modal,
    openModal,
    closeModal,
  };
};
