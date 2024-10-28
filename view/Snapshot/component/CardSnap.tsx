import ShareIcon from '@/components/ui/ShareIcon';
import { SocialGroup } from '@/components/ui/SocialGroup';
import Tag from '@/components/ui/Tag';
import { DATE_FORMATS } from '@/constants/dateFormats';
import { PATHS } from '@/constants/paths';
import { mapSocialIconName } from '@/mapper/common.mapper';
import { ICampaignModel } from '@/types/snapshot.model';
import { formatDate, formatReadableNumber } from '@/utils/format';
import { checkIsInRange } from '@/utils/validate';
import { DateDisplay, Icon } from '@ne/uikit-dex';
import { get } from 'lodash';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import JoinButton from './JoinButton';

interface IProps {
  campaign: ICampaignModel;
  isJoined?: boolean;
}

const CardSnap = ({ campaign, isJoined }: IProps) => {
  const t = useTranslations();

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

  return (
    <div className="bg-background-primary rounded-xl  overflow-hidden">
      <Link
        href={`${PATHS.SNAPSHOT}/${campaign.id}`}
        className="relative aspect-[5/3] block group overflow-hidden"
      >
        <Image
          className="relative z-10 w-full h-full object-cover group-hover:scale-110 transition-all"
          src={campaign.image}
          height={800}
          width={800}
          alt=""
        />
        <Tag
          type={statusColor}
          className="rounded-full absolute bottom-4 right-4"
        >
          {t(`common_${status}`)}
        </Tag>
        <div className="dark:bg-black/60 bg-white/70 flex-center flex-col p-6 absolute z-30 h-full w-full top-0 left-0 duration-300 -translate-y-full group-hover:translate-y-0 ">
          <SocialGroup
            shareIcon={
              <ShareIcon type="snapshot" campImg={get(campaign, 'image', '')} />
            }
            socialGroup={get(campaign, 'social', []).map((social) => ({
              key: `${social.title}_${campaign.id}`,
              icon: mapSocialIconName(social.title),
              name: social.title,
              url: social.value,
            }))}
          />
          <p className="line-clamp-2 text-center mt-4">
            {campaign?.description}
          </p>
          <div className="mt-8 ipad:mt-6">
            <JoinButton isEnd={isEnd} isJoined={isJoined} id={campaign.id} />
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link
          href={`${PATHS.SNAPSHOT}/${campaign.id}`}
          className="flex items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-2 overflow-hidden max-w-[90%]">
            <Image
              className="relative w-10 h-10 rounded-full"
              src={campaign.logo}
              alt=""
              height={800}
              width={800}
            />
            <div className="w-full overflow-hidden">
              <div className="font-normal text-xl text-ellipsis text-nowrap overflow-hidden group-hover:text-brand-primary">
                {campaign?.name}
              </div>
              <div className="text-txt-secondary">{campaign?.owner}</div>
            </div>
          </div>
          <Icon size="xxl" className="text-brand-primary" iconName="binance" />
        </Link>
        <div className="mt-8 flex-center flex-col text-center">
          <span className="text-txt-secondary font-normal">
            {t('snapshot_total_rewards')}
          </span>
          <div className="text-brand-primary font-normal mt-4 text-3xl ipad:text-2xl">
            {`${t('snapshot_up_to')} ${formatReadableNumber(Number(campaign?.reward))} ${get(campaign, 'tokenInfo.symbol', '').toUpperCase()}`}
          </div>
          <div className="mt-4">
            <span className="text-txt-secondary font-normal">
              {t('snapshot_duration')}
            </span>
            <div className="flex items-center gap-8 mt-2">
              <DateDisplay
                date={moment.unix(Number(campaign?.start) / 1000).date()}
                month={formatDate(
                  Number(campaign?.start) / 1000,
                  DATE_FORMATS.MONTH,
                )}
                className="font-normal"
              />
              <div className="font-bold text-lg text-txt-secondary">-</div>
              <DateDisplay
                date={moment.unix(Number(campaign?.end) / 1000).date()}
                month={formatDate(
                  Number(campaign?.end) / 1000,
                  DATE_FORMATS.MONTH,
                )}
                className="font-normal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSnap;
