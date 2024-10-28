import { IPaginationRequest } from './base.model';
import { ITokenInfoModel } from './token.model';

export interface IWalletStatisticalModel {
  totalAddressActive: number;
  liquidityProvider: number;
  accountFarming: number;
  accountStaked: number;
}

export interface IWalletModel {
  address: string;
  poolAddress: string;
  token0Amount: string;
  token1Amount: string;
  amountUSD: number;
  poolShare: number;
  poolInfo: {
    token0: ITokenInfoModel;
    token1: ITokenInfoModel;
  };
}

export interface IWalletInfoRequest extends IPaginationRequest {
  sort: string;
}

export interface IFarmStakeWalletModel {
  address: string;
  poolAddress: string;
  tokenIn: [ITokenInfoModel, ITokenInfoModel];
  tokenOut: [ITokenInfoModel];
  amountUSD: number;
  apr: number;
  status: string;
}
export interface ILpWalletModel {
  address: string;
  poolAddress: string;
  token0Amount: string;
  token1Amount: string;
  amountUSD: number;
  poolShare: number;
  poolInfo: {
    token0: ITokenInfoModel;
    token1: ITokenInfoModel;
  };
}

export interface IWalletAddressInfoModel {
  tvl: number;
  poolFarming: number;
  poolStaked: number;
}

export interface IWalletAddressInfoRequest {
  address: string;
}

export interface IWalletAddressLpModel {
  token0: ITokenInfoModel;
  token1: ITokenInfoModel;
  poolAddress: string;
}
export interface IWalletChartModel {
  time: string;
  value: number;
}
