import React from 'react';
import { Icon, TokenImg } from '@ne/uikit-dex';
import Link from 'next/link';
import ShareIcon from '@/components/ui/ShareIcon';

export default function StakeFarmCardHead({ data }: any) {
  return (
    <div className="text-center relative px-2">
      <div className="h-20">
        <TokenImg src={data.img} size="2xl" />
      </div>
      <div className=" hover:text-brand-primary">
        <Link href={data.tokenLink} className="text-xl">
          Stake {data.name.toUpperCase()} to Earn
          {data.earn.toUpperCase()}
          <span>
            <Icon iconName="arrow_right" />
          </span>
        </Link>
      </div>
      <div className=" absolute top-0 right-0">
        <ShareIcon
          type="stake"
          token0Address={data.contractAddress}
          poolAddress={data.poolLink}
        />
      </div>
    </div>
  );
}