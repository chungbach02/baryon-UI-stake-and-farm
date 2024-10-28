import BoxPrimary from '@/components/ui/BoxPrimary';
import AddLiquidityProvider from '@/providers/AddLiquidityProvider';
import LiquidityInfoProvider from '@/providers/LiquidityInfoProvider';
import BoxLeft from './BoxLeft';
import BoxRight from './BoxRight';

const Liquidity = () => {
  return (
    <LiquidityInfoProvider>
      <AddLiquidityProvider>
        <div className="container-second">
          <div className="grid grid-cols-2 ipad:grid-cols-1 gap-6">
            <BoxPrimary className="h-fit">
              <BoxLeft />
            </BoxPrimary>
            <BoxPrimary className="h-fit">
              <BoxRight />
            </BoxPrimary>
          </div>
        </div>
      </AddLiquidityProvider>
    </LiquidityInfoProvider>
  );
};

export default Liquidity;
