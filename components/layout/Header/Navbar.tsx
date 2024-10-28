'use client';

import { PATHS } from '@/constants/paths';
import { Icon } from '@ne/uikit-dex';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export const configHeader = [
  {
    heading: 'Swap',
    link: PATHS.SWAP,
  },
  {
    heading: 'Liquidity',
    link: PATHS.LIQUIDITY,
  },
  {
    heading: 'Pools',
    link: PATHS.INFO,
  },
  {
    heading: 'Farm',
    link: PATHS.FARM,
  },
  {
    heading: 'Stake',
    link: PATHS.STAKE,
  },
  {
    heading: 'Snapshot',
    link: PATHS.SNAPSHOT,
  },
];

const Navbar = ({ isPhone, open }: { isPhone?: boolean; open?: boolean }) => {
  const pathName = usePathname();

  if (isPhone) {
    return (
      <div className="flex flex-col gap-2">
        {configHeader.map((it, idx) => {
          const link = it?.link;
          const isActive = it?.link === pathName;
          return (
            <Link href={link} key={idx} className={twMerge('relative group')}>
              <div
                className={twMerge(
                  'flex-between group-hover:text-txt-primary-reverse items-center gap-1 cursor-pointer bg-background-hover group-hover:bg-background-primary-reverse py-2 px-4 rounded-lg duration-200',
                  isActive &&
                    'bg-background-primary-reverse text-txt-primary-reverse',
                )}
              >
                <span>{it?.heading}</span>
                {!link && (
                  <Icon
                    className="group-hover:rotate-180 duration-300 text-txt-secondary"
                    iconName="arrow_down"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 ipadPro:gap-1">
      {configHeader.map((it, idx) => {
        const isActive = it?.link === pathName;
        return (
          <div
            key={idx}
            className={twMerge(
              'relative group py-2 px-2 duration-300 rounded-lg group hover:text-brand-primary',
              isActive && 'text-brand-primary',
            )}
          >
            <Link
              href={it?.link}
              className="flex items-center gap-1 cursor-pointer font-semibold"
              onClick={() => {
                typeof window !== 'undefined' && window?.onCloseNavbar();
              }}
            >
              {it?.heading}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
