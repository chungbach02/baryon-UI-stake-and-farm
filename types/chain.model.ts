import { ChainId } from '@/constants/chain';

export interface IChainModel {
  isSupportedBaryon: boolean;
  isToken?: boolean;
  id?: string;
  name: string;
  shortName: string;
  symbol: string;
  chain: string;
  logo?: string;
  chainId: ChainId;
  image: string;

  rpcURL?: string;
  scan?: string;
  numChainId?: number;
  numLoad?: number;
  numPath?: number;
  trcName?: string;
  isSupportedNFT?: boolean;
  nftToken?: string;
  trcToken?: string;
  symbolSpecial?: string;
  balances?: string;
  multisend?: string;
  subName?: string;
  isWeb3?: boolean;
  isFee?: boolean;
  isBridge?: boolean;
  isMnemonic?: boolean;
  nftMint?: string;
  isSupportedEIP1559?: boolean;
  replacementSymbol?: string;
  isCrawlNFTServices?: boolean;
  tokenStandard?: string;
  nftStandard?: string;
  environment?: string;
  isL2?: boolean;
  standard?: string;
}
