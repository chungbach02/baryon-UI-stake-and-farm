import { ICurrencyValues } from './currency';
import { II18nValues } from './i18n';
import { IPlatformValues } from './platform';

export interface ITokenModel {
  address: string;
  volume24h: number;
  totalLiquidity: number;
  chain: string;
  info: ITokenInfoModel;
  price_change_percentage_24h?: string;
  price?: number;
  priceChange?: number;
}

export interface IBaseTokenModel {
  decimal: number;
  id: string;
  cgkId?: string;
  name: string;
  symbol: string;
  address: string;
  chain?: string;
  image?: string;
  logoURI?: string;
  price?: number;
  chainId?: number;
  balance?: number;
  amount?: string;
}

export interface ITokenInfoModel extends IBaseTokenModel {
  icon?: string;
  cgkId?: string;
  chain?: string;
  chainId?: number;
  isEarnCoin?: boolean;
  isVaultCoin?: boolean;
  account?: string;
  fiatValue?: number | string;
  isActive?: boolean;
  favorite?: boolean;
  logoURI?: string;
}

export interface ITokenStatisticalModel {
  trending: ITokenModel[];
  gainer: ITokenModel[];
  recentlyAdded: ITokenModel[];
}

export interface IGeckoTokenModel {
  current_price: string;
  id: string;
  image: string;
  market_cap: string;
  name: string;
  price_change_percentage_24h: string;
  symbol: string;
  total_supply: string;
  total_volume: string;
}

export interface ITokenDetailModel {
  info: ITokenModel;
  liquidity: number;
  volume7d: number;
  volume24h: number;
  volume24hChange: number;
  liquidity24hChange: number;
  transaction24h: number;
}

export interface IGeckoTokenDetailModel {
  id: string;
  symbol: string;
  name: string;
  platforms: IPlatformValues<string>;
  localization: II18nValues<string>;
  description: II18nValues<string>;

  market_data: {
    current_price: ICurrencyValues<number>;
    roi: number;
    ath: ICurrencyValues<number>;
    ath_change_percentage: ICurrencyValues<number>;
    ath_date: ICurrencyValues<string>;
    atl: ICurrencyValues<number>;
    atl_change_percentage: ICurrencyValues<number>;
    atl_date: ICurrencyValues<string>;
    market_cap: ICurrencyValues<number>;
    market_cap_rank: number;
    fully_diluted_valuation: ICurrencyValues<number>;
    total_volume: ICurrencyValues<number>;
    high_24h: ICurrencyValues<number>;
    low_24h: ICurrencyValues<number>;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: ICurrencyValues<number>;
    market_cap_change_24h_in_currency: ICurrencyValues<number>;
    market_cap_change_percentage_24h_in_currency: ICurrencyValues<number>;
  };
}
