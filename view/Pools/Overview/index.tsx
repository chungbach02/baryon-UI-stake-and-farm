import BoxPrimary from '@/components/ui/BoxPrimary';
import TableTopPools from '../component/TableTopPools';
import TableTopToken from '../component/TableTopToken';
import TableTransaction from '../component/TableTransaction';
import ViewChart from './ViewChart';

const Overview = () => {
  return (
    <div className="container space-y-8">
      <BoxPrimary className="p-8 ipad:p-4">
        <ViewChart />
      </BoxPrimary>
      <TableTopToken />
      <TableTopPools />
      <TableTransaction />
    </div>
  );
};

export default Overview;
