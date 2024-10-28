import { Button } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';

const ModalConfirm = ({
  onConfirm,
  onCancel,
}: {
  onConfirm?: () => void;
  onCancel?: () => void;
}) => {
  const t = useTranslations();

  return (
    <div>
      <div className="text-center text-base ipad:text-sm">
        <div className="block">
          {`${t('modal_confirm_harvest_before_stake')}`}
        </div>
        <div>{t('modal_confirm_continue')}</div>
      </div>
      <div className="flex items-center gap-6 ipad:gap-4 mt-6">
        <Button color="secondary" isBlock onClick={onCancel}>
          {t('common_cancel')}
        </Button>
        <Button isBlock onClick={onConfirm}>
          {t('common_confirm')}
        </Button>
      </div>
    </div>
  );
};

export default ModalConfirm;
