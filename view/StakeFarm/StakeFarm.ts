import React from 'react';
import ABIBaryon from './components/abiFarmV2';
import ABIVRC25 from './components/ABIVRC25';
import bigdecimal from 'bigdecimal';
import Web3 from 'Web3';

const chain = 'https://rpc.viction.xyz';
const web3 = new Web3(chain);

const testToken = '0x66e62620d83D9d5eeDD099B3E3589BDdb5820400';

const conTract = (tokenAddress: any) =>
  new web3.eth.Contract(ABIVRC25, tokenAddress);

const conTractBaryon = new web3.eth.Contract(ABIBaryon, testToken);

export const convertWeiToBalance = (strValue, iDecimal = 18) => {
  try {
    const decimalFormat = parseFloat(iDecimal);

    const multiplyNum = new bigdecimal.BigDecimal(Math.pow(10, decimalFormat));
    const convertValue = new bigdecimal.BigDecimal(String(strValue));
    return convertValue
      .divide(multiplyNum, decimalFormat, bigdecimal.RoundingMode.DOWN())
      .toString();
  } catch (error) {
    return 0;
  }
};
export const convertBalanceToWei = (strValue, iDecimal = 18) => {
  try {
    const multiplyNum = new bigdecimal.BigDecimal(Math.pow(10, iDecimal));
    const convertValue = new bigdecimal.BigDecimal(String(strValue));
    return multiplyNum.multiply(convertValue).toString().split('.')[0];
  } catch (err) {
    return 0;
  }
};

export const approveBaryon = async (
  amount: number,
  address: string,
  token: string,
) => {
  console.log('🚀 ~ token:', token);
  console.log('🚀 ~ address:', address);
  console.log('🚀 ~ amount:', amount);

  try {
    const data = conTract(token).methods.approve(testToken, amount).encodeABI();
    const getGasPrice = await window.ethereum.request({
      method: 'eth_gasPrice',
    });
    const params = {
      from: address,
      to: token,
      data: data,
      gasPrice: web3.utils.toHex(getGasPrice),
    };
    const sendTransaction = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [params],
    });
    console.log({ sendTransaction });
    alert('well done');
  } catch (error) {
    console.log(error);
  }
};
export const DepositOnBaryon = async (
  pid: number,
  amount: number,
  address: string,
) => {
  console.log('🚀 ~ pid:', pid);
  console.log('🚀 ~ address:', address);
  console.log('🚀 ~ amount:', amount);
  try {
    // const amountWei = web3.utils.toWei(amount, 'ether');
    const data = conTractBaryon.methods.deposit(pid, amount).encodeABI();
    const gasPrice = await window.ethereum.request({ method: 'eth_gasPrice' });
    // const account = (await web3.eth.getAccounts())[0];
    // const transaction = await conTractBaryon.methods.deposit(pid, amount).send({
    //   from: account,
    //   value: '0x0',
    //   gasPrice: (await web3.eth.getGasPrice()).toString(),
    // });
    // console.log({ transaction, conTractBaryon, pid, amount, account });

    // console.log('Stake data', data);
    const params = {
      from: address,
      to: testToken,
      data: data,
      value: '0x0',
      gasPrice: web3.utils.toHex(gasPrice),
    };
    console.log('🚀 ~ params:', params);
    // await web3.eth.sendTransaction(params);
    const sendTransaction = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [params],
    });
    console.log({ sendTransaction });
    alert('well done');
  } catch (error) {
    console.log('deposit error', error);
  }
};
export const getUserInfo = async (pid: number, address: string) => {
  try {
    const data = await conTractBaryon.methods.userInfo(pid, address).call();
    // const dataHandle = web3.utils.fromWei(data.amount, 'ether');
    const dataFloat = parseFloat(data.amount);
    // console.log('staked amount', { dataFloat });
    return dataFloat;
  } catch (error) {
    console.log('get info err', error);
  }
};

export const getPendingReward = async (pid: number, address: string) => {
  try {
    const result = await conTractBaryon.methods
      .pendingReward(pid, address)
      .call();
    const data = parseFloat(result);
    // const dataFloat = data / 10 ** 36;
    // console.log('pending reWard', { data });
    return data;
  } catch (error) {
    console.log('get pendingReward err', error);
  }
};

export const harvestReward = async (pid: number, address: string) => {
  try {
    const gasPrice = await window.ethereum.request({
      method: 'eth_gasPrice',
    });
    const data = conTractBaryon.methods.harvest(pid).encodeABI();
    // console.log({ data });
    const params = {
      from: address,
      to: testToken,
      data: data,
      gasPrice: web3.utils.toHex(gasPrice),
    };
    const sendTransaction = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [params],
    });
    console.log({ sendTransaction });
    alert('harvested');
  } catch (error) {}
};

export const withdrawHarvest = async (
  pid: number,
  amount: number,
  address: string,
) => {
  try {
    const getGasPrice = await window.ethereum.request({
      method: 'eth_gasPrice',
    });
    const data = conTractBaryon.methods
      .withdrawAndHarvest(pid, amount)
      .encodeABI();
    // console.log({ data });
    const params = {
      from: address,
      to: testToken,
      data: data,
      gasPrice: web3.utils.toHex(getGasPrice),
    };
    const sendTransaction = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [params],
    });
    console.log({ sendTransaction });
    alert('well done');
  } catch (error) {
    console.log({ error });
  }
};
export const dataByPid = async (pid: number) => {
  const dataPid = await conTractBaryon.methods.getPoolInfo(pid).call();
  // console.log(dataPid);
  return dataPid;
};
