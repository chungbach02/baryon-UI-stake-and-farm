export interface IBaseResponse<T> {
  status: number;
  success: boolean;
  data: T;
}

export interface IPaginationResponse<T> {
  total: number;
  currentPage: number;
  data: T[];
}

export interface IError {
  message: string;
}
export interface IPaginationRequest {
  page: number;
  size: number;
}

export interface ISocial {
  title: string;
  value: string;
}

export type IPairTokenParams = {
  token0: string;
  token1: string;
};

export type ISwapPairParams = {
  base: string;
  pair: string;
};
