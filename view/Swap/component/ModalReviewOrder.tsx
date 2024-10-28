import { ItemInfo } from '@/components/ui/ItemInfo';
import ModalNoteSuccess from '@/components/ui/Modal/ModalNoteSuccess';
import { MODAL } from '@/public';
import { Button, Modal, TokenImg } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const TokenInfoCustom = ({
  title,
  value,
  token,
}: {
  title?: string;
  value?: number;
  token?: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <TokenImg size="xl" />
      <div className="flex gap-1 flex-col">
        <span className="text-xs text-txt-secondary">{title}</span>
        <span className="text-xl uppercase">
          {value} {token}
        </span>
      </div>
    </div>
  );
};

const ModalReviewOrder = () => {
  const t = useTranslations();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = () => {
    setIsSuccess(true);
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        <TokenInfoCustom title={t('modal_you_pay')} value={0.001} token="c98" />
        <TokenInfoCustom
          title={t('modal_you_receive_estimate')}
          value={0.0003}
          token="vic"
        />
      </div>
      <div className="mt-4 pt-4 border-t border-divide flex flex-col gap-2">
        <ItemInfo title={t('common_rate')}>
          <span className="uppercase">1c98 = 0.3139 vic</span>
        </ItemInfo>
        <ItemInfo title={t('common_price_impact')}>
          <span className="uppercase">0.01%</span>
        </ItemInfo>
      </div>
      <div className="flex items-center gap-4 mt-8 ipad:mt-6">
        <Button
          size="lg"
          color="secondary"
          isBlock
          onClick={() => setIsSuccess(false)}
        >
          {t('common_cancel')}
        </Button>
        <Button size="lg" isBlock onClick={handleConfirm}>
          {t('common_confirm')}
        </Button>
      </div>

      <Modal
        withImg={MODAL.checkSuccess}
        heading={t('common_success')}
        open={isSuccess}
        onSetOpen={setIsSuccess}
      >
        <ModalNoteSuccess />
      </Modal>
    </div>
  );
};

export default ModalReviewOrder;
