'use client';
import BoxSecondary from '@/components/ui/BoxSecondary';
import { DURATION } from '@/constants';
import StakeFarmHead from '@/view/StakeFarm/StakeFarmHead';
import { useFilterParams } from '@/hook/useFilterParams';
import { Input, Tooltip, PieLoading, Switch, TabButton } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import React, { createContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import SelectedSort from '@/view/StakeFarm/components/SelectedSort';
import StakeFarmContent from '@/view/StakeFarm/StakeFarmContent';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { ENDPOINTS } from '@/constants/endpoints';
import { useGlobalStore } from '@/stores/global.store';
import { find, method, values } from 'lodash';
import ABIBaryon from './components/abiFarmV2';
import ABIVRC25 from '@/view/StakeFarm/components/ABIVRC25';
import {
  convertBalanceToWei,
  convertWeiToBalance,
  dataByPid,
  getUserInfo,
  getPendingReward,
} from '@/view/StakeFarm/StakeFarm';
// import { useWallet } from '@coin98-com/wallet-adapter-react';

import Web3 from 'Web3';
import useDataHandle from './hook/useDataHandle';
import Image from 'next/image';
import { IMAGE } from '@/public';

export const dataHandled = createContext([{}]);
// const chain = 'https://rpc.tomochain.com';
const chain = 'https://rpc.viction.xyz';
const web3 = new Web3(chain);

const testToken = '0x66e62620d83D9d5eeDD099B3E3589BDdb5820400';

const conTract = (tokenAddress: any) =>
  new web3.eth.Contract(ABIVRC25, tokenAddress);

const conTractBaryon = new web3.eth.Contract(ABIBaryon, testToken);
interface StakeFarmProps {
  isFarm?: boolean;
}

export default function StakeFarm({ isFarm }: StakeFarmProps) {
  const t = useTranslations();
  const { baryonApiService } = useBaryonServices();
  const { activeChain } = useGlobalStore();
  const { localCoins } = useGlobalStore();
  // const { address, disconnect, connected } = useWallet();

  //data
  const [dataStake, setDataStake] = useState([{}]);
  const [address, setAddress] = useState('');
  const [dataHandle, setDataHandle] = useState([{}]);
  const [data, setData] = useState([{}]);
  // const [dataPid, setDataPid] = useState({});
  // const [userAddress, setUserAddress] = useState('');

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
        console.log(response.data);
      });
  };

  const walletAccount = async () => {
    // console.log('log provider', window.ethereum);
    // const account = await window.coin98.provider.request({
    //   method: 'eth_accounts',
    // });
    const account = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    // console.log('log account', account[0]);
    setAddress(account[0]);
  };

  // const getDataFromChild = (data: any) => {
  //   // console.log({ data });

  //   setData(data);
  // };

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
      // console.log(tokenAddress);
      // console.log(address);
      // console.log('start call onchain');
      const [name, symbol, decimals] = [
        await callMethods.name().call(),
        await callMethods.symbol().call(),
        await callMethods.decimals().call(),
      ];
      // console.log({ name, symbol, decimals });
      const balance = await callMethods.balanceOf(address).call();

      const liquidity = await callMethods.balanceOf(testToken).call();
      const allowance = await callMethods.allowance(address, testToken).call();
      // console.log(address);
      // console.log(liquidity);
      // console.log(allowance);
      const data = {
        address: tokenAddress || '',
        name: name || '',
        symbol: symbol || '',
        decimals: decimals || 18,
        balance: balance || '',
        userAddress: address || '',
        liquidity: liquidity || '',
        allowance: allowance || '',
      };
      // console.log('data onchain', data);
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
          const timeStamp = stake.rewardsExpiration * 1000;
          const date = new Date(timeStamp);
          const [day, month, years, hours, minutes] = [
            date.getDate().toString().padStart(2, '0'),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            date.getFullYear().toString(),
            date.getHours().toString().padStart(2, '0'),
            date.getMinutes().toString().padStart(2, '0'),
          ];
          // console.log({ timeStamp });
          const dateExpiration = `${day}/${month}/${years} ${hours}:${minutes}`;
          // const rewardPerSec;
          // console.log('data reward array', addressReward);
          // console.log('data stake array', addressStake);
          // console.log({ dateExpiration });
          const stakedLpAddressData =
            coinFinder(addressStake) || (await callInfoOnchain(addressStake));
          const rewardTokensData = addressReward
            ? await Promise.all(
                addressReward.map(async (token: any) => {
                  // console.log('address token', token);
                  return coinFinder(token) || (await callInfoOnchain(token));
                }),
              )
            : [];
          // console.log('reward data', rewardTokensData);

          const poolInfo = await dataByPid(stake.pid);
          const stakeCoefficient = poolInfo.rewardPerSeconds;
          console.log(stake.pid, { poolInfo });
          // console.log(stake.pid, { stakeCoefficient });

          const rewardPerSec = stake.rewardMultipliers;
          const totalYearReward = rewardPerSec * 32536000;
          const staked = await getUserInfo(stake.pid, address);
          // console.log('🚀 ~ dataStake.map ~ staked:', staked);
          const pendingReward = await getPendingReward(stake.pid, address);

          return {
            rewardTokens: rewardTokensData,
            stakedLpAddress: stakedLpAddressData,
            // stakedDecimals: stakedLpAddressData.decimals,
            pid: stake.pid,
            staked: staked,
            pendingReward: pendingReward,
            dateExpiration: dateExpiration,
            contractAddress: testToken,
            totalYearReward: totalYearReward,
            stakeCoefficient: stakeCoefficient,
          };
        }),
      );

      // console.log('data after handle', newDataStake);
      setDataHandle(newDataStake);
    } catch (error) {
      console.log(error);
    }
  };

  const dataHandler = useDataHandle(dataHandle);
  const statusTabs = [
    { label: t('Active'), count: isFarm ? 0 : dataHandle.length },
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
  }, [JSON.stringify(dataStake), address]);

  useEffect(() => {
    walletAccount();
  }, []);

  return (
    <dataHandled.Provider value={dataHandler}>
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
                  <Tooltip
                    id="topTokens"
                    trigger={t('common_data_auto_refresh')}
                  >
                    <PieLoading size={20} duration={DURATION.PIE_LOADING} />
                  </Tooltip>
                </div>
              </div>
            </div>
          </BoxSecondary>
        </div>
        <div>
          {isFarm ? (
            <div className=" flex justify-center">
              <Image width={300} height={300} src={IMAGE.empty} alt="" />
            </div>
          ) : (
            <StakeFarmContent />
          )}
        </div>
      </div>
    </dataHandled.Provider>
  );
}
