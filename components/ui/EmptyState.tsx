import React from 'react';
import { twMerge } from 'tailwind-merge';

import Image from 'next/image';
import { IMAGE } from '@/public';

interface EmptyStateProps {
  src?: string;
  className?: string;
  imageClassName?: string;
  content?: React.ReactNode;
  dynamic?: boolean;
  icon?: string;
  classNameImg?: string;
}

const EmptyState = ({
  content,
  className,
  dynamic = false,
  classNameImg,
}: EmptyStateProps) => {
  return (
    <div
      className={twMerge(
        'text-center flex flex-col gap-4 text-txt-secondary font-semibold text-xl',
        dynamic ? 'absolute-center' : 'flex-center',
        className,
      )}
    >
      <Image
        className={classNameImg}
        src={IMAGE.empty}
        width={270}
        height={270}
        alt=""
      />
      {content}
    </div>
  );
};

export default EmptyState;
