import React, { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Skeleton } from '@ne/uikit-dex';

const BoxDetailPool = ({
  isLoading,
  data = [],
}: {
  isLoading?: boolean;
  data?: Array<{
    title: string;
    content: ReactNode;
    background: string;
  }>;
}) => {
  const t = useTranslations();

  const dataDefault = [
    {
      title: t('pool_your_pool_share'),
      content: '0%',
      background: '#f9e1e1',
    },
    {
      title: t('pool_your_pool_share'),
      content: '$0.0000429',
      background: '#cfe4f8',
    },
    {
      title: t('pool_your_pool_share'),
      content: '0 C98',
      background: '#ddf2e8',
    },
    {
      title: t('pool_your_pool_share'),
      content: '0 VIC',
      background: '#fff8dd',
    },
  ];
  if (isLoading)
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].fill(1).map((it, idx) => {
          return (
            <div
              key={idx}
              className={twMerge(' p-4 rounded-lg bg-background-secondary')}
            >
              <div>
                <Skeleton width={'100%'} height={30} />
              </div>
              <div>
                <Skeleton width={'100%'} height={30} />
              </div>
            </div>
          );
        })}
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-4">
      {data.map((it, idx) => {
        return (
          <div
            style={{ background: it?.background }}
            key={idx}
            className={twMerge(
              'flex-center flex-col text-center gap-1 p-4 rounded-lg',
            )}
          >
            <div className="text-xl text-black">{it?.content}</div>
            <span className="text-txt-secondary text-xs">{it?.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BoxDetailPool;
