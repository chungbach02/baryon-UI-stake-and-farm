import { Button } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import React from 'react';

const ModalNoteSuccess = ({
  transaction = '/',
  note,
}: {
  transaction?: string;
  note?: string;
}) => {
  const t = useTranslations();
  return (
    <div className="text-center text-base">
      <span> {note || t('modal_you_have_successfully_transaction')}</span>
      <a
        href={transaction}
        target="_blank"
        className="text-brand-primary block mt-4"
      >
        {t('common_view_transaction')}
      </a>
      <Button isBlock size="lg" className="mt-6">
        {t('common_close')}
      </Button>
    </div>
  );
};

export default ModalNoteSuccess;
