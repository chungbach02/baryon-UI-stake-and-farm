import { IBaseTokenModel, ITokenInfoModel } from './token.model';

export type FarmStakeType = 'farm' | 'stake';

export interface IFarmStakeModel {
  hash: string;
  chain: string;
  rewardTokens: string[];
  rewardMultipliers: string[];
  rewardsStartTime: string;
  rewardPerSeconds: string;
  rewardsExpiration: string;
  stakedLpAddress: string;
  factoryAddress: string;
  pid: string;
  rewarder: string;
  isV2: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPoolRewardItem {
  poolRewardAddress: string;
  rewardTokenMint: string;
  rewardPerBlock: string;
  rewardTokenAccount: string;
  rewardEndBlock: string;
  totalShares: string;
  accumulatedRewardPerShare: string;
  lastUpdatedBlock: string;
  authorityAddress: string;
}

export interface IFarmStakePoolInfoModel extends IFarmStakeModel {
  userStakedAmountWei?: string;
  userStakedAmount?: string;
  rewardDebt?: string;
  poolStartTime?: number;
  poolEndTime?: number;
  lastRewardTime?: number;
  pendingReward?: string;
  pendingRewardWei?: string;
  totalStakedAmount?: number;
  token0?: ITokenInfoModel;
  token1?: ITokenInfoModel;
  stakeToken?: ITokenInfoModel;
  rewardToken?: ITokenInfoModel;
  rewardPerDayAmount?: number;
}
