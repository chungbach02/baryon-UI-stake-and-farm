import EmptyState from '@/components/ui/EmptyState';
import LiquidityItem from './LiquidityItem';
import { useLiquidityInfo } from '@/providers/LiquidityInfoProvider';

interface Props {
  onSelect: () => void;
}
const PoolList = ({ onSelect }: Props) => {
  const { ownerPoolList, isLoadingList } = useLiquidityInfo();
  const isEmpty = !ownerPoolList?.length;

  if (isLoadingList)
    return (
      <div className="flex flex-col gap-4 max-h-[40vh] overflow-auto">
        {[...Array(5)].fill(1).map((it, idx) => {
          return (
            <button key={idx}>
              <LiquidityItem isLoading />
            </button>
          );
        })}
      </div>
    );
  if (!isLoadingList && isEmpty) return <EmptyState className="my-20" />;
  return (
    <div className="flex flex-col gap-4 max-h-[40vh] overflow-auto">
      {ownerPoolList.map((it) => {
        return (
          <button key={it.address} onClick={onSelect}>
            <LiquidityItem address={it.address} balance={Number(it.balance)} />
          </button>
        );
      })}
    </div>
  );
};

export default PoolList;
