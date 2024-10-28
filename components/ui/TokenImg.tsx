import { IMAGE } from '@/public';
import { Skeleton } from '@ne/uikit-dex';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { HTMLAttributes, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type TokenImgSize = 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl';

interface TokenImgProps extends HTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  size?: TokenImgSize;
  morePlaceholder?: number;
  isLoading?: boolean;
}

export const TokenImg = ({
  src,
  alt,
  size = 'base',
  className,
  isLoading,
  ...props
}: TokenImgProps) => {
  const { theme, resolvedTheme } = useTheme();

  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(resolvedTheme === 'light');
  }, [resolvedTheme]);


  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5 phoneSm:w-4 phoneSm:h-4',
    base: 'w-6 h-6 phoneSm:w-4 phoneSm:h-4',
    lg: 'w-8 h-8 phoneSm:w-6 phoneSm:h-6',
    xl: 'w-12 h-12 phoneSm:w-8 phoneSm:h-8',
    '2xl': 'w-14 h-14 phoneSm:w-10 phoneSm:h-10',
  };

  return isLoading ? (
    <Skeleton className={twMerge(sizes[size])} circle />
  ) : (
    <Image
      width={32}
      height={32}
      src={
        src ||
        (isLight  ? IMAGE.unKnowLight : IMAGE.unKnowDark)
      }
      alt={alt || 'img'}
      className={twMerge(
        '!relative inline-block rounded-full object-cover',
        sizes[size],
        className,
      )}
      {...props}
    />
  );
};
