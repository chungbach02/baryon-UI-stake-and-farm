import { Button } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';

const ModalSuccess = ({
  transaction = '/',
  note,
  onClose,
}: {
  transaction?: string;
  note?: string;
  onClose: () => void;
}) => {
  const t = useTranslations();
  return (
    <div className="text-center text-base">
      <span> {note ?? t('modal_you_have_successfully_transaction')}</span>
      <a
        href={transaction}
        target="_blank"
        className="text-brand-primary block mt-4"
      >
        {t('common_view_transaction')}
      </a>
      <Button isBlock size="lg" className="mt-6" onClick={onClose}>
        {t('common_close')}
      </Button>
    </div>
  );
};

export default ModalSuccess;
