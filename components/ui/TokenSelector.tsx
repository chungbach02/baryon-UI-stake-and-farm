import { IBaseTokenModel } from '@/types/token.model';
import { Icon } from '@ne/uikit-dex';
import { get } from 'lodash';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ModalSelectToken from './Modal/ModalSelectToken';
import TokenInfo from './TokenInfo';

interface TokenSelectorProps {
  value?: IBaseTokenModel;
  onChange: (token: IBaseTokenModel) => void;
  className?: string;
}

const TokenSelector = ({ value, className, onChange }: TokenSelectorProps) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);

  return (
    <>
      <button
        className={twMerge('flex items-center gap-1 cursor-pointer', className)}
        onClick={handleOpenModal}
      >
        <TokenInfo
          classNameMain="uppercase"
          token={{
            name: get(value, 'symbol', ''),
            img: get(value, 'image', ''),
          }}
          className="text-lg font-semibold"
        />
        <Icon
          iconName="arrow_down"
          size="xxl"
          isHover
          className="cursor-pointer"
        />
      </button>
      <ModalSelectToken
        onSelected={onChange}
        onSetOpen={setOpenModal}
        open={openModal}
      />
    </>
  );
};

export default TokenSelector;
