import { Icon } from '@ne/uikit-dex';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Navbar from './Navbar';
import SearchHeader from './SearchHeader';
import Language from './Language';
import Interface from './Interface';
import Noted from './Noted';
import HeaderIpadSub from './HeaderIpadSub';
import { twMerge } from 'tailwind-merge';
import useClickOutside from '@/hook/useClickOutside';
import Currency from './Currency';
import SelectChain from './SelectChain';
import Image from 'next/image';
import { LOGO } from '@/public';
import ConnectWallet from '@/components/ui/ConnectWallet';
import { PATHS } from '@/constants/paths';

const HeaderDesktop = () => {
  const refSub = useRef<HTMLDivElement>(null);

  const [navSub, setNavSub] = useState<boolean>(false);

  const handleNavSub = () => {
    setNavSub(!navSub);
  };
  useClickOutside(refSub, () => setNavSub(false), navSub);

  return (
    <div className="flex-between">
      <div className="flex items-center gap-4">
        <Link href={PATHS.HOME} className="flex items-center gap-1">
          <Image height={40} width={40} src={LOGO.dark} alt="" />
          <span className="uppercase text-2xl ipad:text-xl font-bold">
            Baryon
          </span>
        </Link>
        <Navbar />
      </div>
      <div className="flex items-center gap-3">
        <SearchHeader />
        <div className="ipadPro:hidden">
          <SelectChain />
        </div>
        <div className="ipadPro:hidden">
          <ConnectWallet />
        </div>
        <div className="desktop:hidden">
          <Language />
        </div>
        <div className="desktop:hidden">
          <Currency />
        </div>
        <div className="desktop:hidden">
          <Interface />
        </div>
        <Noted />
        <div ref={refSub} className="relative hidden desktop:inline-block">
          <Icon
            size="xl"
            onClick={handleNavSub}
            iconName={navSub ? 'close' : 'menu'}
          />
          <div
            className={twMerge(
              'absolute right-0  duration-300 translate-y-full p-4 rounded-lg bg-background-primary',
              'opacity-0 invisible -bottom-10',
              navSub && 'opacity-100 visible -bottom-4',
            )}
          >
            <HeaderIpadSub />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDesktop;
