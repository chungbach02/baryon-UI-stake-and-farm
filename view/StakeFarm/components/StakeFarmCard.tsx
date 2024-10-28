import React, { useState } from 'react';
import BoxSecondary from '@/components/ui/BoxSecondary';
import ShareIcon from '@/components/ui/ShareIcon';
import { Icon, TokenImg } from '@ne/uikit-dex';
import StakeFarmCardHead from '@/view/StakeFarm/components/StakeFarmCardHead';
import StakeFarmCardBody from '@/view/StakeFarm/components/StakeFarmCardBody';
import StakeFarmCardFoot from '@/view/StakeFarm/components/StakeFarmCardFoot';
import StakeFarmCardDetail from '@/view/StakeFarm/components/StakeFarmCardDetail';

export default function StakeFarmCard({ data }: any) {
  const [detailClicked, setDetailClicked] = useState(false);
  const detailClick = () => {
    setDetailClicked(!detailClicked);
  };
  return (
    <BoxSecondary className=" col-span-1">
      <div className="py-4">
        <StakeFarmCardHead data={data} />
        <StakeFarmCardBody data={data} />
        <StakeFarmCardFoot data={data} />
      </div>
      <div className="text-center">
        <button onClick={detailClick}>
          {detailClicked ? (
            <Icon iconName="arrow_up" />
          ) : (
            <Icon iconName="arrow_down" />
          )}
        </button>
      </div>
      <div>
        {detailClicked ? (
          <div>
            <StakeFarmCardDetail data={data} />
          </div>
        ) : (
          <div className=" hidden">
            <StakeFarmCardDetail data={data} />
          </div>
        )}

        {/* <StakeFarmCardDetail data={data} /> */}
      </div>
    </BoxSecondary>
  );
}
