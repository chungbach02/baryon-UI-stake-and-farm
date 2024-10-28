import TokenDetail from '@/view/Pools/TokenDetail';

interface Props {
  params: { address: string };
}

const page = ({ params }: Props) => {
  return <TokenDetail address={params.address} />;
};

export default page;
