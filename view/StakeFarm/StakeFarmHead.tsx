'use client';
import React from 'react';
import { VideoBox } from '@ne/uikit-dex';
import { STAKEFARM, VIDEO } from '@/public';
import CurrencyValue from '@/components/common/CurrencyValue';
import Image from 'next/image';
import BoxSecondary from '@/components/ui/BoxSecondary';
import { useTranslations } from 'next-intl';
interface StakeFarmHead {
  isFarm?: boolean;
}

export default function StakeFarmHead({ isFarm }: StakeFarmHead) {
  const t = useTranslations();
  return (
    <div className=" grid grid-cols-11 gap-8  ">
      <BoxSecondary className="flex justify-between p-5 col-span-8 relative ">
        <div className="info-left ">
          <div className="mb-12">
            <div className="text-4xl font-medium mb-4">
              {isFarm ? 'Farm' : 'Stake'}
            </div>
            <div className="text-base font-light text-gray-400">
              {isFarm
                ? t('Farm LP tokens to earn rewards')
                : t('Stake tokens to earn rewards')}
            </div>{' '}
          </div>
          <div className="info-total-value__bottom">
            <div className="mb-3">Total Value Staked</div>
            <div className="text-2xl text-yellow-500 font-semibold">
              {isFarm ? (
                <CurrencyValue value={0} />
              ) : (
                <CurrencyValue value={1115121.12} />
              )}
            </div>
          </div>
        </div>
        <div className="info-right max-w-64 absolute -bottom-5 right-7">
          {isFarm ? (
            <VideoBox
              src={VIDEO.farmBannerWebM}
              srcSupport={VIDEO.farmBannerWebM}
            />
          ) : (
            <VideoBox
              src={VIDEO.stakeBannerWebM}
              srcSupport={VIDEO.stakeBannerWebM}
              className=""
            />
          )}
        </div>
        <Image
          fill
          src={STAKEFARM.bgBlurLeft}
          className=" absolute top-5"
          alt="wave cover"
        />
      </BoxSecondary>
      <BoxSecondary className="my-reward-farm-v2 col-span-3 p-5 flex flex-col justify-center text-center relative">
        <div className="text-base font-light mb-4">My Rewards</div>
        <div className="text-3xl text-yellow-500 font-semibold">
          {isFarm ? (
            <CurrencyValue value={0} />
          ) : (
            <CurrencyValue value={1115121.12} />
          )}
        </div>
        <Image
          fill
          src={STAKEFARM.bgBlurRight}
          className=" object-cover"
          alt="wave cover"
        />
      </BoxSecondary>
    </div>
  );
}
