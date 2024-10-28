'use client';
import { PATHS } from '@/constants/paths';
import { Tabs } from '@ne/uikit-dex';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
  params: { locale: string };
}): JSX.Element {
  const t = useTranslations();
  const pathname = usePathname();

  const items = [
    { title: t('common_overview'), url: PATHS.INFO, key: 'info' },
    {
      title: t('common_pools'),
      url: PATHS.POOLS,
      key: 'pool',
    },
    {
      title: t('common_tokens'),
      url: PATHS.TOKENS,
      key: 'tokens',
    },
    {
      title: t('common_wallet'),
      url: PATHS.WALLET,
      key: 'wallet',
    },
  ];

  const activeItem = items
    .slice()
    .reverse()
    .find((item) => item.key && pathname.includes(item.key));

  return (
    <div className="py-4">
      <Tabs
        isCenterTabs
        variant="line"
        active={activeItem?.key}
        tabListClassName="gap-12 phone:gap-4"
        buttonClassName="p-0 text-base"
        buttonWrapper={(node, item) => (
          <Link href={item?.url || ''}>{node}</Link>
        )}
        items={items}
      />
      {children}
    </div>
  );
}
