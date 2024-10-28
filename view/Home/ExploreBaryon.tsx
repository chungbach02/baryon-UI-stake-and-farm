import { IMAGE } from '@/public';
import { Button } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ExploreBaryon = () => {
  const t = useTranslations();

  const dataExplore = [
    {
      img: IMAGE.swap,
      link: '/swap',
      titleBtn: t('common_swap_now'),
      title: t('common_swap'),
      des: t('home_explore_baryon'),
    },
    {
      img: IMAGE.farm,
      link: '/farm',
      titleBtn: t('common_farm_now'),
      title: t('common_farm'),
      des: t('home_earn_extra_rewards'),
    },
    {
      img: IMAGE.stake,
      link: '/stake',
      titleBtn: t('common_stake_now'),
      title: t('common_stake'),
      des: t('home_stake_to_earn_passive'),
    },
  ];
  return (
    <div>
      <h2 className="text-center">{t('home_explore_baryon')}</h2>
      <div className="mt-20 ipad:mt-10 grid grid-cols-3 ipad:grid-cols-1 gap-12 ipadPro::gap-8">
        {dataExplore.map((it, idx) => {
          return (
            <div key={idx} className="group">
              <div className="rounded-xl bg-background-primary p-10 ipad:p-6 flex-center flex-col">
                <Image
                  className="group-hover:drop-shadow-[0_10px_10px_rgba(253,208,90,0.25)] duration-300"
                  src={it?.img}
                  width={210}
                  height={210}
                  alt=""
                />
                <Link className="mt-12" href={it?.link}>
                  <Button className="min-w-40">{it?.titleBtn}</Button>
                </Link>
              </div>
              <div className="mt-8 px-8 ipad:mt-6 ipad:px-6 text-center">
                <h3>{it?.title}</h3>
                <p className="mt-1 text-lg text-txt-secondary">{it?.des}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreBaryon;
