import { Skeleton } from '@ne/uikit-dex';
import React from 'react';

const SkeletonCardSnap = () => {
  return (
    <div className="bg-background-primary rounded-xl overflow-hidden">
      <Skeleton className="aspect-[5/3] w-full" />
      <div className="p-4">
        <Skeleton width={'100%'} height={48} />
        <div className="mt-8">
          <div>
            <Skeleton width={'100%'} height={17} />
            <Skeleton width={'100%'} className="block mt-2" height={36} />
          </div>
          <div className="mt-4">
            <Skeleton width={'100%'} height={17} />
            <Skeleton width={'100%'} className="block mt-2" height={60} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardSnap;
