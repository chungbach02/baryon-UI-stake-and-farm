import { IChainModel } from '@/types/chain.model';
import { values } from 'lodash';

const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging';

export enum Chain {
  Tomo = 'tomo',
  BinanceSmart = 'binanceSmart',
  Bitkub = 'bitkub',
  Ancient8Mainnet = 'ancient8Mainnet',
  Ancient8 = 'ancient8',
}

export enum ChainId {
  Ethereum = '0x1',
  Bnb = '0x38',
  Viction = '0x58',
  Bitkub = '0x60',
  Heco = '0x80',
  Solana = 'solana',
  Ancient8Mainnet = '0x34fb5e38',
  Ancient8 = '0x1ad1ba8',
}

export const DEFAULT_CHAIN = Chain.BinanceSmart;
export const DEFAULT_CHAIN_ID = ChainId.Bnb;

export const COIN_IMAGE = {
  ETH: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/ETH.png',
  BNB: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/BNBVer2.png',
  HT: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/heco.png',
  SOL: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/solana.jpg',
  TOMO: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Chains/tomo.png',
  OLDTOMO: 'https://coin98.s3.amazonaws.com/VQ83gXzrhcL5wuIe',
  KUB: 'https://coin98.s3.ap-southeast-1.amazonaws.com/Chains/bitkub.png',
};

export const CHAIN_DATA: Record<string, IChainModel> = {
  [Chain.BinanceSmart]: {
    isSupportedBaryon: true,
    numChainId: 56,
    chainId: ChainId.Bnb,
    numLoad: 1,
    isToken: true,
    isSupportedNFT: true,
    nftToken: 'BEP721',
    trcToken: 'BEP20',
    symbolSpecial: 'BSC',
    balances: '0xA6762c710852681c4593C10c4304C5211FB2122c',
    multisend: '0x2E1D30460265bFEBedacf5bb6f9A80F0E74B7498',

    subName: 'BSC',

    isWeb3: true,
    isFee: true,
    image: 'binance',

    id: 'binancecoin',
    name: 'Binance Smart Chain',
    shortName: 'BSC',
    logo: COIN_IMAGE.BNB,
    symbol: 'BNB',
    chain: 'binanceSmart',
    trcName: 'BNB BEP20',
    rpcURL: 'https://bsc-dataseed1.defibit.io/',
    scan: 'https://bscscan.com',
  },
  [Chain.Tomo]: {
    isSupportedBaryon: true,
    numPath: 889,
    numChainId: 88,
    chainId: ChainId.Viction,
    numLoad: 2,
    isBridge: true,
    isToken: true,
    isSupportedNFT: true,
    trcToken: 'VRC25',
    nftToken: 'TRC721',
    isWeb3: true,
    isFee: true,
    image: 'vic',
    balances: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    nftMint: '0xAE12C5930881c53715B369ceC7606B70d8EB229f',

    id: 'tomochain',
    name: 'Viction',
    shortName: 'Viction',
    logo: COIN_IMAGE.TOMO,
    symbol: 'VIC',
    chain: 'tomo',
    trcName: 'VIC VRC25',
    rpcURL: 'https://rpc.tomochain.com',
    scan: 'https://www.vicscan.xyz',
  },
  solana: {
    isSupportedBaryon: false,
    isToken: true,
    trcToken: 'SPL',
    image: 'solana',
    isMnemonic: true,
    id: 'solana',
    name: 'Solana',
    shortName: 'Solana',
    symbol: 'SOL',
    chain: 'solana',
    trcName: 'SOL SPL',
    chainId: ChainId.Solana,
  },
  // [Chain.Heco]: {
  //   isSupportedBaryon: false,
  //   numChainId: 128,
  //   chainId: ChainId.Heco,
  //   numLoad: 1,
  //   isToken: true,
  //   isSupportedNFT: true,
  //   trcToken: 'HRC20',
  //   nftToken: 'HRC721',
  //   isWeb3: true,
  //   isFee: true,
  //   image: 'heco',
  //   balances: '0x963e1BcD1f82724bD8Fa16a3B6962D100fB287FC',
  //   multisend: '0x5C93F4B35d3dD97Ef481881aA33d00F76806FdAD',
  //   isSupportedEIP1559: true,

  //   id: 'huobi-token',
  //   name: 'HECO Chain',
  //   shortName: 'Huobi',
  //   logo: COIN_IMAGE.HT,
  //   symbol: 'HT',
  //   chain: 'heco',
  //   trcName: 'HT HRC20',
  //   rpcURL: 'https://http-mainnet.hecochain.com',
  //   scan: 'https://hecoinfo.com',
  // },
  [Chain.Bitkub]: {
    isSupportedBaryon: true,
    numChainId: 96,
    chainId: ChainId.Bitkub,
    isToken: true,
    isSupportedNFT: true,
    trcToken: 'KAP-20',
    nftToken: 'KAP721',
    isWeb3: true,
    image: 'bitkub',
    balances: '0x4d461b38d1753386D4d6797F79441Ed0adC2f6F8',

    id: 'bitkub-coin',
    name: 'Bitkub Chain',
    shortName: 'Bitkub',
    logo: COIN_IMAGE.KUB,
    symbol: 'KUB',
    chain: 'bitkub',
    rpcURL: 'https://rpc.bitkubchain.io',
    scan: 'https://www.bkcscan.com',
  },
  [Chain.Ancient8]: {
    balances: '0x6509A9977569413CE8baCa7C50BeA0F2F983E53B',
    isSupportedBaryon: false,
    replacementSymbol: 'ANCIENT8',
    isSupportedNFT: true,
    isCrawlNFTServices: true,
    numChainId: 28122024,
    chainId: ChainId.Ancient8,
    tokenStandard: 'ERC20',
    nftStandard: 'ERC721',
    isWeb3: true,
    isFee: true,
    image: 'ancient8',
    environment: 'devnet',
    isL2: true,
    name: 'Ancient8 Testnet V2',
    shortName: 'ETH',
    logo: COIN_IMAGE.ETH,
    symbol: 'ETH',
    chain: 'ancient8',
    standard: 'ERC20 ERC721',
    rpcURL: 'https://rpcv2-testnet.ancient8.gg',
    scan: 'https://scanv2-testnet.ancient8.gg',
  },
  [Chain.Ancient8Mainnet]: {
    balances: '0xf7eEe3A8363731C611A24CdDfCBcaDE9C153Cfe8',
    isSupportedBaryon: true,
    replacementSymbol: 'ANCIENT8',
    isSupportedNFT: true,
    isCrawlNFTServices: true,
    numChainId: 888888888,
    chainId: ChainId.Ancient8Mainnet,
    tokenStandard: 'ERC20',
    nftStandard: 'ERC721',
    isWeb3: true,
    isFee: true,
    image: 'ancient8',
    environment: 'devnet',
    isL2: true,
    name: 'Ancient8',
    shortName: 'ETH',
    logo: COIN_IMAGE.ETH,
    symbol: 'ETH',
    chain: 'ancient8Mainnet',
    standard: 'ERC20 ERC721',
    rpcURL: 'https://rpc.ancient8.gg',
    scan: 'https://scan.ancient8.gg',
  },
};

export const CHAIN_DATA_LIST = values(CHAIN_DATA);
export const BARYON_CHAIN_DATA_LIST = CHAIN_DATA_LIST.filter(
  (chain) => chain.isSupportedBaryon,
);

export const CONTRACT_ROUTER = {
  // [Chain.Heco]: IS_DEVELOPMENT
  //   ? ''
  //   : '0x5C0a4d02e2bd799A3C99F1fc53b802765Db36682',
  [Chain.BinanceSmart]: IS_DEVELOPMENT
    ? ''
    : '0x3f8aadD297E60Ebe7c1bB8d3f6D413b9f39EFB8B',
  [Chain.Tomo]: IS_DEVELOPMENT
    ? '0x3cB12DC332deB87dc5530a919E57a384e0132dA5'
    : '0x90Ff92592EE0beE0cAAA3cCcA5Dd718B32DBa96c',
  [Chain.Bitkub]: IS_DEVELOPMENT
    ? '0xB7513EfE9Dd0b8e89B3288621ecC4166BFF69343'
    : '0x5C93F4B35d3dD97Ef481881aA33d00F76806FdAD',
  [Chain.Ancient8]: IS_DEVELOPMENT
    ? '0xA47e686159cFAc811d268033c72485bB6F9576F1'
    : '0xA47e686159cFAc811d268033c72485bB6F9576F1',
  [Chain.Ancient8Mainnet]: IS_DEVELOPMENT
    ? '0x67807b9f5B9757C0c79347F0b3f360C15c5E6aFF'
    : '0x67807b9f5B9757C0c79347F0b3f360C15c5E6aFF',
};
