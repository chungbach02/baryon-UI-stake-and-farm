'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import SwapDetail from './SwapDetail';
import SwapShow from './SwapShow';
import { twMerge } from 'tailwind-merge';

const Swap = () => {
  const t = useTranslations();

  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>
      <div className="container overflow-hidden">
        <div className="flex flex-row ipad:flex-col justify-center gap-6 ipad:gap-4">
          <div
            className={twMerge(
              'basis-0 opacity-0 duration-300 w-0 h-0 invisible',
              !isShow &&
                'h-fit visible basis-2/3 ipad:basis-full w-full opacity-100',
            )}
          >
            <SwapShow />
          </div>
          <div
            className={twMerge(
              'h-full duration-300 basis-1/3 ipad:basis-full ipad:order-first',
            )}
          >
            <div className="sticky top-[4.75rem] left-0">
              <SwapDetail
                isShow={isShow}
                handleShow={() => setIsShow(!isShow)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
