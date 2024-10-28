export type FavoriteType =
  | 'baryonPool'
  | 'baryonToken'
  | 'baryonRecentSwap'
  | 'baryonPoolTomo'
  | 'baryonTokenTomo'
  | 'baryonPoolBitkub'
  | 'baryonTokenBitkub';

export interface IFavoriteListModel {
  baryonPool: string[];
  baryonToken: string[];
  baryonPoolTomo: string[];
  baryonTokenTomo: string[];
  baryonPoolBitkub: string[];
  baryonTokenBitkub: string[];
  baryonRecentSwap: string[];
}

export interface ITakeFavoriteRequest {
  type: FavoriteType;
  bonusValue: string[];
}
