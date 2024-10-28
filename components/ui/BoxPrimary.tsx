import React from 'react';
import { twMerge } from 'tailwind-merge';

const BoxPrimary = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        'rounded-xl bg-background-primary p-6 phone:p-4',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BoxPrimary;
