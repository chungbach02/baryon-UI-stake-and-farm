import React from 'react';
import { twMerge } from 'tailwind-merge';

import { useTranslations } from 'next-intl';

interface TagProps {
  className?: string;
  postfix?: React.ReactNode;
  prefix?: React.ReactNode;
  type?: 'error' | 'success' | 'warning';
  children?: React.ReactNode;
  isNumber?: boolean;
  showPlus?: boolean;
}

const Tag = ({
  children,
  className,
  type = 'success',
  postfix,
  prefix,
  isNumber,
  showPlus,
}: TagProps) => {
  const t = useTranslations();

  return (
    <div
      className={twMerge(
        'px-3 py-1 w-fit rounded-lg flex items-center',
        type === 'success' && 'bg-toast-background-green text-txt-green',
        type === 'error' && 'bg-toast-background-red text-txt-red',
        type === 'warning' && 'bg-toast-background-yellow text-txt-yellow',
        className,
      )}
    >
      {prefix}
      {showPlus && '+'}
      {children}
      {postfix}
    </div>
  );
};

export default Tag;
