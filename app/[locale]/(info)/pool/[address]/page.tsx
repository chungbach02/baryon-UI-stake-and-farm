import PoolDetail from '@/view/Pools/PoolDetail';
import React from 'react';

interface Props {
  params: { address: string };
}

const page = ({ params }: Props) => {
  return <PoolDetail address={params.address} />;
};

export default page;
