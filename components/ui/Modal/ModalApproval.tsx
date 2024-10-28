import { Button } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import React from 'react';

const ModalApproval = ({
  onConfirm,
  token,
  loading = false,
  onCancel,
}: {
  onConfirm?: () => void;
  onCancel?: () => void;
  token?: string;
  loading?: boolean;
}) => {
  const t = useTranslations();

  return (
    <div>
      <div className="text-center text-base ipad:text-sm">
        <div className="block w-max">
          {`${t('modal_you_are_approve_baryon')} ${token?.toUpperCase()} ${t('common_token').toLowerCase()}.`}
        </div>
        <div>{t('modal_are_you_sure_approving')}</div>
      </div>
      <div className="flex items-center gap-6 ipad:gap-4 mt-6">
        <Button color="secondary" isBlock disabled={loading} onClick={onCancel}>
          {t('common_cancel')}
        </Button>
        <Button isBlock onClick={onConfirm} isLoading={loading}>
          {t('common_confirm')}
        </Button>
      </div>
    </div>
  );
};

export default ModalApproval;
