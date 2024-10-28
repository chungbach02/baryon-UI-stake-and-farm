'use client';

import { MAX_SLIPPAGE_INPUT_VALUE } from '@/constants';
import { MODAL } from '@/public';
import { Button, Icon, InputNumber, Modal, Tooltip } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const slippageTolerances = [
  {
    id: 1,
    value: 0.5,
  },
  {
    id: 2,
    value: 1,
  },
  {
    id: 3,
    value: 5,
  },
  {
    id: 4,
    value: 10,
  },
];

interface props {
  dir?: any;
  slippage: string;
  setSlippage: (slippage: string) => void;
}

const SlippageSetting = ({ dir = 'bottom', slippage, setSlippage }: props) => {
  const t = useTranslations();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Tooltip
        direction={dir}
        id="swap-icon-web-setting"
        trigger={<div className="text-sm">{t('common_setting')}</div>}
      >
        <Icon
          iconName="setting"
          size="xl"
          isHover
          className="cursor-pointer"
          onClick={() => setOpenModal(true)}
        />
      </Tooltip>

      <Modal
        open={openModal}
        onSetOpen={setOpenModal}
        withImg={MODAL.reviewOrder}
        heading={t('common_slippage_tolerance')}
      >
        <div className="flex flex-col items-center gap-4 px-8">
          <div className="grid grid-cols-4 w-full gap-4">
            {slippageTolerances.map((option) => (
              <button
                onClick={() => setSlippage(option.value.toString())}
                className={twMerge(
                  'border duration-300 border-transparent min-h-12 hover:border-brand-primary rounded-lg',
                  option.value.toString() === slippage &&
                    'border-brand-primary',
                )}
                key={option.id}
              >
                {option.value}%
              </button>
            ))}
          </div>
          <InputNumber
            value={slippage}
            isAllowed={(values) => {
              const { floatValue } = values;
              return !floatValue || floatValue <= MAX_SLIPPAGE_INPUT_VALUE;
            }}
            max={MAX_SLIPPAGE_INPUT_VALUE}
            onChangeValue={setSlippage}
            className="w-full"
            classNameInput="text-center"
            placeholder="1.5%"
          />
        </div>
        <Button
          size="lg"
          onClick={() => setOpenModal(false)}
          className="w-full mt-6"
          disabled={!slippage}
        >
          {t('common_save_settings')}
        </Button>
      </Modal>
    </>
  );
};

export default SlippageSetting;
