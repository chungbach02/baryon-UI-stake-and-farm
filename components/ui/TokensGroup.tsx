import { ITokenInfoModel } from '@/types/token.model';
import { twMerge } from 'tailwind-merge';
import { TokenImg, TokenImgSize } from './TokenImg';

interface TokensGroupProps {
  tokens: ITokenInfoModel[];
  size?: TokenImgSize;
  className?: string;
  numberMore?: number;
}

export const TokensGroup = ({
  size = 'base',
  tokens,
  className,
  numberMore = 4,
}: TokensGroupProps) => {
  return (
    <div className={twMerge('flex items-center -space-x-4', className)}>
      {tokens
        .slice(0, numberMore)
        .map(
          (token) =>
            token && (
              <TokenImg
                src={token.image}
                alt={`${token.id}_${token.address}`}
                key={`${token.id}_${token.address}`}
                className="shrink-0"
                size={size}
              />
            ),
        )}

      {tokens.length > numberMore && (
        <TokenImg
          size={size}
          morePlaceholder={tokens.length - numberMore}
          className="shrink-0"
        />
      )}
    </div>
  );
};
