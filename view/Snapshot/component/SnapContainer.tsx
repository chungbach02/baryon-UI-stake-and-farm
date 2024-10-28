import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { IBaseResponse } from '@/types/base.model';
import { ICampaignModel } from '@/types/snapshot.model';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { Fade } from 'react-awesome-reveal';
import CardSnap from './CardSnap';
import SkeletonCardSnap from './SkeletonCardSnap';

export const DateForm = ({ day, month }: { day?: string; month?: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-2xl">{day}</div>
      <span className="text-base text-txt-secondary">{month}</span>
    </div>
  );
};

interface IProps {
  chain: string;
  sort: string;
}

const SnapContainer = ({ chain, sort }: IProps) => {
  const { address } = useWallet();
  const { baryonApiService } = useBaryonServices();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.SNAPSHOT_CAMPAIGN, chain, sort],
    queryFn: () => {
      return baryonApiService.base.get<IBaseResponse<ICampaignModel[]>>(
        ENDPOINTS.SNAPSHOT_CAMPAIGN,
        {
          params: { chain, sort },
        },
      );
    },
    // enabled: false,
    // initialData: {
    //   data: [
    //     {
    //       tokenInfo: {
    //         address: '0x23c5d1164662758b3799103effe19cc064d897d6',
    //         image: 'https://coin98.s3.amazonaws.com/h4aShzmyUoD3xRsf',
    //         decimals: 6,
    //         cgkId: 'aura-network',
    //         chain: 'binanceSmart',
    //         name: 'Aura Network',
    //         symbol: 'aura',
    //       },
    //       name: 'AURA/BUSD Trading Competition',
    //       isUpTo: false,
    //       numView: 6727,
    //       shortDescription: '',
    //       description:
    //         'ACTIVITY 1: Top 100 addresses with the highest trading volume during the competition period will share a pool of AURA. \nACTIVITY 2: Complete social tasks and share AURA. Check out the official announcement for more details.',
    //       image: 'https://coin98.s3.amazonaws.com/ZxsaHQBh52yPYpgj',
    //       logo: 'https://coin98.s3.amazonaws.com/p8rvqkcTe0xL91Ye',
    //       owner: 'Aura Network',
    //       reward: 250000,
    //       isFiat: true,
    //       type: 'snapshot',
    //       chain: 'binanceSmart',
    //       visible: 'public',
    //       social: [
    //         {
    //           title: 'twitter',
    //           value: 'https://twitter.com/AuraNetworkHQ',
    //         },
    //         {
    //           title: 'telegram',
    //           value: 'https://t.me/AuraNetworkOfficial',
    //         },
    //         {
    //           title: 'link',
    //           value: 'https://baryon.link/aura-network-trading-competition-2',
    //         },
    //       ],
    //       start: 1670333400000,
    //       end: 1671555599000,
    //       isRequiredAuthen: false,
    //       id: 'aurabusd-trading-competition',
    //       createdAt: '2022-12-05T09:15:55.702Z',
    //     },
    //     {
    //       tokenInfo: {
    //         address: '0xfa4ba88cf97e282c505bea095297786c16070129',
    //         image:
    //           'https://coin98.s3.ap-southeast-1.amazonaws.com/Coin/CUSDC98.png',
    //         decimals: 18,
    //         cgkId: 'coin98-dollar',
    //         chain: 'binanceSmart',
    //         name: 'CUSD',
    //         symbol: 'cusd',
    //       },
    //       name: 'CUSD/ BUSD Trading Competition',
    //       isUpTo: false,
    //       numView: 4259,
    //       shortDescription: '',
    //       description:
    //         'ACTIVITY 1: Top 100 addresses with the highest trading volume during the competition period will share a pool of 4,500 CUSD. \\n\nACTIVITY 2: Complete social tasks and share 500 CUSD. Check out the official announcement for more details.',
    //       image: 'https://coin98.s3.amazonaws.com/fgQipVjpqVYu8JQn',
    //       logo: 'https://coin98.s3.amazonaws.com/WwcBNB0T8ayFYtzZ',
    //       owner: 'Coin98',
    //       reward: 5000,
    //       isFiat: true,
    //       type: 'snapshot',
    //       chain: 'binanceSmart',
    //       visible: 'public',
    //       social: [
    //         {
    //           title: 'twitter',
    //           value: 'https://twitter.com/Coin98Dollar',
    //         },
    //         {
    //           title: 'telegram',
    //           value: 'https://t.me/coin98dollar',
    //         },
    //         {
    //           title: 'link',
    //           value: 'https://baryon.link/cusd-trading-contest',
    //         },
    //       ],
    //       start: 1665495000000,
    //       end: 1666717199000,
    //       isRequiredAuthen: false,
    //       id: 'cusd-busd-trading-competition',
    //       createdAt: '2022-10-10T07:31:03.666Z',
    //     },
    //   ],
    //   total: 2,
    // },
  });

  const { data: joinedList } = useQuery({
    queryKey: [QUERY_KEYS.SNAPSHOT_PARTICIPANT_LIST, address],
    queryFn: () =>
      baryonApiService.base.get<IBaseResponse<string[]>>(
        ENDPOINTS.SNAPSHOT_PARTICIPANT_LIST,
        {
          params: {
            address,
          },
        },
      ),
    enabled: !!address,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-6 ipadPro:grid-cols-2 phone:grid-cols-1">
        {Array(6)
          .fill(6)
          .map((_, idx) => (
            <SkeletonCardSnap key={idx} />
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6 ipadPro:grid-cols-2 phone:grid-cols-1">
      {get(data, 'data', []).map((camp) => (
        <div className="overflow-hidden" key={camp.id}>
          <Fade triggerOnce duration={300} direction="left">
            <CardSnap
              campaign={camp}
              isJoined={get(joinedList, 'data')?.includes(camp.id)}
            />
          </Fade>
        </div>
      ))}
    </div>
  );
};

export default SnapContainer;
