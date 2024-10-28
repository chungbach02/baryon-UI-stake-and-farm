import { useGlobalStore } from '@/stores/global.store';
import { formatReadableNumber } from '@/utils/format';

interface CurrencyValueProps {
  value?: number;
  isCompact?: boolean;
}

const CurrencyValue = ({
  value = 0,
  isCompact = false,
}: CurrencyValueProps) => {
  const { currency, priceRate } = useGlobalStore();

  return formatReadableNumber(value * priceRate, { currency, isCompact });
};

export default CurrencyValue;
