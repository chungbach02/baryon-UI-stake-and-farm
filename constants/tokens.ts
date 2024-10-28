import { ITokenInfoModel } from '@/types/token.model';
import { Chain, COIN_IMAGE } from './chain';

export const TOKEN_ADDRESS = {
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  C98: 'C98A4nkJXhpVZNAZdHUA95RpTF3T4whtQubL3YobiUX9',
  SOL: 'So11111111111111111111111111111111111111112',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  CUSD: 'CUSDvqAQLbt7fRofcmV2EXfPA2t36kzj7FjzdmqDiNQL',
};
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const DEFAULT_FAVORITE = [
  TOKEN_ADDRESS.USDC,
  TOKEN_ADDRESS.C98,
  TOKEN_ADDRESS.SOL,
  TOKEN_ADDRESS.CUSD,
];

export const COIN98_DEFAULT = {
  [Chain.BinanceSmart]: {
    id: 'coin98',
    symbol: 'C98',
    decimal: 18,
    name: 'Coin98',
    image: 'https://coin98.s3.amazonaws.com/uwqLJuMfd8fsehgM',
    address: '0xaEC945e04baF28b135Fa7c640f624f8D90F1C3a6',
  },
  // [Chain.Heco]: {
  //   id: 'huobi-token',
  //   chainId: 128,
  //   name: 'HT Token',
  //   symbol: 'HT',
  //   decimal: 18,
  //   logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png',
  //   address: '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F',
  // },
  [Chain.Tomo]: {
    id: 'coin98',
    symbol: 'C98',
    decimal: 18,
    name: 'Coin98',
    image: 'https://coin98.s3.amazonaws.com/uwqLJuMfd8fsehgM',
    address: '0x0Fd0288AAAE91eaF935e2eC14b23486f86516c8C',
  },
  [Chain.Bitkub]: {
    id: 'bitkub-coin', // change
    symbol: 'KKUB',
    decimal: 18,
    name: 'Bitkub',
    image: COIN_IMAGE.KUB,
    address: '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5',
  },
  [Chain.Ancient8]: {
    id: 'ethereum',
    symbol: 'WETH',
    decimal: 18,
    name: 'Wrapped Ether',
    image: COIN_IMAGE.ETH,
    address: '0x4200000000000000000000000000000000000006',
  },
  [Chain.Ancient8Mainnet]: {
    id: 'ethereum',
    symbol: 'WETH',
    decimal: 18,
    name: 'Wrapped Ether',
    image: COIN_IMAGE.ETH,
    address: '0x4200000000000000000000000000000000000006',
  },
};

export const W_MAIN_COIN = {
  [Chain.Ancient8]: {
    id: 'ethereum',
    chainId: 28122024,
    symbol: 'WETH',
    decimal: 18,
    name: 'Wrapped Ether',
    image: COIN_IMAGE.ETH,
    logoURI: COIN_IMAGE.ETH,
    address: '0x4200000000000000000000000000000000000006',
  },
  [Chain.Ancient8Mainnet]: {
    id: 'ethereum',
    chainId: 888888888,
    symbol: 'WETH',
    decimal: 18,
    name: 'Wrapped Ether',
    image: COIN_IMAGE.ETH,
    logoURI: COIN_IMAGE.ETH,
    address: '0x4200000000000000000000000000000000000006',
  },
  [Chain.Tomo]: {
    id: 'tomochain',
    chainId: 88,
    name: 'Wrapped VIC',
    symbol: 'WVIC',
    decimal: 18,
    logoURI: COIN_IMAGE.TOMO,
    image: COIN_IMAGE.TOMO,
    address: '0xC054751BdBD24Ae713BA3Dc9Bd9434aBe2abc1ce',
  },

  [Chain.BinanceSmart]: {
    id: 'binancecoin',
    chainId: 56,
    name: 'Wrapped BNB',
    symbol: 'WBNB',
    decimal: 18,
    logoURI: COIN_IMAGE.BNB,
    image: COIN_IMAGE.BNB,
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  },

  [Chain.Bitkub]: {
    id: 'bitkub-coin',
    chainId: 96,
    name: 'Bitkub Coin',
    symbol: 'KKUB',
    decimal: 18,
    logoURI: COIN_IMAGE.KUB,
    image: COIN_IMAGE.KUB,
    address: '0x67eBD850304c70d983B2d1b93ea79c7CD6c3F6b5',
  },
};

export const MAIN_COIN_AMM: Record<Chain, ITokenInfoModel> = {
  [Chain.Ancient8]: {
    id: 'ethereum',
    cgkId: 'ethereum',
    chainId: 28122024,
    symbol: 'ETH',
    decimal: 18,
    name: 'Ethereum',
    image: COIN_IMAGE.ETH,
    logoURI: COIN_IMAGE.ETH,
    address: ZERO_ADDRESS,
  },
  [Chain.Ancient8Mainnet]: {
    id: 'ethereum',
    cgkId: 'ethereum',
    chainId: 888888888,
    symbol: 'ETH',
    decimal: 18,
    name: 'Ethereum',
    image: COIN_IMAGE.ETH,
    logoURI: COIN_IMAGE.ETH,
    address: ZERO_ADDRESS,
  },
  [Chain.Bitkub]: {
    id: 'bitkub-coin',
    cgkId: 'bitkub-coin',
    chainId: 96,
    name: 'Bitkub',
    symbol: 'KUB',
    decimal: 18,
    logoURI: COIN_IMAGE.KUB,
    image: COIN_IMAGE.KUB,
    address: ZERO_ADDRESS,
  },
  [Chain.Tomo]: {
    id: 'tomochain',
    cgkId: 'tomochain',
    chainId: 88,
    name: 'Viction',
    symbol: 'VIC',
    decimal: 18,
    logoURI: COIN_IMAGE.TOMO,
    image: COIN_IMAGE.TOMO,
    address: ZERO_ADDRESS,
  },
  // ether: {
  //   id: 'ethereum',
  //   chainId: 1,
  //   name: 'Ether',
  //   symbol: 'ETH',
  //   decimal: 18,
  //   logoURI: COIN_IMAGE.ETH,
  //   image: COIN_IMAGE.ETH,
  //   address: '',
  // },
  [Chain.BinanceSmart]: {
    id: 'binancecoin',
    cgkId: 'binancecoin',
    chainId: 56,
    name: 'BNB Token',
    symbol: 'BNB',
    decimal: 18,
    logoURI: COIN_IMAGE.BNB,
    image: COIN_IMAGE.BNB,
    address: ZERO_ADDRESS,
  },
  // [Chain.Heco]: {
  //   id: 'huobi-token',
  //   chainId: 128,
  //   name: 'HT Token',
  //   symbol: 'HT',
  //   decimal: 18,
  //   logoURI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png',
  //   image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png',
  //   address: '',
  // },
  // matic: {
  //   id: 'matic-network',
  //   chainId: 137,
  //   name: 'Matic',
  //   symbol: 'MATIC',
  //   decimal: 18,
  //   logoURI:
  //     'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
  //   image:
  //     'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
  //   address: '',
  // },
  // avax: {
  //   id: 'avalanche-2',
  //   chainId: 43114,
  //   name: 'Avax',
  //   symbol: 'AVAX',
  //   decimal: 18,
  //   logoURI:
  //     'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
  //   image:
  //     'https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png',
  //   address: '',
  // },
};
