import { TokenImg, Tooltip } from '@ne/uikit-dex';

export default function StakeFarmCardBody({ data }: any) {
  return (
    <div className="px-3 py-6">
      <div className="flex justify-between">
        <div className="text-txt-secondary">APR</div>
        <div className="text-brand-primary font-semibold text-base">
          {data.apr}%
        </div>
      </div>
      <div className="flex justify-between py-4">
        <div className="text-txt-secondary">EARN</div>
        <div className="text-brand-primary font-semibold text-base">
          <Tooltip
            id={data.contractAddress}
            direction="top"
            className="!bg-background-secondary !opacity-80 !rounded-2xl"
            trigger={
              <div>
                <TokenImg src={data.img} size="base" />{' '}
                <span className="text-xs">
                  {data.earnPerDay} {data.name}/Day
                </span>
              </div>
            }
            children={
              <div>
                <TokenImg src={data.img} size="base" />
              </div>
            }
          ></Tooltip>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-txt-secondary">APR</div>
        <div className="text-brand-primary font-semibold text-base">
          {data.finish}
        </div>
      </div>
    </div>
  );
}
