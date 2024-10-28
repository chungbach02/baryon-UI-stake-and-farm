import BoxPrimary from '@/components/ui/BoxPrimary';
import ShareIcon from '@/components/ui/ShareIcon';
import { SocialGroup } from '@/components/ui/SocialGroup';
import Tag from '@/components/ui/Tag';
import { DATE_FORMATS } from '@/constants/dateFormats';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { mapSocialIconName } from '@/mapper/common.mapper';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { IBaseResponse } from '@/types/base.model';
import { ICampaignModel } from '@/types/snapshot.model';
import { formatDateRange, formatReadableNumber } from '@/utils/format';
import { checkIsInRange } from '@/utils/validate';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { Modal, Skeleton } from '@ne/uikit-dex';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import JoinButton from '../component/JoinButton';

interface Props {
  id?: string;
  campaign?: ICampaignModel;
}
const BannerDetail = ({ campaign }: Props) => {
  const t = useTranslations();
  const { address } = useWallet();
  const { baryonApiService } = useBaryonServices();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data: checkJoin } = useQuery({
    queryKey: [QUERY_KEYS.SNAPSHOT_PARTICIPANT_CAMPAIGN, campaign?.id, address],
    queryFn: () =>
      baryonApiService.base.get<IBaseResponse<boolean>>(
        ENDPOINTS.SNAPSHOT_PARTICIPANT_CAMPAIGN,
        {
          params: {
            address,
            id: campaign?.id,
          },
        },
      ),
    enabled: !!address && !!campaign?.id,
  });

  const isOngoing = checkIsInRange(
    get(campaign, 'start', 0) / 1000,
    get(campaign, 'end', 0) / 1000,
  );

  const isEnd = checkIsInRange(get(campaign, 'end', 0) / 1000, null);

  const status = isOngoing ? 'ongoing' : isEnd ? 'completed' : 'upcoming';

  const statusColor = useMemo(() => {
    if (status === 'ongoing') {
      return 'success';
    }
    if (status === 'completed') {
      return 'error';
    }
    if (status === 'upcoming') {
      return 'warning';
    }
    return 'success';
  }, [status]);

  const configDetail = [
    {
      key: 1,
      title: t('snapshot_total_rewards'),
      content: `${formatReadableNumber(get(campaign, 'reward', 0), {
        isTokenAmount: true,
      })} ${get(campaign, 'tokenInfo.symbol', '').toUpperCase()}`,
    },
    {
      key: 2,
      title: t('snapshot_duration'),
      content: formatDateRange(
        get(campaign, 'start', 0) / 1000,
        get(campaign, 'end', 0) / 1000,
        DATE_FORMATS.DAY_MONTH,
        DATE_FORMATS.DAY_MONTH_YEAR,
      ),
    },
    {
      key: 3,
      title: t('common_participated'),
      content: get(campaign, 'type'),
    },
  ];

  const isLoading = false;
  return (
    <BoxPrimary className="grid grid-cols-2 ipad:grid-cols-1 gap-4 p-6">
      {isLoading && (
        <div className="flex flex-col gap-6">
          <Skeleton width={'100%'} height={56} />
          <Skeleton width={'100%'} height={44} />
          <Skeleton width={'100%'} height={52} />
          <Skeleton width={'100%'} height={60} />
          <Skeleton width={'100%'} height={23} />
        </div>
      )}
      {!isLoading && (
        <div>
          <div className="flex items-center gap-2 overflow-hidden w-full">
            <Image
              className="rounded-full"
              src={get(campaign, 'logo', '')}
              height={40}
              width={40}
              alt=""
            />
            <div className="flex flex-col gap-1 w-full">
              <span className="text-txt-secondary">
                {get(campaign, 'owner')}
              </span>
              <h3 className="truncate max-w-[90%]">{get(campaign, 'name')}</h3>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-6">
            <JoinButton
              isEnd={isEnd}
              id={get(campaign, 'id')}
              isJoined={checkJoin?.data}
            />
            <Tag type={statusColor} className="rounded-full">
              {t(`common_${status}`)}
            </Tag>
          </div>
          <div className="mt-6 flex items-center gap-10 ipad:gap-3">
            {configDetail.map((it) => {
              return (
                <div key={it.key} className="flex flex-col gap-1">
                  <div className="text-xl phone:text-xs capitalize">
                    {it?.content}
                  </div>
                  <span className="text-txt-secondary phone:text-[10px]">
                    {it?.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div
            className="mt-6"
            dangerouslySetInnerHTML={{
              __html: get(campaign, 'description', '').replaceAll(
                '\n',
                '<br/>',
              ),
            }}
          ></div>
          <div className="mt-6">
            <SocialGroup
              shareIcon={
                <ShareIcon
                  type="snapshot"
                  campImg={get(campaign, 'image', '')}
                  campId={get(campaign, 'id', '')}
                  modalHeader={t('common_share_snapshot')}
                />
              }
              socialGroup={[
                ...(get(campaign, 'social', []).map((social) => ({
                  key: `${social.title}`,
                  icon: mapSocialIconName(social.title),
                  name: social.title,
                  url: social.value,
                })) || []),
                {
                  icon: 'app_share',
                  key: 'share',
                  name: 'Share',
                  modalShare: {
                    title: 'common_share_snapshot',
                  },
                },
              ]}
            />
          </div>
        </div>
      )}
      <div className="flex-center">
        <div className="aspect-[5/3] w-3/4 phone:w-full cursor-pointer rounded-xl overflow-hidden">
          {isLoading ? (
            <Skeleton width={'100%'} height={'100%'} />
          ) : (
            <Image
              onClick={() => setOpenModal(!openModal)}
              src={get(campaign, 'background', '')}
              height={800}
              width={800}
              className="relative w-full h-full "
              alt=""
            />
          )}
        </div>
      </div>

      <Modal
        open={openModal}
        onSetOpen={setOpenModal}
        size="full"
        className="bg-transparent max-w-[70%] mx-auto"
      >
        <div className="flex-center">
          <div className=" aspect-[5/3] w-full relative rounded-xl overflow-hidden">
            <Image fill src={get(campaign, 'background', '')} alt="" />
          </div>
        </div>
      </Modal>
    </BoxPrimary>
  );
};

export default BannerDetail;
