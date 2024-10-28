import { TOKEN_ADDRESS } from './tokens';

export type NETWORK = 'devnet' | 'mainnet';

export const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging';

export const DEFAULT_PAGINATION = {
  PAGE_SIZE: 10,
  PAGE_SIZE_50: 50,
  PAGE_SIZE_100: 100,
  PAGE_NUMBER: 1,
};
export const DEFAULT_CHART_FILTER = {
  FROM: 1639353600000,
  INTERVAL: 3600,
  IS_MINIMIZE: true,
};

export const DEFAULT_DEBOUNCE = {
  SEARCH: 500,
  SWITCH_CHAIN: 500,
};

export const DEFAULT_VERSION = {
  FAVORITE: 2,
};

export const DURATION = {
  PIE_LOADING: 20,
  FADE: 300,
};

export const MINT_LP_DEFAULT_WEI = 1_000_000_000;
export const MAX_NUMBER_INPUT_VALUE = 100_000_000_000;
export const MAX_NUMBER_INPUT_DECIMAL = 4;

export const FEE_SOL = 0.000005;
export const MAX_SLIPPAGE_INPUT_VALUE = 25;
export const SECOND_TO_DATE = 60 * 60 * 24;

export const DEFAULT_SWAP_PAIR = [TOKEN_ADDRESS.USDC, TOKEN_ADDRESS.C98];
