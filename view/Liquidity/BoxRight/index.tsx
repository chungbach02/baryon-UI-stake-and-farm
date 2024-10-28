'use client';

import SlippageSetting from '@/components/ui/SlippageSetting';
import { PieLoading, TabItem, Tabs, Tooltip } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Add from './Add';
import Remove from './Remove';

const BoxRight = () => {
  const t = useTranslations();
  const [slippage, setSlippage] = useState<string>('0.5');

  const tabRight: TabItem[] = [
    {
      title: t('common_add'),
      content: <Add slippage={Number(slippage ?? 0)} />,
      key: 'add',
    },
    {
      title: t('common_remove'),
      content: <Remove slippage={Number(slippage ?? 0)} />,
      key: 'remove',
    },
  ];
  return (
    <div className="relative">
      <Tabs items={tabRight} variant={'line'} buttonClassName="!p-0" />
      <div className="absolute right-0 top-2">
        <div className="flex items-center gap-4">
          <SlippageSetting slippage={slippage} setSlippage={setSlippage} />
          <div className="-mt-1">
            <Tooltip
              direction="bottom-end"
              trigger={t('common_data_auto_refresh')}
              id="pieLiquidity"
              className="text-center"
            >
              <PieLoading />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxRight;
