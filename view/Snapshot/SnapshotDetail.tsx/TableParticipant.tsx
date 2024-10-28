import CurrencyValue from '@/components/common/CurrencyValue';
import EmptyState from '@/components/ui/EmptyState';
import { DEFAULT_DEBOUNCE, DEFAULT_PAGINATION } from '@/constants';
import { DATE_FORMATS } from '@/constants/dateFormats';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useDebounceCallback } from '@/hook/useDebounceCallback';
import { useFilterParams } from '@/hook/useFilterParams';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import {
  IBaseResponse,
  IPaginationRequest,
  IPaginationResponse,
} from '@/types/base.model';
import {
  ICampaignParticipantResponse,
  IParticipantModel,
} from '@/types/snapshot.model';
import { IBaseTokenModel } from '@/types/token.model';
import { formatDate, formatReadableNumber } from '@/utils/format';
import { Card, Input, SelectDropdown, Table } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';

interface Props {
  id?: string;
  token?: IBaseTokenModel;
}
const TableParticipant = ({ id, token }: Props) => {
  const t = useTranslations();
  const { baryonApiService } = useBaryonServices();

  const options = [
    { title: t('common_decreasing'), value: 'asc' },
    { title: t('common_ascending'), value: 'desc' },
  ];

  const { params, setParams } = useFilterParams<
    IPaginationRequest & { sort: string; search: string; id: string }
  >({
    id,
    page: DEFAULT_PAGINATION.PAGE_NUMBER,
    size: DEFAULT_PAGINATION.PAGE_SIZE_50,
    sort: options[0].value,
  });

  const handleSearchDebounce = useDebounceCallback((search) => {
    setParams({ search });
  }, DEFAULT_DEBOUNCE.SEARCH);

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.SNAPSHOT_PARTICIPANT, params],
    queryFn: () =>
      baryonApiService.base.get<
        IBaseResponse<IPaginationResponse<IParticipantModel>>
      >(ENDPOINTS.SNAPSHOT_PARTICIPANT, {
        params: {
          ...params,
          sort: params.sort ?? undefined,
        },
      }),
    // enabled: false,
    // initialData: {
    //   status: 200,
    //   success: true,
    //   data: {
    //     data: [
    //       {
    //         rank: 1,
    //         address: '0xacd318a6...eec333e176',
    //         tradingVolume: 523547.07894517743,
    //         joinDate: '2022-12-09T15:19:54.686Z',
    //         isQualified: true,
    //         reward: '50000',
    //       },
    //       {
    //         rank: 2,
    //         address: '0xe21b9c6c...6f12383805',
    //         tradingVolume: 458240.07144755416,
    //         joinDate: '2022-12-07T15:30:25.387Z',
    //         isQualified: true,
    //         reward: '30000',
    //       },
    //       {
    //         rank: 3,
    //         address: '0xa3b9b201...bd27342d3c',
    //         tradingVolume: 164898.6421086508,
    //         joinDate: '2022-12-17T20:32:50.078Z',
    //         isQualified: true,
    //         reward: '15000',
    //       },
    //       {
    //         rank: 4,
    //         address: '0x5d926777...b010082ec1',
    //         tradingVolume: 79930.38661111722,
    //         joinDate: '2022-12-12T10:56:37.656Z',
    //         isQualified: true,
    //         reward: '5000',
    //       },
    //       {
    //         rank: 5,
    //         address: '0x366b1eb1...2b4808ada7',
    //         tradingVolume: 79469.8233501172,
    //         joinDate: '2022-12-19T21:20:57.911Z',
    //         isQualified: true,
    //         reward: '5000',
    //       },
    //       {
    //         rank: 6,
    //         address: '0xd0569404...e805c7f6dc',
    //         tradingVolume: 78504.41881400083,
    //         joinDate: '2022-12-19T20:07:21.825Z',
    //         isQualified: true,
    //         reward: '5000',
    //       },
    //       {
    //         rank: 7,
    //         address: '0xb279cf35...2e1c7e791d',
    //         tradingVolume: 78032.90316345563,
    //         joinDate: '2022-12-19T13:52:58.810Z',
    //         isQualified: true,
    //         reward: '5000',
    //       },
    //       {
    //         rank: 8,
    //         address: '0x507c63ab...b3d9090ef2',
    //         tradingVolume: 76948.60391078648,
    //         joinDate: '2022-12-12T09:15:07.752Z',
    //         isQualified: true,
    //         reward: '5000',
    //       },
    //       {
    //         rank: 9,
    //         address: '0x810220c6...4ff238ae63',
    //         tradingVolume: 75563.67684377916,
    //         joinDate: '2022-12-20T16:31:08.121Z',
    //         isQualified: true,
    //         reward: '5000',
    //       },
    //       {
    //         rank: 10,
    //         address: '0x0d2cd163...56212cd416',
    //         tradingVolume: 73028.48290785907,
    //         joinDate: '2022-12-06T07:25:09.781Z',
    //         isQualified: true,
    //         reward: '5000',
    //       },
    //     ],
    //     total: 299,
    //   },
    // },
  });

  return (
    <Card
      className="overflow-hidden mt-6"
      title={
        <Input
          isSearch
          value={params.search}
          placeholder={t('common_search_by_address')}
          onChangeValue={(e) => {
            handleSearchDebounce(e);
          }}
        />
      }
      extra={
        <SelectDropdown
          buttonClassName="bg-background-secondary"
          options={options}
          selected={options.find((opt) => opt.value === params.sort)}
          onSelected={(opt) => setParams({ sort: opt.value })}
        />
      }
    >
      <Table
        emptyRender={<EmptyState className="my-20" />}
        pagination={{
          pageSize: params.size,
          totalPage: get(data, 'data.total', 1),
          current: params.page,
          onChange: (page) => setParams({ page }),
        }}
        columns={[
          {
            dataIndex: 'rank',
            key: 'rank',
            title: t('common_rank'),
            align: 'center',
            render: (value) => (Number(value) > 0 ? Number(value) : '-'),
            width: 10,
          },
          {
            dataIndex: 'address',
            key: 'address',
            title: t('common_address'),
            align: 'start',
          },
          {
            key: 'tradingVolume',
            dataIndex: 'tradingVolume',
            title: t('common_trading_volume'),
            align: 'end',
            render: (value) => <CurrencyValue value={Number(value || 0)} />,
          },
          {
            key: 'joinDate',
            dataIndex: 'joinDate',
            title: t('common_join_date'),
            align: 'end',
            render: (value) =>
              formatDate(String(value), DATE_FORMATS.DATE_TIME),
          },
          {
            key: 'reward',
            dataIndex: 'reward',
            title: t('common_reward'),
            align: 'end',
            render: (value) =>
              `${formatReadableNumber(value as number, { isTokenAmount: true })} ${get(token, 'symbol', '').toUpperCase()}`,
          },
        ]}
        dataSource={get(data, 'data.data', [])}
      />
    </Card>
  );
};

export default TableParticipant;
