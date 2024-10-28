'use client';

// import EmptyState from '@/components/ui/EmptyState';
import useClickOutside from '@/hook/useClickOutside';
import { Icon } from '@ne/uikit-dex';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import NotificationList from './NotificationList';

const Noted = () => {
  const refNote = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>();
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useClickOutside(refNote, () => setIsOpen(false), isOpen);

  return (
    <div className="relative phone:static" ref={refNote}>
      <Icon
        onClick={handleOpen}
        className="cursor-pointer text-txt-secondary"
        size="xl"
        isHover
        iconName="notification"
      />
      <div
        className={twMerge(
          'overflow-hidden absolute right-0 phone:left-0 -bottom-10 phone:bottom-0 translate-y-full flex flex-col gap-4 p-4 bg-background-secondary rounded-xl w-[24rem] phone:w-full opacity-0 invisible duration-300',
          ' max-h-[24rem] overflow-auto',
          isOpen && '-bottom-5 visible  opacity-100',
        )}
      >
        <NotificationList />
      </div>
    </div>
  );
};

export default Noted;
