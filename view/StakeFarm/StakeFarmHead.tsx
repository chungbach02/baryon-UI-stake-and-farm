'use client';
import React, { useContext } from 'react';
import { VideoBox } from '@ne/uikit-dex';
import { STAKEFARM, VIDEO } from '@/public';
import CurrencyValue from '@/components/common/CurrencyValue';
import Image from 'next/image';
import BoxSecondary from '@/components/ui/BoxSecondary';
import { useTranslations } from 'next-intl';
import { dataHandled } from '@/view/StakeFarm';
interface StakeFarmHead {
  isFarm?: boolean;
  // data?: any;
}

export default function StakeFarmHead({ isFarm }: StakeFarmHead) {
  const t = useTranslations();
  const data = useContext(dataHandled);

  const listStaked = data
    ? data.map((stake: any) => parseFloat(stake.liquidity))
    : [0];
  // console.log({ listStaked });
  const totalStaked = listStaked.reduce(
    (sum: number, currentValue: number) => sum + currentValue,
    0,
  );
  const listReward = data
    ? data.map((stake: any) => parseFloat(stake.pendingReward))
    : [0];
  const totalReward = listReward.reduce(
    (sum: number, currentValue: number) => sum + currentValue,
    0,
  );
  return (
    <div className=" grid grid-cols-11 gap-8  ">
      <BoxSecondary className="flex justify-between p-5 col-span-8 relative  ">
        <div className="info-left ">
          <div className="mb-12">
            <div className="text-4xl font-medium mb-4">
              {isFarm ? 'Farm' : 'Stake'}
            </div>
            <div className="text-base font-light text-txt-secondary">
              {isFarm
                ? t('Farm LP tokens to earn rewards')
                : t('Stake tokens to earn rewards')}
            </div>{' '}
          </div>
          <div className="info-total-value__bottom">
            <div className="mb-3">Total Value Staked</div>
            <div className="text-2xl text-brand-primary font-semibold">
              {isFarm ? (
                <CurrencyValue value={0} />
              ) : (
                <CurrencyValue value={totalStaked} />
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
        <div className="text-3xl text-brand-primary font-semibold">
          {isFarm ? (
            <CurrencyValue value={0} />
          ) : (
            <CurrencyValue value={totalReward} />
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
