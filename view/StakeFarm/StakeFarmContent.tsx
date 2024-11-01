import StakeFarmCard from '@/view/StakeFarm/components/StakeFarmCard';
import { read } from 'fs';
import React, { useEffect, useState } from 'react';

export default function StakeFarmContent({ data }: any) {
  // console.log('data from index', data);

  const dataHandler = data
    .map((staked: any) => {
      const tokenReward = staked.rewardTokens;
      const tokenStake = staked.stakedLpAddress;
      // console.log('reward data', tokenReward);

      if (tokenReward !== undefined) {
        const tokenChose = tokenReward[0];
        const dataNew = tokenReward.map((token: any) => {
          // console.log({ tokenname: token.name, tokenChose: tokenChose.name });
          return token.name === tokenChose.name
            ? {
                img: '',
                stakeAddress: '',
                name: tokenStake.name || '',
                symbol: tokenStake.symbol || '',
                earnAddress: '',
                earnName: token.name || '',
                earnSymbol: token.symbol || '',
                earnPerDay: '',
                contractAddress: '',
                poolLink: '',
                tokenLink: '',
                contractLink: '',
                apr: 0,
                finish: '',
                value: '',
                Liquidity: 0,
                price: 0,
                type: '',
              }
            : {};
        });
        console.log('data new ', dataNew);
        return dataNew;
      }
    })
    .flat()
    .filter(Boolean);
  console.log('datahandeler', dataHandler);
  useEffect(() => {}, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {dataHandler.map((token: any, idx: any) => {
        return (
          <div key={idx}>
            <StakeFarmCard data={token} />
          </div>
        );
      })}
    </div>
  );
}
