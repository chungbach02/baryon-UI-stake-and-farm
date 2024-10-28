import { Icon } from '@ne/uikit-dex';
import Link from 'next/link';
import React from 'react';

const ButtonBack = ({ href, title }: { href?: string; title?: string }) => {
  return (
    <Link
      href={{ href }}
      className="inline-flex items-center gap-2 hover:text-brand-primary duration-300 text-base"
    >
      <Icon className="text-txt-secondary" iconName="arrow_left" size="sm" />
      <span>{title}</span>
    </Link>
  );
};

export default ButtonBack;
