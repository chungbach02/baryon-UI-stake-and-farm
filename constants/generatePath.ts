import { PATHS } from './paths';

export const EndpointGenerator = {
  getSolScan: (address: string, type: 'account' | 'token' | 'tx' = 'account') =>
    `${''}/${type}/${address}`,

  getTokenPoolDetail: (address: string, isToken: boolean) =>
    `${isToken ? PATHS.TOKEN : PATHS.POOL}/${address}`,
};
