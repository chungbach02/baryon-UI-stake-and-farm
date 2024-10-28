import { MAX_NUMBER_INPUT_DECIMAL, SECOND_TO_DATE } from '@/constants';
import { ILpInfoModel } from '@/types/pool.model';
import { convertBalanceToWei, convertWeiToBalance } from '@dagora/utils';
import { IBaseTokenModel } from './../types/token.model';
import { get } from 'lodash';

export const calculateRate = (
  value1?: number,
  value2?: number,
  reverse: boolean = false,
) => {
  if (!value1 || !value2) {
    return 0;
  }

  return reverse ? value1 / value2 : value2 / value1;
};

export const calculateTokenAmount = (
  amount: number,
  poolRate: number,
  isFirst = true,
) => {
  if (!poolRate) {
    return 0;
  }
  const poolRateReverse = 1 / poolRate;
  if (!poolRateReverse) {
    return 0;
  }

  const returnAmount = isFirst ? amount * poolRateReverse : amount * poolRate;
  return Number(returnAmount.toFixed(MAX_NUMBER_INPUT_DECIMAL));
};

export const calculateLpReceive = ({
  token,
  isCreatePool = false,
  lpInfo: paramLpInfo,
}: {
  token?: IBaseTokenModel;
  isCreatePool: boolean;
  lpInfo?: ILpInfoModel | null;
}) => {
  if (isCreatePool || !token || !paramLpInfo || !token.amount) {
    return 0;
  }

  const { totalSupply, firstToken, secondToken } = paramLpInfo;
  if (!totalSupply) {
    return 0;
  }
  const correspondingToken =
    firstToken.address === token.address ? firstToken : secondToken;

  if (!correspondingToken) {
    return 0;
  }

  const amountInWei = convertBalanceToWei(
    token.amount,
    token.decimal,
  ).toNumber();

  const lpTokenAmount =
    (amountInWei * totalSupply) / Number(correspondingToken.totalBalancePool);

  return lpTokenAmount;
};

export const calculateTokenAmountInPool = ({
  lpInfo: paramLpInfo,
  lpInPool,
  token0,
  token1,
}: {
  lpInfo?: ILpInfoModel | null;
  lpInPool?: number;
  token0?: IBaseTokenModel;
  token1?: IBaseTokenModel;
}) => {
  if (!paramLpInfo || !lpInPool || !token0 || !token1) {
    return { amountToken0: 0, amountToken1: 0 };
  }
  const token0Amount = Number(
    get(paramLpInfo, 'firstToken.totalBalancePool', 0),
  );
  const token1Amount = Number(
    get(paramLpInfo, 'secondToken.totalBalancePool', 0),
  );
  const lpTokenSupply = get(paramLpInfo, 'totalSupply');

  if (!lpTokenSupply) {
    return { amountToken0: 0, amountToken1: 0 };
  }

  const amountToken0 = convertWeiToBalance(
    Math.floor((token0Amount * lpInPool) / lpTokenSupply),
    token0.decimal,
  ).toNumber();

  const amountToken1 = convertWeiToBalance(
    Math.floor((token1Amount * lpInPool) / lpTokenSupply),
    token1.decimal,
  ).toNumber();

  return {
    amountToken0,
    amountToken1,
  };
};

export const calculateTotalRewardPerDay = (
  rewardPerSecond?: number | string,
) => {
  return Number(rewardPerSecond ?? 0) * SECOND_TO_DATE;
};
