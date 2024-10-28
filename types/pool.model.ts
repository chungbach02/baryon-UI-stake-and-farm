import { IBaseTokenModel, ITokenInfoModel } from './token.model';

export interface IPoolModel {
  poolAddress: string;
  address?: string;
  chain?: string;
  info: {
    token0: IBaseTokenModel;
    token1: IBaseTokenModel;
  };
  liquidity: number;
  volume24h: number;
  volume7d: number;
  fee24h: number;
  feeAPR?: number;
}
export interface IBasePoolModel {
  poolAddress?: string;
  address?: string;
  chain?: string;
  token0: ITokenInfoModel;
  token1: ITokenInfoModel;
}

export interface IPoolInfoModel extends IBasePoolModel {
  id?: string;
  totalLiquidity?: number;
  liquidity?: number;
  volume24h?: number;
  volume7d?: number;
  fee24h?: number;
  feeAPR?: number;
}

export interface IPoolStatisticalModel {
  popular: IPoolModel[];
  topVolume24h: IPoolModel[];
  topLiquidity: IPoolModel[];
}

export interface ILpInfoOnchainModel {
  poolAddress: string;
  lpDecimals: number;
  userLpBalance: string;
  totalSupply: number;
  shareOfPool: number;
  firstToken: {
    address: string;
    balance: string;
    totalBalancePool: string;
  };
  secondToken: {
    address: string;
    balance: string;
    totalBalancePool: string;
  };
}

export interface ILpInfoModel extends IPoolModel, ILpInfoOnchainModel {
  priceLp?: number;
  decimal?: number;
  token0AmountWei?: number;
  token1AmountWei?: number;
  token0Amount?: number;
  token1Amount?: number;
  liquidityUsd?: number;
  // TOKEN0 / TOKEN1
  poolRate?: number;
  // TOKEN1 / TOKEN0
  poolRateReverse?: number;

  accountToken0Amount: number;
  accountToken1Amount: number;
}
