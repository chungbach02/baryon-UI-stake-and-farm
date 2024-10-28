import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { isZeroAddress } from '@/utils/validate';
import { useWallet } from '@coin98-com/wallet-adapter-react';
import { useEffect, useState } from 'react';

export const useApproval = (tokenAddress?: string, amount: number = 0) => {
  const { web3Service } = useBaryonServices();
  const { liquidityService } = useBaryonServices();
  const { address } = useWallet();
  const [approveAmount, setApproveAmount] = useState('');

  useEffect(() => {
    if (tokenAddress && !isZeroAddress(tokenAddress)) {
      web3Service
        .getFungibleTokenAllowance({
          ownerAddress: address ?? '',
          spenderAddress: liquidityService.getLiquidityAddress(),
          tokenAddress: tokenAddress,
        })
        .then(setApproveAmount);
    }
  }, [tokenAddress]);

  return {
    isApprove: isZeroAddress(tokenAddress)
      ? true
      : Number(approveAmount) > amount,
  };
};
