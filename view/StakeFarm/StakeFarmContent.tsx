import BoxSecondary from '@/components/ui/BoxSecondary';
import ShareIcon from '@/components/ui/ShareIcon';
import StakeFarmCard from '@/view/StakeFarm/components/StakeFarmCard';
import StakeFarmCardHead from '@/view/StakeFarm/components/StakeFarmCardHead';
import { Icon, TokenImg } from '@ne/uikit-dex';
import Link from 'next/link';
import React from 'react';
import { Icons } from 'react-toastify';

export default function StakeFarmContent({ data }: any) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {data.map((token: any, idx: any) => {
        return (
          <div key={idx}>
            <StakeFarmCard data={token} />
          </div>
        );
      })}
    </div>
  );
}
