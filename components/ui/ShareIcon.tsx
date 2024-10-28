import { Icon, Modal, Share } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

interface ShareIconProps {
  type?: 'swap' | 'snapshot' | 'leaderboard' | 'pool' | 'stake' | 'farm';
  token0Address?: string;
  token1Address?: string;
  campId?: string;
  poolAddress?: string;
  campImg?: string;
  modalHeader?: string;
}

const ShareIcon = ({
  type,
  token0Address,
  token1Address,
  campId,
  poolAddress,
  campImg,
  modalHeader,
}: ShareIconProps) => {
  const t = useTranslations();
  const [openModal, setOpenModal] = useState(false);

  const shareLink = useMemo(() => {
    if (typeof window == 'undefined') {
      return '';
    }
    if (type === 'swap') {
      return `${window.location.origin}/${type}?base=${token0Address}&pair=${token1Address}`;
    }

    if (type === 'snapshot') {
      return `${window.location.origin}/${type}/${campId}`;
    }

    if (type === 'leaderboard') {
      return `${window.location.origin}/${type}`;
    }

    if (type === 'pool') {
      return `${window.location.origin}/${type}?poolAddress=${poolAddress}`;
    }
  }, [token0Address, token1Address, type, poolAddress, campId]);

  const shareImgLink = useMemo(() => {
    if (type === 'snapshot' || type === 'leaderboard') {
      return campImg;
    }
    if (type !== 'stake') {
      return `${process.env.NEXT_PUBLIC_SUPPORT_API}/sarosCard?type=${type}&token1=${token0Address}&token2=${token1Address}`;
    }
    return `${process.env.NEXT_PUBLIC_SUPPORT_API}/sarosCard?type=${type}&token1=${token0Address}`;
  }, [type, token0Address, token1Address, campImg]);

  return (
    <>
      <Icon
        iconName="app_share"
        size="xl"
        isHover
        className="cursor-pointer"
        onClick={() => setOpenModal(true)}
      />
      <Modal
        size="sm"
        open={openModal}
        onSetOpen={setOpenModal}
        heading={modalHeader}
      >
        <Share
          textCopy={t('common_copy')}
          textCopied={t('common_copied')}
          shareImage={shareImgLink}
          shareLink={shareLink}
        />
      </Modal>
    </>
  );
};

export default ShareIcon;
