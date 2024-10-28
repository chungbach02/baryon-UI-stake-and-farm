import { Skeleton, TokenImgSize } from '@ne/uikit-dex';
import { twMerge } from 'tailwind-merge';
import { TokenImg } from './TokenImg';

export interface IToken {
  img?: string;
  name?: string | number;
  subName?: string;
}
interface TokenProps {
  token?: IToken;
  url?: string;
  size?: TokenImgSize;
  className?: string;
  hoverable?: boolean;
  loading?: boolean;
  dir?: 'hor' | 'ver';
  classNameMain?: string;
  classNameSub?: string;
}

const TokenInfo = ({
  hoverable,
  token,
  size = 'base',
  className,
  loading,
  dir = 'ver',
  classNameMain,
  classNameSub,
}: TokenProps) => {
  return (
    <div
      className={twMerge(
        'flex items-center gap-2 group max-w-full overflow-hidden',
        className,
      )}
    >
      <TokenImg size={size} src={token?.img} isLoading={loading} />
      <div
        className={twMerge(
          'flex gap-0.5',
          'flex-col max-w-full overflow-hidden',
          dir === 'hor' && 'flex-row gap-1',
          dir === 'ver' && 'items-start',
        )}
      >
        {loading ? (
          <Skeleton height={18} width={80} />
        ) : (
          <>
            <div
              className={twMerge(
                'max-w-full truncate',
                hoverable && 'group-hover:text-brand-primary transition-all',
                size === 'md' && 'text-xs',
                classNameMain,
              )}
            >
              {token?.name}
            </div>
            {token?.subName && (
              <div
                className={twMerge(
                  'max-w-full truncate',
                  dir !== 'hor' && 'text-txt-secondary text-xs',
                  size === 'md' && 'text-[10px]',
                  classNameSub,
                )}
              >
                {token.subName}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TokenInfo;
