import { Icon } from '@ne/uikit-dex';
import React from 'react';
import Interface from './Interface';
import Language from './Language';
import ConnectWallet from '@/components/ui/ConnectWallet';
import { useTranslations } from 'next-intl';
import Currency from './Currency';
import Image from 'next/image';
import { LOGO } from '@/public';

const HeaderIpadSub = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-4 w-max text-base ipadPro:text-sm">
      {/* <div className="flex-center relative z-40 hidden ipadPro:block">
        <ConnectWallet />
      </div> */}
      <div className="flex-between items-center gap-6 relative z-30 h-10">
        <div className="flex items-center gap-2">
          <Image alt="" height={24} width={24} src={LOGO.dark} />
          <span>{t('common_theme')}</span>
        </div>
        <Interface />
      </div>
     
      <div className="flex items-center gap-2 relative z-20">
        <Icon size='xl' iconName="global text-txt-secondary" />
        <Language className="w-full" />
      </div>
      <div className="flex items-center gap-2 relative z-10">
        <Icon size='xl' iconName="market_cap text-txt-secondary" />
        <Currency className="w-full" />
      </div>
    </div>
  );
};

export default HeaderIpadSub;
