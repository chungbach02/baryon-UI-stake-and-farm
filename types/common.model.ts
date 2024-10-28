import { ITokenInfoModel } from './token.model';

export interface ISearchModel {
  pool: Array<{
    id: string;
    totalLiquidity: number;
    token0: ITokenInfoModel;
    token1: ITokenInfoModel;
  }>;
  coin: Array<ITokenInfoModel>;
}

export interface IRewardAmount {
  amount: number;
  amountInWei: number;
  poolRewardAddress: string;
}
export interface IHomeStatisticalModel {
  totalVolume: number;
  totalLiquidity: number;
  totalAddress: number;
}

export interface INotificationModel {
  _id: string;
  isNoRead: boolean;
  hash: string;
  message: string;
  type: string;
  createdAt: string;
}

export interface IConnectWalletResponse {
  data: unknown;
  error: string;
  isError: boolean;
}
