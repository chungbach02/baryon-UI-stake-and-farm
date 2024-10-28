import { Currency, CURRENCY_SYMBOL } from '@/constants/currency';
import { DATE_FORMATS } from '@/constants/dateFormats';
import { get } from 'lodash';
import moment from 'moment';

export function formatAddress(address?: string, length: number = 5) {
  if (!address) {
    return '';
  }
  if (address.length <= length * 2) return address;
  const start = address.slice(0, length);
  const end = address.slice(-length);
  return `${start}...${end}`;
}

export function formatNumber(number: number) {
  return number
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const formatReadableNumber = (
  value: number,
  options: {
    isTokenAmount?: boolean;
    token?: string;
    locale?: string;
    currency?: Currency;
    isCompact?: boolean;
    threshold?: number;
    customDecimal?: number | null;
    showPlusIcon?: boolean;
    postfix?: string;
    prefix?: string;
  } = {},
) => {
  const parseNumber = typeof value === 'string' ? parseFloat(value) : value;
  const {
    isTokenAmount = false,
    locale = 'en-US',
    isCompact = false,
    threshold = 1e4,
    customDecimal = null,
    showPlusIcon = false,
    currency,
    token,
    postfix = '',
    prefix = '',
  } = options;

  const isOverThreshold = parseNumber >= threshold;

  let decimal = isTokenAmount ? 4 : 2;
  let currencyPre = '';
  let currencyPost = '';
  if (isOverThreshold && isCompact) {
    decimal = 0;
  }
  const absPrice = Math.abs(value);

  if (absPrice < 0.01) {
    decimal = 4;
  }

  if (absPrice < 0.0001) {
    decimal = 6;
  }

  if (token === 'BTC') {
    decimal = 8;
  }

  if (value === 0) {
    decimal = 0;
  }

  if (currency === 'VND') {
    decimal = 0;
    currencyPost = get(CURRENCY_SYMBOL, currency || '', '');
  }

  if (currency !== 'VND') {
    currencyPre = get(CURRENCY_SYMBOL, currency || '', '');
  }

  if (customDecimal) {
    decimal = customDecimal;
  }

  let formattedNumber = new Intl.NumberFormat(locale, {
    maximumFractionDigits: decimal,
    ...(isOverThreshold && isCompact && { notation: 'compact' }),
  }).format(parseNumber);

  if (showPlusIcon && parseNumber > 1_000_000 && isCompact) {
    formattedNumber = `${formattedNumber}+`;
  }

  return `${prefix}${currencyPre}${formattedNumber}${currencyPost}${postfix}`;
};

export const formatDate = (
  date: number | string,
  format: string = DATE_FORMATS.LOCAL_DATE,
) => {
  return typeof date === 'number'
    ? moment.unix(date).format(format)
    : moment(new Date(date)).format(format);
};

export const formatDateRange = (
  start: number | string,
  end: number | string,
  formatStart: string = DATE_FORMATS.LOCAL_DATE,
  formatEnd: string = DATE_FORMATS.LOCAL_DATE,
  separator: string = '-',
) => {
  const formattedStart =
    typeof start === 'number'
      ? moment.unix(start).format(formatStart)
      : moment(new Date(start)).format(formatStart);
  const formattedEnd =
    typeof end === 'number'
      ? moment.unix(end).format(formatEnd)
      : moment(new Date(end)).format(formatEnd);

  return `${formattedStart} ${separator} ${formattedEnd}`;
};
