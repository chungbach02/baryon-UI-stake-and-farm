import { ICONS } from '@/public';
import { Icon } from '@ne/uikit-dex';
import Image from 'next/image';
import React from 'react';

interface SelectSort {
  name?: string;
  isSelected?: boolean;
  isUp?: boolean;
}
const fontSize = 16;
export default function SelectedSort({ name, isSelected, isUp }: SelectSort) {
  return (
    <div className="flex text-base gap-1 ">
      <button
        className={isSelected ? 'text-txt-primary' : 'text-txt-secondary'}
      >
        {name}
      </button>
      <div className="flex justify-center items-center">
        {isSelected ? (
          isUp ? (
            // <Image
            //   width={fontSize}
            //   height={fontSize}
            //   src={ICONS.arrowUp}
            //   alt=""
            //   className=""
            // />
            <Icon iconName="arrow_up" size="base" />
          ) : (
            // <Image
            //   width={fontSize}
            //   height={fontSize}
            //   src={ICONS.arrowUp}
            //   alt=""
            //   className=" rotate-180"
            // />
            <Icon iconName="arrow_down" size="base" />
          )
        ) : (
          // <Image
          //   width={fontSize}
          //   height={fontSize}
          //   src={ICONS.arrowUp}
          //   alt=""
          //   className=" opacity-0"
          // />
          <Icon iconName="arrow_up" size="base" className=" opacity-0" />
        )}
      </div>
    </div>
  );
}
