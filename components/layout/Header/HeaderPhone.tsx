import { Icon } from '@ne/uikit-dex';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Noted from './Noted';
import SearchHeader from './SearchHeader';
import { twMerge } from 'tailwind-merge';
import useClickOutside from '@/hook/useClickOutside';
import Navbar from './Navbar';
import Language from './Language';
import { usePathname } from 'next/navigation';
import { BodyLock } from '@/components/ui/BodyLock';
import Currency from './Currency';
import { useTranslations } from 'next-intl';
import { configFooter } from '../Footer';
import Image from 'next/image';
import { LOGO } from '@/public';

const HeaderPhone = () => {
  const t = useTranslations();

  const refSearch = useRef<HTMLDivElement>(null);
  const refNav = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [openInput, setOpenInput] = useState<boolean>(false);
  const [openNav, setOpenNav] = useState<boolean>(false);

  useClickOutside(refSearch, () => setOpenInput(false), openInput);
  useClickOutside(refNav, () => setOpenNav(false), openNav);

  const handleInput = () => {
    setOpenInput(!openInput);
  };
  const handleNav = () => {
    setOpenNav(!openNav);
  };

  useEffect(() => {
    setOpenNav(false);
    window.onCloseNavbar = () => setOpenNav(false);
  }, [pathname]);

  return (
    <div className="flex-between">
      {(openInput || openNav) && <BodyLock />}

      <Link href={'/'} className="flex items-center gap-1">
        <Image height={32} width={32} src={LOGO.dark} alt="" />
        <span className="uppercase text-lg font-bold">Baryon</span>
      </Link>
      <div className="flex items-center gap-4">
        <div ref={refSearch}>
          <Icon
            className="text-txt-secondary"
            onClick={handleInput}
            size="xl"
            iconName={openInput ? 'close' : 'search_left'}
          />
          <div
            className={twMerge(
              'fixed p-6 top-20 w-screen h-screen translate-x-full left-0 bg-background-secondary opacity-0 invisible duration-300',
              openInput && 'opacity-100 top-14 visible translate-x-0',
            )}
          >
            <SearchHeader isPhone />
          </div>
        </div>
        <Noted />
        <div className="relative" ref={refNav}>
          <Icon
            onClick={handleNav}
            size="xl"
            iconName={openNav ? 'close' : 'menu'}
          />
          <div
            className={twMerge(
              'fixed p-6 pb-20 top-20 w-screen h-screen left-0 bg-background-secondary opacity-0 invisible duration-300',
              'overflow-auto',
              openNav && 'opacity-100 top-14 visible',
            )}
          >
            <div>
              <Navbar isPhone open={openNav} />
              <div className="mt-6">
                <div className="flex-between gap-2">
                  <span className="text-txt-secondary">
                    {t('common_language')}
                  </span>
                  <Language />
                </div>
                <div className="flex-between gap-2 mt-2 py-2 border-y border-divide">
                  <span className="text-txt-secondary">
                    {t('common_currency')}
                  </span>
                  <Currency />
                </div>
              </div>
              <ul className="flex flex-col gap-4 mt-6 text-txt-secondary">
                {configFooter.map((it, idx) => {
                  return (
                    <li key={idx}>
                      <a
                        className="hover:text-brand-primary duration-300"
                        target="_blank"
                        href={it?.link}
                      >
                        {it?.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPhone;
