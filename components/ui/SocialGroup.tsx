'use client';

import { Icon, Tooltip } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ISocial {
  key: string;
  name: string;
  icon: string;
  url?: string;
  modalShare?: { title: string };
}

interface SocialGroupProps {
  socialGroup: ISocial[];
  className?: string;
  noTheme?: boolean;
  shareIcon?: ReactNode;
}

export const SocialGroup = ({
  className,
  socialGroup,
  noTheme,
  shareIcon,
}: SocialGroupProps) => {
  const [openModal, setOpenModal] = useState(false);
  const t = useTranslations();

  return (
    <div className={twMerge('flex items-center gap-2', className)}>
      {socialGroup.map((social) => (
        <Tooltip
          key={social.key}
          id={social.key}
          trigger={<div className="capitalize">{social.name}</div>}
          direction="bottom"
        >
          <Link
            href={social.url || ''}
            onClick={(e) => {
              if (!social.url) {
                e.preventDefault();
              }
              if (social.modalShare) {
                setOpenModal(true);
              }
            }}
            target="_blank"
            className={twMerge(
              'text-txt-secondary',
              noTheme && 'text-txt-primary-reverse dark:text-txt-secondary',
            )}
          >
            {social.modalShare ? (
              shareIcon
            ) : (
              <Icon iconName={social.icon} size="xxl" isHover />
            )}
          </Link>
        </Tooltip>
      ))}
    </div>
  );
};
