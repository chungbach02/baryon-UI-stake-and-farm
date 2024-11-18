import { convertWeiToBalance, getUserInfo } from '@/view/StakeFarm/StakeFarm';
import StakeFarmCard from '@/view/StakeFarm/components/StakeFarmCard';
// import React, { createContext, useEffect, useState } from 'react';
import { dataHandled } from '@/view/StakeFarm';
import { useContext } from 'react';
// interface stakeFarmContent {
//   data?: any;
//   onSendData: (data: any) => void;
// }

export default function StakeFarmContent() {
  // {
  //   data,
  //   onSendData,
  // }: stakeFarmContent,
  const data = useContext(dataHandled);
  // console.log('data from index', data);

  // const dataHandler = data
  //   .map((staked: any) => {
  //     const tokenReward = staked.rewardTokens;
  //     const tokenStake = staked.stakedLpAddress;
  //     const dateExpiration = staked.dateExpiration;
  //     const totalStaked = staked.staked;

  //     // console.log('reward data', tokenReward);
  //     // console.log(tokenStake.balance)

  //     if (tokenReward !== undefined) {
  //       const stakeDecimals = tokenStake.decimals;
  //       const liquidity = tokenStake.liquidity;
  //       // console.log(liquidity);
  //       const balance = convertWeiToBalance(
  //         tokenStake.balance,
  //         stakeDecimals,
  //       ).toString();
  //       const liquidityHandle = convertWeiToBalance(liquidity, stakeDecimals);

  //       console.log({ liquidityHandle });

  //       const tokenChose = tokenReward[0];
  //       const dataNew = tokenReward.map((token: any) => {
  //         // console.log({ tokenname: token.name, tokenChose: tokenChose.name });
  //         if (token !== undefined) {
  //           // console.log(Number(token.decimals) + 18);
  //           const pendingReward =
  //             staked.pendingReward / 10 ** (18 + Number(token.decimals));
  //           const stakedValue =
  //             staked.staked / 10 ** Number(tokenStake.decimals);

  //           const APR = totalStaked
  //             ? (
  //                 (staked.totalYearReward /
  //                   convertWeiToBalance(totalStaked, stakeDecimals)) *
  //                 100
  //               ).toFixed(2)
  //             : 0;
  //           return token.name === tokenChose.name
  //             ? {
  //                 img: '',
  //                 stakeAddress: tokenStake.address || '',
  //                 name: token.name || '',
  //                 symbol: token.symbol || '',
  //                 stakeDecimals: tokenStake.decimals,
  //                 earnAddress: token.address || '',
  //                 earnName: token.name || '',
  //                 earnSymbol: token.symbol || '',
  //                 rewardDecimals: token.decimals,
  //                 earnPerDay: '',
  //                 contractAddress: staked.contractAddress || '',
  //                 poolLink: '',
  //                 tokenLink: '',
  //                 contractLink: '',
  //                 pid: staked.pid || '',
  //                 apr: APR || 0,
  //                 finish: dateExpiration || '',
  //                 pendingReward: pendingReward,
  //                 liquidity: liquidityHandle || 0,
  //                 price: 0,
  //                 type: '',
  //                 userAddress: tokenStake.userAddress || '',
  //                 balance: balance || '',
  //                 staked: stakedValue || 0,
  //               }
  //             : {};
  //         }
  //       });
  //       // console.log('data new ', dataNew);
  //       return dataNew;
  //     }
  //   })
  //   .flat()
  //   .filter(Boolean);
  // console.log('datahandeler', dataHandler);
  // // useEffect(() => {}, []);
  // useEffect(() => {
  //   onSendData(dataHandler);
  // }, [data]);

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
