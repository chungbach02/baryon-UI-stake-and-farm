import { CHAIN_DATA } from '@/constants/chain';
import { useBalance } from '@/hook/useBalance';
import useClickOutside from '@/hook/useClickOutside';
import { ICONS } from '@/public';
import { useGlobalStore } from '@/stores/global.store';
import { formatAddress, formatReadableNumber } from '@/utils/format';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { useWalletModal } from '@coin98-com/wallet-adapter-react-ui';
import { Button, Modal, SkeletonWrapper } from '@ne/uikit-dex';
import { get } from 'lodash';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Fragment, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const ConnectWallet = ({
  isFooter,
  className,
  classNameBtn
}: {
  isFooter?: boolean;
  className?: string;
  classNameBtn?: string;
}) => {
  const t = useTranslations();
  const { activeChain } = useGlobalStore();
  const { address, disconnect, connected } = useWallet();
  const { balance, isLoading } = useBalance();
  const { openWalletModal } = useWalletModal();

  const chainInfo = get(CHAIN_DATA, activeChain);

  const refBtn = useRef<HTMLDivElement>(null);

  const [btnDis, setBtnDis] = useState<boolean>(false);
  const [confirmOut, setConfirmOut] = useState<boolean>(false);

  const handleOut = () => {
    setConfirmOut(true);
    setBtnDis(false);
  };

  const handleBtnDis = () => {
    setBtnDis(!btnDis);
  };

  useClickOutside(refBtn, () => setBtnDis(false), btnDis);

  return (
    <div className={twMerge('relative', className)} ref={refBtn}>
      {connected && (
        <Fragment>
          <div
            onClick={handleBtnDis}
            className={twMerge("rounded-lg border border-brand-primary py-2 px-3 flex flex-items-center gap-1 cursor-pointer", isFooter && 'py-1 px-2 text-xs')}
          >
            <Image
              alt="iconConnect"
              width={20}
              height={20}
              src={ICONS.iconConnect}
              className="mr-1"
            />
            <div className={twMerge('flex gap-1', isFooter && 'flex-col gap-0')}>
              <div className='flex gap-1'>
                <SkeletonWrapper loading={isLoading} width={40}>
                <span>
                  {formatReadableNumber(balance, { isTokenAmount: true })}
                </span>
                </SkeletonWrapper>
              <div className="uppercase">{chainInfo.symbol}</div>
              </div>
            <div className="text-txt-secondary w-full">
              {formatAddress(address ?? '')}
            </div>
            </div>
          </div>

          <div
            className={twMerge(
              'absolute left-0 w-full duration-200 rounded-lg bg-background-secondary p-4',
              'invisible opacity-0',
              isFooter
                ? '-top-6 -translate-y-full'
                : '-bottom-10 translate-y-full',
              btnDis &&
                (isFooter
                  ? '-top-4 visible opacity-100'
                  : '-bottom-3 visible opacity-100'),

              classNameBtn
            )}
          >
            <Button onClick={handleOut} isBlock>
              {t('common_disconnect')}
            </Button>
          </div>
        </Fragment>
      )}

      {!connected && (
        <Button
          onClick={openWalletModal}
          className={twMerge('h-10')}
        >
          {t('common_connect_wallet')}
        </Button>
      )}

      <Modal
        withIcon="warning"
        heading={t('common_disconnect_wallet')}
        open={confirmOut}
        onSetOpen={setConfirmOut}
      >
        <div className="flex items-center gap-4">
          <Button
            color="secondary"
            isBlock
            onClick={() => setConfirmOut(false)}
          >
            {t('common_cancel')}
          </Button>
          <Button
            isBlock
            onClick={() => {
              disconnect();
              setConfirmOut(false);
            }}
          >
            {t('common_disconnect')}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ConnectWallet;
