import CurrencyValue from '@/components/common/CurrencyValue';
import { Icon } from '@ne/uikit-dex';
import Link from 'next/link';
import React from 'react';

const vicScanLink = 'https://www.vicscan.xyz/address/';

export default function StakeFarmCardDetail({ data }: any) {
  return (
    <div className="mt-10 px-6">
      <div className="flex justify-between mb-4">
        <div>Liquidity</div>
        <div className="text-base font-semibold">
          <span>~</span>
          <span>
            <CurrencyValue value={data.liquidity} />
          </span>
        </div>
      </div>
      <div>
        <a
          target="_blank"
          href={`${vicScanLink}${data.contractAddress}`}
          className=" group mb-3 items-center flex text-base"
        >
          <div className="w-6 group-hover:scale-110">
            <Icon iconName="pool_info" />
          </div>
          <span className="text-txt-yellow group-hover:text-brand-primary ">
            View Contract
          </span>
        </a>
      </div>
      <div>
        <a
          target="_blank"
          href={`${vicScanLink}${data.stakeAddress}`}
          className="group mb-3 items-center flex text-base"
        >
          <div className="w-6 group-hover:scale-110">
            <Icon iconName="pool_info" />
          </div>
          <span className="text-brand-primary group-hover:text-brand-primary ">
            See token info
          </span>
        </a>
      </div>
    </div>
  );
}
