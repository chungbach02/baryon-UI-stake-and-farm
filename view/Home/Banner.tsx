'use client';
import { VIDEO } from '@/public';
import { Button, VideoBox } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';

const Banner = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-1 ipadPro:flex-col gap-12 ipadPro:gap-0 items-center">
      <div className="space-y-8 ipadPro:space-y-4">
        <h1 className='font-semibold'>
          {t('home_redefine_your_trading_experience')}
        </h1>
        <h5 className="text-txt-secondary max-w-[90%] ipad:max-w-full">
          {t('home_your_trusted_dex_on_evm')}
        </h5>
        <Button className="min-w-[10rem] text-md">
          {t('common_get_started')}
        </Button>
      </div>
      <div className="ipadPro:order-first min-w-[720px] ipad:min-w-fit ipad:max-w-[720px]">
        <VideoBox
          srcSupport={VIDEO.homeBannerMP4}
          src={VIDEO.homeBannerWebM}
          className="m-auto"
        />
      </div>
    </div>
  );
};

export default Banner;
