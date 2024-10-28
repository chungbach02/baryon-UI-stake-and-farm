'use client';
import BoxSecondary from '@/components/ui/BoxSecondary';
import { DURATION } from '@/constants';
import StakeFarmHead from '@/view/StakeFarm/StakeFarmHead';
import { useFilterParams } from '@/hook/useFilterParams';
import { Input, Tooltip, PieLoading, Switch, TabButton } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Tag from '@/components/ui/Tag';
import SelectedSort from '@/view/StakeFarm/components/SelectedSort';
import Liquidity from '@/view/Liquidity';
import StakeFarmContent from '@/view/StakeFarm/StakeFarmContent';
interface StakeFarmProps {
  isFarm?: boolean;
}

const data = [
  {
    img: 'https://raw.githubusercontent.com/BuildOnViction/tokens/master/tokens/0xb786d9c8120d311b948cf1e5aa48d8fbacf477e2.png',
    name: 'SAROS',
    symbol: 'SAROS',
    earn: 'SAROS',
    earnPerDay: '222,222.22',
    contractAddress: '0xB786D9c8120D311b948cF1e5Aa48D8fBacf477E2',
    poolLink:
      'https://www.baryon.network/stake?chain=tomo&poolAddress=0xB786D9c8120D311b948cF1e5Aa48D8fBacf477E2&completed=false',
    tokenLink:
      'https://www.vicscan.xyz/address/0xB786D9c8120D311b948cF1e5Aa48D8fBacf477E2',
    contractLink:
      'https://www.vicscan.xyz/tx/0x0110025dafe2981bef41d7d0ef495501dd6fe7a8a30969e604d79698c47312ad',
    apr: 95.45,
    finish: '28/10/2024 16:00',
    value: '99.9218',
    Liquidity: 156679.13,
    price: 0.00001,
  },
  {
    img: 'https://raw.githubusercontent.com/BuildOnViction/tokens/master/tokens/0xcdde1f5d971a369eb952192f9a5c367f33a0a891.png',
    name: 'SVIC',
    symbol: 'SVIC',
    earn: 'VIC',
    earnPerDay: '666,67',
    contractAddress: '0xCdde1f5D971A369eB952192F9a5C367f33a0A891',
    poolLink:
      'https://www.baryon.network/stake?chain=tomo&poolAddress=0xB786D9c8120D311b948cF1e5Aa48D8fBacf477E2&completed=false',
    tokenLink:
      'https://www.vicscan.xyz/tx/0x0110025dafe2981bef41d7d0ef495501dd6fe7a8a30969e604d79698c47312ad',
    contractLink:
      'https://www.vicscan.xyz/tx/0x1827f8408b1f57aeb7ddac3294f533e1002b52cb436feb4e82ad4626ea0d37a1',
    apr: 9.7,
    finish: '28/10/2024 16:00',
    value: '99.98928',
    Liquidity: 156679.13,
    price: 0.3,
    staked: 3000.93123,
  },
];

export default function StakeFarm({ isFarm }: StakeFarmProps) {
  const t = useTranslations();
  // sort
  const [liquidityClicked, setLiquidityClicked] = useState(true);
  const [liquidityUp, setLiquidityUp] = useState(true);
  const [aprClicked, setAPRClicked] = useState(false);
  const [aprUp, setAPRUp] = useState(false);
  const clickedBtnLiQuidity = () => {
    liquidityClicked
      ? setLiquidityUp(!liquidityUp)
      : setLiquidityClicked(!liquidityClicked);
    aprClicked ? setAPRClicked(!aprClicked) : setAPRClicked(aprClicked);
  };
  const clickedBtnAPR = () => {
    aprClicked ? setAPRUp(!aprUp) : setAPRClicked(!aprClicked);
    liquidityClicked
      ? setLiquidityClicked(!liquidityClicked)
      : setLiquidityClicked(liquidityClicked);
  };

  // tab
  const statusTabs = [
    { label: t('Active'), count: data.length },
    { label: t('Completed'), count: 0 },
  ];
  const { params, setParams } = useFilterParams<{
    status: string;
    count: number;
  }>({ status: statusTabs[0].label, count: statusTabs[0].count });

  return (
    <div className="container mx-auto py-8 px-0 ">
      <div className="mb-6">
        {isFarm ? <StakeFarmHead isFarm /> : <StakeFarmHead />}
      </div>
      <div className="mb-6">
        <BoxSecondary
          className="flex justify-between text-center items-center px-5 py-0
        "
        >
          <div className="flex justify-center gap-2 items-center">
            {statusTabs.map((it, idx) => {
              const isActive = params.status === it?.label;
              return (
                <TabButton
                  key={idx}
                  onClick={() => setParams({ status: it?.label })}
                  variant="line"
                  isSelected={isActive}
                  className="gap-1 flex-center px-0 font-light py-8 mr-3 "
                >
                  <span>{it.label}</span>{' '}
                  {it?.count != undefined && (
                    <span
                      className={twMerge(
                        'text-txt-secondary',
                        isActive && 'text-txt-primary',
                      )}
                    >
                      ({it?.count})
                    </span>
                  )}
                </TabButton>
              );
            })}
            <div className=" flex items-center">
              <div>
                <Switch className="text-txt-secondary" label={t('Staked')} />
              </div>
            </div>
          </div>
          <div className="flex justify-around items-center">
            <div className="flex items-center  gap-1">
              <div>Sort: </div>
              <div onClick={clickedBtnLiQuidity}>
                <SelectedSort
                  isSelected={liquidityClicked}
                  name={'liquidity'}
                  isUp={liquidityUp}
                />
              </div>
              <div>|</div>
              <div onClick={clickedBtnAPR}>
                <SelectedSort
                  isSelected={aprClicked}
                  isUp={aprUp}
                  name={'APR'}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <Input placeholder="Search here" isSearch />
              </div>
              <div>
                <Tooltip id="topTokens" trigger={t('common_data_auto_refresh')}>
                  <PieLoading size={20} duration={DURATION.PIE_LOADING} />
                </Tooltip>
              </div>
            </div>
          </div>
        </BoxSecondary>
      </div>
      <div>
        <StakeFarmContent data={data} />
      </div>
    </div>
  );
}
