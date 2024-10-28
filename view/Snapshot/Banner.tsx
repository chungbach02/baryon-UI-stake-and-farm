import BoxPrimary from '@/components/ui/BoxPrimary';
import { STAKEFARM, VIDEO } from '@/public';
import { VideoBox } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

const Banner = () => {
  const t = useTranslations();
  return (
    <BoxPrimary className="relative flex justify-between gap-2 min-h-[250px] phone:min-h-[150px] overflow-hidden">
      <div className="relative z-20 max-w-[60%]">
        <h3>{t('snapshot_activity_campaigns')}</h3>
        <p className="mt-4 text-txt-secondary text-base ipad:text-xs">
          {t('snapshot_participate_in_trading')}
        </p>
      </div>
      <div>
         <VideoBox
             className="absolute right-10 top-1/2 h-[110%] aspect-square -translate-y-1/2 z-20 ipad:hidden"
            src={VIDEO.snapshotBannerWebM}
            srcSupport={VIDEO.snapshotBannerMP4}
          />
          <Image
            fill
            className="hidden ipad:!block !left-auto !right-2 !top-0 aspect-square !w-auto  !bottom-auto z-20"
            src={VIDEO.snapshotBannerGIF}
            alt=""
          />
      </div>
     
      <Image
        fill
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover translate-y-1/4 z-10"
        src={STAKEFARM.bgBlurLeft}
        alt="wave cover"
      />
    </BoxPrimary>
  );
};

export default Banner;
