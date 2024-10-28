import { ISocial } from './base.model';
import { ITokenInfoModel } from './token.model';

export interface ICampaignModel {
  tokenInfo: ITokenInfoModel;
  name: string;
  isUpTo: boolean;
  numView: number;
  shortDescription: string;
  description: string;
  image: string;
  logo: string;
  owner: string;
  reward: number;
  isFiat: boolean;
  type: string;
  chain: string;
  visible: string;
  social: ISocial[];
  start: number;
  end: number;
  isRequiredAuthen: boolean;
  id: string;
  createdAt: number;

  //DETAIL
  backgroundMobile?: string;
  background?: string;
  min?: number;
  max?: number;
  source?: string;
  isEndCache?: true;
}

export interface ICampaignStatisticModel {
  upComing: number;
  completed: number;
  onGoing: number;
  participated: number;
  total: number;
}

export interface IParticipantModel {
  rank: number;
  address: string;
  tradingVolume: number;
  joinDate: string;
  isQualified: boolean;
  reward: string;
}

export interface ICampaignParticipantResponse {
  data: IParticipantModel[];
  total: number;
}

export interface IJoinSnapshotRequest {
  id: string;
  address: string;
}
