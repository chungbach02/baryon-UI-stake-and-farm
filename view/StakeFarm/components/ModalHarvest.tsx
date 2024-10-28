import CurrencyValue from '@/components/common/CurrencyValue';
import { MODAL } from '@/public';
import { Button, Icon, TokenImg } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const ModalHarvest = ({
  onConfirm,
  onCancel,
  data,
}: {
  onConfirm?: () => void;
  onCancel?: () => void;
  data?: any;
}) => {
  const t = useTranslations();

  return (
    <div>
      <div className="text-center text-base ">
        <div className="py-6">
          <TokenImg src={MODAL.reviewOrder} size="2xl" className=" scale-150" />
        </div>
        <div className="text-2xl py-3">Harvest</div>
      </div>
      <div>
        <div className="flex justify-between items-center pb-3 text-lg font-light border-b-2">
          <div className="flex items-center">
            <div className="px-2">
              <TokenImg src={data.img} size="lg" />
            </div>
            <span>{data.name}</span>
          </div>
          <div>{data.price}</div>
        </div>
        <div className="flex justify-between text-base my-3 font-light">
          <div className="text-brand-secondary">Total Receive</div>
          <div className="text-brand-primary">
            <CurrencyValue value={data.value} />
          </div>
        </div>

        <div className="flex items-center gap-6 ">
          <Button color="secondary" isBlock onClick={onCancel}>
            {t('common_cancel')}
          </Button>
          <Button isBlock onClick={onConfirm}>
            {t('common_confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalHarvest;
