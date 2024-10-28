'use client';

import ConnectWallet from '@/components/ui/ConnectWallet';
import { LOGO } from '@/public';
import { Icon } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Interface from '../Header/Interface';
import SelectChain from '../Header/SelectChain';

export const configFooter = [
  {
    icon: 'Gecko Terminal',
    link: 'https://www.geckoterminal.com/tomochain/baryon-network-viction/pools',
    title: 'Gecko Terminal',
  },
  {
    icon: 'doc',
    link: 'https://docs.baryon.network/',
    title: 'Docs',
  },
  {
    icon: 'blog',
    link: 'https://blog.baryon.network/',
    title: 'Blog',
  },
  {
    icon: 'x',
    link: 'https://x.com/BaryonNetwork',
    title: 'Twitter',
  },
  {
    icon: 'telegram_filled',
    link: 'https://t.me/baryon_network',
    title: 'Telegram',
  },
  {
    icon: 'discord-full',
    link: 'https://discord.com/invite/qbV38aFFaC',
    title: 'Discord',
  },
];

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="py-4 px-6 mt-6 ipad:px-4 ipadPro:mt-0 ipadPro:fixed ipadPro:w-full bg-background-primary ipadPro:bottom-0 ipadPro:left-0 relative z-20">
      <div className="flex-between ipadPro:hidden">
        <div className="flex items-center gap-2">
          <Link href={'/'} className="flex items-center gap-1">
            <Image height={40} width={40} src={LOGO.dark} alt="" />
            <span className="uppercase text-2xl font-bold">Baryon</span>
          </Link>
          <span className="font-bold">{t('footer_all_rights')}</span>
        </div>
        <ul className="flex items-center gap-12">
          {configFooter.map((it, idx) => {
            return (
              <li key={idx} className="first:hidden">
                <a
                  className="hover:text-brand-primary duration-300"
                  target="_blank"
                  href={it?.link}
                >
                  <Icon size="xxxl" iconName={it?.icon} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-between gap-2 hidden ipadPro:flex">
        <Interface />
        <div className="flex items-center gap-4">
          <SelectChain isAlignTop />
          <ConnectWallet isFooter classNameBtn='w-fit' />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
