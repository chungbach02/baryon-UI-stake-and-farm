import { IBaseTokenModel } from './token.model';

export interface ITransactionModel {
  hash: string;
  type: string;
  from: string;
  amount0: number;
  amount1: number;
  rate0: number;
  rate1: number;
  amountUSD: number;
  poolAddress: string;
  token0: IBaseTokenModel;
  token1: IBaseTokenModel;
  createdAt: string;
}
