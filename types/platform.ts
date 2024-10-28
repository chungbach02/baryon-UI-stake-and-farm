export type PlatformKeyType =
  | 'ethereum'
  | 'polkadot'
  | 'optimistic-ethereum'
  | 'stellar'
  | 'near-protocol'
  | 'hedera-hashgraph'
  | 'zksync'
  | 'avalanche'
  | 'base'
  | 'arbitrum-one'
  | 'polygon-pos'
  | 'tron'
  | 'algorand'
  | 'solana'
  | 'flow'
  | 'celo';

export type IPlatformValues<T> = {
  [key in PlatformKeyType]: T;
};
