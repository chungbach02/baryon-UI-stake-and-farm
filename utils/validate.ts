import { DEV_CONSTANT } from '@/constants/devConst';
import { ZERO_ADDRESS } from '@/constants/tokens';
import { ITokenInfoModel } from '@/types/token.model';
import { lowerCase } from 'lodash';
import moment from 'moment';

export const checkIsInRange = (start: number | null, end: number | null) => {
  const nowUnix = moment().unix();

  if (start && end) {
    return nowUnix >= start && nowUnix <= end;
  }
  if (!start && end) {
    return nowUnix < end;
  }
  if (!end && start) {
    return nowUnix > start;
  }
  return false;
};

export const isPoolToken = (token?: ITokenInfoModel) => {
  if (!token) {
    return false;
  }

  return Number(token.decimal) === 2;
};

export const isToday = (unixTimestamp: number) => {
  const today = moment().startOf('day');
  const date = moment.unix(unixTimestamp).startOf('day');
  return date.isSame(today, 'day');
};

export const isZeroAddress = (address?: string) => {
  if (!address) {
    return false;
  }

  return lowerCase(address) === lowerCase(ZERO_ADDRESS);
};
