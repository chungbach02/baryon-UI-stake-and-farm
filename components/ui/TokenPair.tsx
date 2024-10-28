import { IBaseTokenModel } from '@/types/token.model';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { TokenImg } from './TokenImg';

interface Props {
  token0?: IBaseTokenModel;
  token1?: IBaseTokenModel;
  isOld?: boolean;
  isSpace?: boolean;
  separator?: string;
}

const TokenPair = ({
  token0,
  token1,
  isOld,
  isSpace,
  separator = '/',
}: Props) => {
  const t = useTranslations();
  return (
    <div className="flex items-center gap-2">
      <div
        className={twMerge('flex items-center gap-1', isSpace && '-space-x-4')}
      >
        <div className="shrink-0">
          <TokenImg src={token0?.image || token0?.logoURI} />
        </div>
        <div className="shrink-0">
          <TokenImg src={token1?.image || token1?.logoURI} />
        </div>
      </div>
      <div className="flex items-center gap-1 uppercase">
        {token0?.symbol} <span>{separator}</span>
        {token1?.symbol}
        {isOld && `(${t('common_old')})`}
      </div>
    </div>
  );
};

export default TokenPair;
