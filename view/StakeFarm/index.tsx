'use client';
import BoxSecondary from '@/components/ui/BoxSecondary';
import { DURATION } from '@/constants';
import StakeFarmHead from '@/view/StakeFarm/StakeFarmHead';
import { useFilterParams } from '@/hook/useFilterParams';
import { Input, Tooltip, PieLoading, Switch, TabButton } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import SelectedSort from '@/view/StakeFarm/components/SelectedSort';
import StakeFarmContent from '@/view/StakeFarm/StakeFarmContent';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { ENDPOINTS } from '@/constants/endpoints';
import { useGlobalStore } from '@/stores/global.store';
import { find, values } from 'lodash';

import Web3 from 'Web3';

const web3 = new Web3('https://rpc.viction.xyz');
const ABIVRC25 = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: true,
        internalType: 'address',
        name: 'issuer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Fee',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Frozen',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unfrozen',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
    name: 'estimateFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'freeze',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'frozen',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'issuer',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'nonces',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'numerator', type: 'uint256' },
      { internalType: 'uint256', name: 'denominator', type: 'uint256' },
      { internalType: 'uint256', name: 'fee', type: 'uint256' },
    ],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unfreeze',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token_', type: 'address' },
      { internalType: 'address', name: 'destination_', type: 'address' },
      { internalType: 'uint256', name: 'amount_', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const testToken = '0xB786D9c8120D311b948cF1e5Aa48D8fBacf477E2';

const conTract = (tokenAddress: any) =>
  new web3.eth.Contract(ABIVRC25, tokenAddress);

interface StakeFarmProps {
  isFarm?: boolean;
}

// const data = [
//   {
//     img: 'https://raw.githubusercontent.com/BuildOnViction/tokens/master/tokens/0xb786d9c8120d311b948cf1e5aa48d8fbacf477e2.png',
//     name: 'SAROS',
//     symbol: 'SAROS',
//     earn: 'SAROS',
//     earnPerDay: '222,222.22',
//     contractAddress: '0xB786D9c8120D311b948cF1e5Aa48D8fBacf477E2',
//     poolLink:
//       'https://www.baryon.network/stake?chain=tomo&poolAddress=0xB786D9c8120D311b948cF1e5Aa48D8fBacf477E2&completed=false',
//     tokenLink:
//       'https://www.vicscan.xyz/address/0xB786D9c8120D311b948cF1e5Aa48D8fBacf477E2',
//     contractLink:
//       'https://www.vicscan.xyz/tx/0x0110025dafe2981bef41d7d0ef495501dd6fe7a8a30969e604d79698c47312ad',
//     apr: 95.45,
//     finish: '28/10/2024 16:00',
//     value: '99.9218',
//     Liquidity: 156679.13,
//     price: 0.00001,
//     type: 'active',
//   },
//   {
//     img: 'https://raw.githubusercontent.com/BuildOnViction/tokens/master/tokens/0xcdde1f5d971a369eb952192f9a5c367f33a0a891.png',
//     name: 'SVIC',
//     symbol: 'SVIC',
//     earn: 'VIC',
//     earnPerDay: '666,67',
//     contractAddress: '0xCdde1f5D971A369eB952192F9a5C367f33a0A891',
//     linkStaked:
//       'https://www.baryon.network/stake?chain=tomo&poolAddress=0xCdde1f5D971A369eB952192F9a5C367f33a0A891&completed=false',
//     tokenLink:
//       'https://www.vicscan.xyz/tx/0x0110025dafe2981bef41d7d0ef495501dd6fe7a8a30969e604d79698c47312ad',
//     contractLink:
//       'https://www.vicscan.xyz/tx/0x1827f8408b1f57aeb7ddac3294f533e1002b52cb436feb4e82ad4626ea0d37a1',
//     apr: 9.7,
//     finish: '28/10/2024 16:00',
//     value: '99.98928',
//     Liquidity: 156679.13,
//     price: 0.3,
//     staked: 3000.93123,
//     type: 'active',
//   },
// ];

export default function StakeFarm({ isFarm }: StakeFarmProps) {
  const t = useTranslations();
  const { baryonApiService } = useBaryonServices();
  const { activeChain } = useGlobalStore();
  const { localCoins } = useGlobalStore();

  //data
  const [dataStake, setDataStake] = useState([{}]);
  const [dataHandle, setDataHandle] = useState([{}]);

  // sort
  const [liquidityClicked, setLiquidityClicked] = useState(true);
  const [liquidityUp, setLiquidityUp] = useState(true);
  const [aprClicked, setAPRClicked] = useState(false);
  const [aprUp, setAPRUp] = useState(false);

  const clickedBtnLiQuidity = () => {
    liquidityClicked
      ? setLiquidityUp(!liquidityUp)
      : setLiquidityClicked(!liquidityClicked);
    aprClicked ? setAPRClicked(!aprClicked) : setAPRClicked(aprClicked);
  };
  const clickedBtnAPR = () => {
    aprClicked ? setAPRUp(!aprUp) : setAPRClicked(!aprClicked);
    liquidityClicked
      ? setLiquidityClicked(!liquidityClicked)
      : setLiquidityClicked(liquidityClicked);
  };

  // tab
  const fetchApiStakeList = async () => {
    await baryonApiService.base
      .get(ENDPOINTS.STAKE, {
        params: { chain: activeChain },
      })
      .then((response: any) => {
        setDataStake(response.data);
      });
  };

  const Tokens = values(localCoins)
    .flat()
    .filter((coin) => coin.chain === `${activeChain}`);
  const coinFinder = (address: string) => {
    const tokenFinding = Tokens.find((coin) => coin.address === address);
    return tokenFinding;
  };

  const callInfoOnchain = async (tokenAddress?: string) => {
    const callMethods = conTract(tokenAddress).methods;
    try {
      const [name, symbol, decimals] = [
        await callMethods.name().call(),
        await callMethods.symbol().call(),
        await callMethods.decimals().call(),
      ];
      const data = {
        address: tokenAddress || '',
        name: name || '',
        symbol: symbol || '',
        decimals: decimals || 18,
      };
      console.log('data onchain', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fecthDataStake = async () => {
    try {
      const newDataStake = await Promise.all(
        dataStake.map(async (stake: any) => {
          const addressStake = stake.stakedLpAddress;
          const addressReward = stake.rewardTokens;
          const stakedLpAddressData =
            coinFinder(addressStake) || (await callInfoOnchain(addressStake));
          // console.log('data reward array', addressReward);
          const rewardTokensData = addressReward
            ? await Promise.all(
                addressReward.map(async (token: any) => {
                  return coinFinder(token) || (await callInfoOnchain(token));
                }),
              )
            : [];
          console.log('reward data', rewardTokensData);
          return {
            rewardTokens: rewardTokensData,
            stakedLpAddress: stakedLpAddressData,
          };
        }),
      );

      // console.log('data after handle', newDataStake);
      setDataHandle(newDataStake);
    } catch (error) {
      console.log(error);
    }
  };

  const statusTabs = [
    { label: t('Active'), count: dataHandle.length },
    { label: t('Completed'), count: 0 },
  ];
  const { params, setParams } = useFilterParams<{
    status: string;
    count: number;
  }>({ status: statusTabs[0].label, count: statusTabs[0].count });

  useEffect(() => {
    fetchApiStakeList();
  }, [activeChain]);

  useEffect(() => {
    fecthDataStake();
  }, [JSON.stringify(dataStake)]);

  return (
    <div className="container mx-auto py-8 px-0 ">
      <div className="mb-6">
        {isFarm ? <StakeFarmHead isFarm /> : <StakeFarmHead />}
      </div>
      <div className="mb-6">
        <BoxSecondary
          className="flex justify-between text-center items-center px-5 py-0
        "
        >
          <div className="flex justify-center gap-2 items-center">
            {statusTabs.map((it, idx) => {
              const isActive = params.status === it?.label;
              return (
                <TabButton
                  key={idx}
                  onClick={() => setParams({ status: it?.label })}
                  variant="line"
                  isSelected={isActive}
                  className="gap-1 flex-center px-0 font-light py-8 mr-3 "
                >
                  <span>{it.label}</span>{' '}
                  {it?.count != undefined && (
                    <span
                      className={twMerge(
                        'text-txt-secondary',
                        isActive && 'text-txt-primary',
                      )}
                    >
                      ({it?.count})
                    </span>
                  )}
                </TabButton>
              );
            })}
            <div className=" flex items-center">
              <div>
                <Switch className="text-txt-secondary" label={t('Staked')} />
              </div>
            </div>
          </div>
          <div className="flex justify-around items-center">
            <div className="flex items-center  gap-1">
              <div>Sort: </div>
              <div onClick={clickedBtnLiQuidity}>
                <SelectedSort
                  isSelected={liquidityClicked}
                  name={'liquidity'}
                  isUp={liquidityUp}
                />
              </div>
              <div>|</div>
              <div onClick={clickedBtnAPR}>
                <SelectedSort
                  isSelected={aprClicked}
                  isUp={aprUp}
                  name={'APR'}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <Input placeholder="Search here" isSearch />
              </div>
              <div>
                <Tooltip id="topTokens" trigger={t('common_data_auto_refresh')}>
                  <PieLoading size={20} duration={DURATION.PIE_LOADING} />
                </Tooltip>
              </div>
            </div>
          </div>
        </BoxSecondary>
      </div>
      <div>
        <StakeFarmContent data={dataHandle} />
      </div>
    </div>
  );
}
