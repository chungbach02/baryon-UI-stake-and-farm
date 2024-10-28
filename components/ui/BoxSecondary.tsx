import React from 'react';
import { twMerge } from 'tailwind-merge';

const BoxSecondary = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge('rounded-xl bg-background-secondary p-4', className)}
    >
      {children}
    </div>
  );
};

export default BoxSecondary;
