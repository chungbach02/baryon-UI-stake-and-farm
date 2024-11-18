import BoxSecondary from '@/components/ui/BoxSecondary';
import ButtonBack from '@/components/ui/ButtonBack';
import { Button, SliderBrand } from '@ne/uikit-dex';
import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import {
  approveBaryon,
  convertBalanceToWei,
  DepositOnBaryon,
  withdrawHarvest,
} from '@/view/StakeFarm/StakeFarm';
import { pid } from 'process';

export default function ModalStaked({
  isStakeMore,
  data,
  onCancel,
  onConfirm,
}: {
  isStakeMore?: any;
  data?: any;
  onCancel?: () => void;
  onConfirm?: () => void;
}) {
  const [percentValue, setPercentValue] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleChangeSLide = (value: any) => {
    setPercentValue(value);
    value ? setAmount(Math.floor(parseFloat(data.balance) * value) / 100) : 0;
    console.log(Math.floor(parseFloat(data.balance) * value));
  };

  const stakeDecimals = Number(data.stakeDecimals);
  const allowance = data.allowance;
  const amountContract = new BigNumber(
    convertBalanceToWei(amount, stakeDecimals).toString(),
  );
  // console.log('🚀 ~ clickStaked ~ amountContract:', amountContract);
  const amountValue = BigInt(amountContract.integerValue().toFixed());
  // console.log('🚀 ~ clickStaked ~ ', amountValue);
  const amountHandled = Number(amountValue);
  // console.log('address', data.userAddress);
  const clickStaked = () => {
    // console.log({ amount });
    // console.log('🚀 ~ allowance:', allowance);
    // console.log('🚀 ~ stakeDecimals:', stakeDecimals);

    // console.log('window', window.ethereum);

    if (amount < parseFloat(allowance)) {
      DepositOnBaryon(data.pid, amountHandled, data.userAddress);
      onConfirm;
    } else {
      alert('need Approve more to stake');
      approveBaryon(amountHandled, data.userAddress, data.stakeAddress);
    }
  };
  const clickUnStaked = () => {
    withdrawHarvest(data.pid, amountHandled, data.userAddress);
    onConfirm;
  };

  return (
    <div>
      <div className="items-center text-center text-base font-light text-brand-primary mb-3">
        {isStakeMore ? 'Stake Tokens' : 'UnStake Tokens'}
      </div>
      <BoxSecondary className="mb-4">
        <div className="p-4">
          <div className="flex justify-between text-lg ">
            <div>{amount}</div> <div>{data.name}</div>
          </div>
          <div className="flex justify-between text-xs my-3 ">
            <div>Amount</div>
            <div>
              Balance: <span className="text-brand-primary">{data.price}</span>
            </div>
          </div>
          <div>
            <SliderBrand
              value={percentValue}
              min={0}
              max={100}
              step={1}
              onChange={handleChangeSLide}
            />
          </div>
        </div>
      </BoxSecondary>
      <div className="flex justify-between">
        <Button
          onClick={onCancel}
          size="lg"
          className="w-2/5 bg-btn-disable text-txt-primary hover:bg-btn-background-secondary-hover"
        >
          Cancel
        </Button>
        {isStakeMore ? (
          percentValue > 0 ? (
            <Button onClick={clickStaked} size="lg" className="w-2/5">
              Stake Tokens
            </Button>
          ) : (
            <Button onClick={onConfirm} size="lg" className="w-2/5" disabled>
              Stake Tokens
            </Button>
          )
        ) : percentValue > 0 ? (
          <Button onClick={clickUnStaked} size="lg" className="w-2/5">
            UnStake Tokens
          </Button>
        ) : (
          <Button onClick={onConfirm} size="lg" disabled className="w-2/5">
            UnStake Tokens
          </Button>
        )}
      </div>
    </div>
  );
}
