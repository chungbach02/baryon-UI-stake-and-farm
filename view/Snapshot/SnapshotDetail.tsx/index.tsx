'use client';

import { useTranslations } from 'next-intl';
import BannerDetail from './BannerDetail';
import TableParticipant from './TableParticipant';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/keys';
import { IBaseResponse } from '@/types/base.model';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { ICampaignModel } from '@/types/snapshot.model';
import { ENDPOINTS } from '@/constants/endpoints';
import { get } from 'lodash';

interface Props {
  id?: string;
}

const SnapshotDetail = ({ id }: Props) => {
  const { baryonApiService } = useBaryonServices();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.SNAPSHOT_CAMPAIGN_ITEM, id],
    queryFn: () =>
      baryonApiService.base.get<IBaseResponse<ICampaignModel>>(
        `${ENDPOINTS.SNAPSHOT_CAMPAIGN_ITEM}/${id}`,
      ),
    // enabled: false,
    // initialData: {
    //   status: 200,
    //   success: true,
    //   data: {
    //     tokenInfo: {
    //       address: '0x23c5d1164662758b3799103effe19cc064d897d6',
    //       image: 'https://coin98.s3.amazonaws.com/h4aShzmyUoD3xRsf',
    //       decimals: 6,
    //       cgkId: 'aura-network',
    //       chain: 'binanceSmart',
    //       name: 'Aura Network',
    //       symbol: 'aura',
    //     },
    //     name: 'AURA/BUSD Trading Competition',
    //     isUpTo: false,
    //     numView: 6732,
    //     shortDescription: '',
    //     description:
    //       'ACTIVITY 1: Top 100 addresses with the highest trading volume during the competition period will share a pool of AURA. \nACTIVITY 2: Complete social tasks and share AURA. Check out the official announcement for more details.',
    //     image: 'https://coin98.s3.amazonaws.com/ZxsaHQBh52yPYpgj',
    //     logo: 'https://coin98.s3.amazonaws.com/p8rvqkcTe0xL91Ye',
    //     backgroundMobile: '',
    //     background: 'https://coin98.s3.amazonaws.com/EQ9r9WnXAdTqVnZV',
    //     owner: 'Aura Network',
    //     min: 0,
    //     max: 0,
    //     reward: 250000,
    //     isFiat: true,
    //     type: 'snapshot',
    //     source: 'C98BARYDMWN',
    //     chain: 'binanceSmart',
    //     social: [
    //       {
    //         title: 'twitter',
    //         value: 'https://twitter.com/AuraNetworkHQ',
    //       },
    //       {
    //         title: 'telegram',
    //         value: 'https://t.me/AuraNetworkOfficial',
    //       },
    //       {
    //         title: 'link',
    //         value: 'https://baryon.link/aura-network-trading-competition-2',
    //       },
    //     ],
    //     start: 1670333400000,
    //     end: 1671555599000,
    //     isRequiredAuthen: false,
    //     isEndCache: true,
    //     isCountJoin: true,
    //     id: 'aurabusd-trading-competition',
    //     createdAt: '2022-12-05T09:15:55.702Z',
    //   },
    // },
  });

  return (
    <div className="container">
      <BannerDetail id={id} campaign={data?.data} />
      <TableParticipant id={id} token={get(data, 'data.tokenInfo')} />
    </div>
  );
};

export default SnapshotDetail;
