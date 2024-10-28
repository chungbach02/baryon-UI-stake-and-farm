import SnapshotDetail from '@/view/Snapshot/SnapshotDetail.tsx';
import React from 'react';

interface Props {
  params: { id: string };
}
const page = ({ params }: Props) => {
  return <SnapshotDetail id={params.id} />;
};

export default page;
