import { Icon } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import React from 'react';

const BestQualities = () => {
  const t = useTranslations();

  const data1 = [
    {
      icon: 'permissionless',
      title: t('home_permissionless'),
      des: t('home_enable_users_to_trade'),
    },
    {
      icon: 'liquidity',
      title: t('home_well_trusted'),
      des: t('home_offer_reliable_liquidity'),
    },
    {
      icon: 'addvanced',
      title: t('home_advanced_security'),
      des: t('home_prioritize_user_security'),
    },
  ];
  const data2 = [
    {
      icon: 'scalability',
      title: t('home_scalability'),
      des: t('home_leverage_evm_blockchains'),
    },
    {
      icon: 'ux',
      title: t('home_distinctive_ux'),
      des: t('home_provide_an_easy'),
    },
  ];
  return (
    <div>
      <h2 className="text-center">{t('home_offering_the_best_qualities')}</h2>
      <div className="mt-14">
        <div className="grid grid-cols-3 gap-8 phone:grid-cols-1">
          {data1.map((it, idx) => {
            return (
              <div key={idx} className="flex flex-col gap-2 text-center">
                <Icon
                  className="text-6xl text-brand-primary phone:text-5xl"
                  iconName={it?.icon}
                />
                <h3>{it?.title}</h3>
                <p className="text-lg text-txt-secondary">{it?.des}</p>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-6 gap-8 mt-12 phone:grid-cols-1">
          <div></div>
          {data2.map((it, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-col gap-2 text-center col-span-2"
              >
                <Icon
                  className="text-6xl text-brand-primary phone:text-5xl"
                  iconName={it?.icon}
                />
                <h3>{it?.title}</h3>
                <p className="text-lg text-txt-secondary">{it?.des}</p>
              </div>
            );
          })}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default BestQualities;
