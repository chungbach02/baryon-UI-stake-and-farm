import useTokenDetail from '@/hook/useTokenDetail';
import { useGlobalStore } from '@/stores/global.store';
import { formatReadableNumber } from '@/utils/format';
import { get } from 'lodash';

interface TokenPriceProps {
  id?: string;
  amount?: number;
  isCompact?: boolean;
}

const TokenPrice = ({ id, amount = 1, isCompact = false }: TokenPriceProps) => {
  const { currency, priceRate } = useGlobalStore();
  const { token } = useTokenDetail(id);

  return formatReadableNumber(
    Number(get(token, 'current_price', 0)) * amount * priceRate,
    {
      isCompact,
      currency,
    },
  );
};

export default TokenPrice;
