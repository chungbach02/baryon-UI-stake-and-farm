import CurrencyValue from '@/components/common/CurrencyValue';
import { Icon } from '@ne/uikit-dex';
import Link from 'next/link';
import React from 'react';

export default function StakeFarmCardDetail({ data }: any) {
  return (
    <div className="mt-10 px-6">
      <div className="flex justify-between mb-4">
        <div>Liquidity</div>
        <div className="text-base font-semibold">
          <span>~</span>
          <span>
            <CurrencyValue value={data.Liquidity} />
          </span>
        </div>
      </div>
      <div>
        <Link
          href={data.contractLink}
          className=" group mb-3 items-center flex text-base"
        >
          <div className="w-6 group-hover:scale-110">
            <Icon iconName="pool_info" />
          </div>
          <span className="text-txt-yellow group-hover:text-brand-primary ">
            View Contract
          </span>
        </Link>
      </div>
      <div>
        <Link
          href={data.tokenLink}
          className="group mb-3 items-center flex text-base"
        >
          <div className="w-6 group-hover:scale-110">
            <Icon iconName="pool_info" />
          </div>
          <span className="text-txt-yellow group-hover:text-brand-primary ">
            See token info
          </span>
        </Link>
      </div>
    </div>
  );
}
