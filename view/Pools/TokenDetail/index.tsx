'use client';

import BoxPrimary from '@/components/ui/BoxPrimary';
import ButtonBack from '@/components/ui/ButtonBack';
import { useTranslations } from 'next-intl';
import TableTopPools from '../component/TableTopPools';
import TableTransaction from '../component/TableTransaction';
import TokenChart from './TokenChart';
import TokenDetailBox from './TokenDetailBox';
import { PATHS } from '@/constants/paths';

interface Props {
  address?: string;
}
const TokenDetail = ({ address }: Props) => {
  const t = useTranslations();

  return (
    <div className="container">
      <ButtonBack href={PATHS.TOKENS} title={t('pool_back_to_all_tokens')} />
      <div className="phone:mt-4 mt-6 grid grid-cols-3 gap-6 ipad:gap-4 ipad:grid-cols-1">
        <TokenChart address={address} />
        <TokenDetailBox address={address} />
      </div>
      <BoxPrimary className="p-6 phone:mt-4 mt-6">
        <TableTopPools tokenAddress={address} />
      </BoxPrimary>
      <BoxPrimary className="p-6 phone:mt-4 mt-6">
        <TableTransaction />
      </BoxPrimary>
    </div>
  );
};

export default TokenDetail;
