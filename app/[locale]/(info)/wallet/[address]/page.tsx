import Wallet from '@/view/Pools/Wallet';

interface Props {
  params: { address: string };
}

const page = ({ params }: Props) => {
  return <Wallet address={params.address} />;
};

export default page;
