'use client';

import BoxPrimary from '@/components/ui/BoxPrimary';
import BoxSecondary from '@/components/ui/BoxSecondary';
import InputToken from '@/components/ui/InputToken';
import { ItemInfo } from '@/components/ui/ItemInfo';
import ModalApproval from '@/components/ui/Modal/ModalApproval';
import SlippageSetting from '@/components/ui/SlippageSetting';
import { MODAL } from '@/public';
import { Button, Icon, Modal, PieLoading, Share, Tooltip } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ModalReviewOrder from '../component/ModalReviewOrder';
import { IBaseTokenModel } from '@/types/token.model';
import { useBalance } from '@/hook/useBalance';
import { TokenImg } from '@/components/ui/TokenImg';

interface props {
  handleShow?: () => void;
  isShow?: boolean;
}

const SwapDetail = ({ handleShow, isShow }: props) => {
  const t = useTranslations();

  const [slippage, setSlippage] = useState<string>('0.5');
  const [isConfirm, setIsConfirm] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [token0, setToken0] = useState<IBaseTokenModel>();
  const [token1, setToken1] = useState<IBaseTokenModel>();
  const [{ balance: balance0 }, { balance: balance1 }] = [
    useBalance(token0?.address),
    useBalance(token1?.address),
  ];
  const isSufficient0 = token0?.amount && balance0 >= Number(token0?.amount);
  const isSufficient1 = token1?.amount && balance1 >= Number(token1?.amount);

  return (
    <BoxPrimary>
      <div className="flex-between">
        <h5 className="text-brand-primary font-semibold">{t('common_swap')}</h5>
        <div className="flex items-center gap-3">
          <Tooltip
            direction="top"
            trigger={t(isShow ? 'swap_open_chart' : 'swap_close_chart')}
            id="show"
          >
            <Icon
              onClick={handleShow}
              isHover
              size="xl"
              iconName={isShow ? 'chart' : 'chart_close'}
            />
          </Tooltip>
          <Tooltip id="share-swap" trigger={t('common_share_swap')}>
            <Icon
              onClick={() => setIsShare(true)}
              isHover
              size="xl"
              iconName="app_share"
            />
          </Tooltip>
          <SlippageSetting
            setSlippage={setSlippage}
            slippage={slippage}
            dir={'top'}
          />
          <Tooltip id="pieLoading" trigger={t('common_data_auto_refresh')}>
            <PieLoading />
          </Tooltip>
        </div>
      </div>
      <BoxSecondary className="mt-4">
        <InputToken onChange={setToken0} token={token0} isHalf />
      </BoxSecondary>
      <div className="flex justify-center my-4">
        <Icon size="xl" isHover iconName="swap" />
      </div>
      <BoxSecondary className="mt-4">
        <InputToken onChange={setToken1} token={token1} />
      </BoxSecondary>
      <div className="mt-4 flex flex-col gap-3">
        <ItemInfo title={t('common_rate')}>
          <span className="uppercase">1vic = 2.22409 c98</span>
        </ItemInfo>
        <ItemInfo title={t('common_slippage_tolerance')}>
          <span className="uppercase">10%</span>
        </ItemInfo>
        <ItemInfo title={t('common_price_impact')}>
          <span className="uppercase">-</span>
        </ItemInfo>
        <ItemInfo title={t('common_route')}>
          <div className="flex items-center gap-2 text-xl">
            <TokenImg /> {` > `} <TokenImg />
          </div>
        </ItemInfo>
      </div>
      <Button isBlock className="mt-8" onClick={() => setIsConfirm(true)}>
        {t('common_input_an_amount')}
      </Button>

      <Modal
        withImg={MODAL.reviewOrder}
        heading={t('modal_approval_confirmation')}
        open={isConfirm}
        onSetOpen={setIsConfirm}
        size="lg"
      >
        <ModalApproval onConfirm={() => setIsReview(true)} />
      </Modal>

      <Modal
        withImg={MODAL.reviewOrder}
        heading={t('modal_review_order')}
        open={isReview}
        onSetOpen={setIsReview}
      >
        <ModalReviewOrder />
      </Modal>

      <Modal
        heading={t('common_share_swap')}
        open={isShare}
        onSetOpen={setIsShare}
      >
        <Share textCopy={t('common_copy_link')} textCopied={t('common_copied')} />
      </Modal>
    </BoxPrimary>
  );
};

export default SwapDetail;
