import React from 'react';
import {
  convertBalanceToWei,
  convertWeiToBalance,
} from '@/view/StakeFarm/StakeFarm';

export default function useDataHandle(dataHandle: Array<object>) {
  // console.log('🚀 ~ useDataHandle ~ dataHandle:', dataHandle);
  const dataHandler = dataHandle
    .map((staked: any) => {
      const tokenReward = staked.rewardTokens;
      const tokenStake = staked.stakedLpAddress;
      const dateExpiration = staked.dateExpiration;
      const totalStaked = staked.staked;

      // console.log('reward data', tokenReward);
      // console.log(tokenStake.balance)

      if (tokenReward !== undefined) {
        const stakeDecimals = tokenStake.decimals;
        // console.log({ stakeDecimals });
        const liquidity = tokenStake.liquidity;
        // console.log({ liquidity });
        const balance = convertWeiToBalance(
          tokenStake.balance,
          stakeDecimals,
        ).toString();
        const liquidityHandle = convertWeiToBalance(liquidity, stakeDecimals);

        // console.log({ liquidityHandle });

        const tokenChose = tokenReward[0];
        const dataNew = tokenReward.map((token: any) => {
          // console.log({ tokenname: token.name, tokenChose: tokenChose.name });
          if (token !== undefined) {
            // console.log(Number(token.decimals) + 18);
            const rewardDecimals = Number(token.decimals);
            const pendingReward =
              staked.pendingReward / 10 ** (18 + Number(rewardDecimals));
            const stakedValue =
              staked.staked / 10 ** Number(tokenStake.decimals);
            const stakeCoefficient = convertWeiToBalance(
              staked.stakeCoefficient,
              18 + rewardDecimals,
            );
            const allowance = convertWeiToBalance(
              tokenStake.allowance,
              stakeDecimals,
            );
            // console.log(staked.pid, { stakeCoefficient });
            console.log(staked.pid, { allowance });
            const APR = liquidityHandle
              ? (
                  ((staked.totalYearReward * stakeCoefficient) /
                    liquidityHandle) *
                  100
                ).toFixed(2)
              : 0;
            return token.name === tokenChose.name
              ? {
                  img: '',
                  stakeAddress: tokenStake.address || '',
                  name: token.name || '',
                  symbol: token.symbol || '',
                  stakeDecimals: tokenStake.decimals,
                  earnAddress: token.address || '',
                  earnName: token.name || '',
                  earnSymbol: token.symbol || '',
                  rewardDecimals: token.decimals,
                  earnPerDay: '',
                  contractAddress: staked.contractAddress || '',
                  poolLink: '',
                  tokenLink: '',
                  contractLink: '',
                  pid: staked.pid || '',
                  apr: APR || 0,
                  finish: dateExpiration || '',
                  pendingReward: pendingReward,
                  liquidity: liquidityHandle || 0,
                  price: 0,
                  type: '',
                  userAddress: tokenStake.userAddress || '',
                  balance: balance || '',
                  staked: stakedValue || 0,
                  allowance: allowance,
                }
              : {};
          }
        });
        // console.log('data new ', dataNew);
        return dataNew;
      }
    })
    .flat()
    .filter(Boolean);

  return dataHandler;
}
