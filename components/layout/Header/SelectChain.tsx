'use client';

import { useToast } from '@/components/ui/Toast';
import { DEFAULT_DEBOUNCE } from '@/constants';
import {
  BARYON_CHAIN_DATA_LIST,
  Chain,
  CHAIN_DATA,
  DEFAULT_CHAIN,
} from '@/constants/chain';
import { useDebounceCallback } from '@/hook/useDebounceCallback';
import { useGlobalStore } from '@/stores/global.store';
import { IConnectWalletResponse } from '@/types/common.model';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { Icon, Option, SelectDropdown } from '@ne/uikit-dex';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const SelectChain = ({
  className,
  isAlignTop,
}: {
  className?: string;
  isAlignTop?: boolean;
}) => {
  const { toast } = useToast();
  const { connected, switchNetwork, selectedChainId, disconnect } = useWallet();
  const { setActiveChain, activeChain } = useGlobalStore();
  const [chainIcon, setChainIcon] = useState<string>(
    CHAIN_DATA[DEFAULT_CHAIN].image,
  );
  const onChangeChain = useDebounceCallback(async (newChain) => {
    const chainId = get(CHAIN_DATA[newChain], 'chainId');
    if (!chainId) return false;
    if (!connected) {
      setActiveChain(newChain as Chain);
    } else {
      const res: IConnectWalletResponse = await switchNetwork(chainId);
      if (res && !res.isError) {
        setActiveChain(newChain as Chain);
      } else {
        toast({
          type: 'error',
          heading: 'Error',
          text: res?.error,
        });
      }
    }

    return true;
  }, DEFAULT_DEBOUNCE.SWITCH_CHAIN);

  const configChain: Option[] = BARYON_CHAIN_DATA_LIST.map((chain) => ({
    title: chain.name,
    value: chain.chain,
  }));

  useEffect(() => {
    if (!activeChain) {
      setActiveChain(configChain[0].value as Chain);
    }
  }, []);

  useEffect(() => {
    const activeChainInfo = get(CHAIN_DATA, activeChain);
    setChainIcon(activeChainInfo.image);
  }, [activeChain]);

  useEffect(() => {
    const selectedChain = BARYON_CHAIN_DATA_LIST.find(
      (c) => c.chainId === selectedChainId,
    );
    if (selectedChain) {
      setActiveChain(selectedChain.chain as Chain);
    } else {
      disconnect();
    }
  }, [selectedChainId]);

  const dropdownItem = ({
    itemData,
    selected,
  }: {
    itemData: Option;
    selected: boolean;
  }) => {
    return (
      <div className="flex-between gap-4">
        <div className="flex items-center gap-2">
          <Icon iconName={get(CHAIN_DATA, itemData.value)?.image} />
          <span className="text-txt-secondary whitespace-nowrap">
            {itemData.title}
          </span>
        </div>

        {selected && (
          <Icon
            size="sm"
            className="text-brand-primary"
            iconName={'tick_circle_check'}
          />
        )}
      </div>
    );
  };

  return (
    <SelectDropdown
      selected={configChain.find((chain) => chain.value === activeChain)}
      options={configChain}
      dropdownShow={
        <Icon iconName={chainIcon} size="xl" className="text-brand-primary" />
      }
      dropdownItem={dropdownItem}
      onSelected={({ value }) => onChangeChain(value)}
      classNameItem="border border-transparent hover:border-brand-primary hover:bg-background-secondary"
      menuListClassName={twMerge(
        'min-w-[12rem] w-max left-0 ',
        isAlignTop && 'left-1/2 -translate-x-1/2 top-0 -translate-y-full',
      )}
      buttonClassName="min-w-full gap-2 uppercase px-2"
      className={twMerge('w-auto', className)}
    />
  );
};

export default SelectChain;
