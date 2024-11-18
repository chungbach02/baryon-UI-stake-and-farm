import CurrencyValue from '@/components/common/CurrencyValue';
import BoxSecondary from '@/components/ui/BoxSecondary';
import ModalApproval from '@/components/ui/Modal/ModalApproval';
import ModalConfirm from '@/components/ui/Modal/ModalConfirm';
import {
  approveBaryon,
  convertBalanceToWei,
  harvestReward,
} from '@/view/StakeFarm/StakeFarm';
import ModalHarvest from '@/view/StakeFarm/components/ModalHarvest';
import ModalStaked from '@/view/StakeFarm/components/ModalStaked';

import { Button, Icon, Modal, SliderBrand } from '@ne/uikit-dex';
import { set } from 'lodash';
import React, { useState } from 'react';

// const dataStaker = {
//   address: '',
//   timeStake: '',
//   unClaimed: 99.0,
//   totalClaim: '',
//   valueStake: '',
// };

export default function StakeFarmCardFoot({ data }: any) {
  const [modalToggle, setModalToggle] = useState(false);
  const [addStaked, setAddStaked] = useState(false);
  const [subStaked, setSubStaked] = useState(false);
  const [approve, setApprove] = useState(false);
  const [modalMoreStake, setModalMoreStaked] = useState(false);
  const [modalUnStake, setModalUnStaked] = useState(false);
  const harvestClicked = () => {
    setModalToggle(!modalToggle);
  };
  const conFirmHarvest = () => {
    harvestReward(data.pid, data.userAddress);
    harvestClicked();
  };
  const addClicked = () => {
    setAddStaked(!addStaked);
  };
  const subClicked = () => {
    setSubStaked(!subStaked);
  };
  const modalStakeMore = () => {
    setModalMoreStaked(!modalMoreStake);
    addStaked ? setAddStaked(!addStaked) : setAddStaked(addStaked);
  };
  const modalUnStakeMore = () => {
    setModalUnStaked(!modalUnStake);
    subStaked ? setSubStaked(!subStaked) : setSubStaked(subStaked);
  };

  const unApprove = () => {
    approveBaryon(0, data.userAddress, data.stakeAddress);
  };
  const approveClicked = () => {
    setApprove(!approve);
  };
  const approveConfirm = () => {
    const amount = convertBalanceToWei(99 * 10 ** 18, data.stakedDecimals);
    approveBaryon(amount, data.userAddress, data.stakeAddress);
    approve ? setApprove(!approve) : setApprove(approve);
  };
  const isEnable = data.allowance === 0 && data.staked === 0;
  // console.log({ isEnable });
  return (
    <div className="py-6 px-4">
      <div className="flex justify-between relative">
        <div>
          <div className="text-txt-secondary mb-5">Unclaimed Rewards</div>
          <div className="text-txt-primary text-2xl mb-1">
            {data.price === 0 ? (
              <span>{data.pendingReward.toFixed(2)}</span>
            ) : (
              <CurrencyValue value={data.pendingReward * data.price} />
            )}
          </div>
        </div>
        <Button
          onClick={harvestClicked}
          className=" absolute right-0 bottom-0 text-base"
        >
          Harvest
        </Button>
      </div>
      <div className="mt-3">
        <div className="mb-3 text-sm">
          <span className="text-brand-primary">{data.name}</span>
          <span> Staked</span>
        </div>
        <div>
          {isEnable ? (
            <div>
              <Button onClick={approveClicked} className="w-full text-base">
                Enable
              </Button>
            </div>
          ) : data.staked ? (
            <div>
              <div className=" flex justify-between text-base items-center">
                <div>
                  <div className="">{data.staked}</div>
                  <div className="font-thin text-sm">
                    <CurrencyValue value={data.staked * data.price || 0} />
                  </div>
                </div>
                <div className="flex">
                  <button
                    onClick={subClicked}
                    className="px-5 w-12 py-2 bg-btn-disable text-brand-primary text-xl mr-2 rounded-lg"
                  >
                    -
                  </button>
                  <button
                    onClick={addClicked}
                    className="px-4 w-12 py-2 bg-btn-disable text-brand-primary text-xl rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Button onClick={addClicked} className="w-full text-base">
                Stake
              </Button>
            </div>
          )}
          <div>
            <Button onClick={unApprove} className=" w-full text-base mt-5">
              Un Approve
            </Button>
          </div>
        </div>
      </div>
      <Modal
        children={
          <ModalHarvest
            onCancel={harvestClicked}
            onConfirm={conFirmHarvest}
            data={data}
          ></ModalHarvest>
        }
        open={modalToggle}
        onSetOpen={function (isOpen: boolean): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Modal open={addStaked} onSetOpen={setAddStaked} size="lg">
        <ModalConfirm onCancel={addClicked} onConfirm={modalStakeMore} />
      </Modal>
      <Modal open={modalMoreStake} onSetOpen={setModalMoreStaked} size="lg">
        <ModalStaked
          onCancel={modalStakeMore}
          onConfirm={modalStakeMore}
          isStakeMore={true}
          data={data}
        />
      </Modal>
      <Modal open={subStaked} onSetOpen={setSubStaked} size="lg">
        <ModalConfirm onCancel={subClicked} onConfirm={modalUnStakeMore} />
      </Modal>
      <Modal open={modalUnStake} onSetOpen={setModalUnStaked}>
        <ModalStaked
          onCancel={modalUnStakeMore}
          onConfirm={modalUnStakeMore}
          isStakeMore={false}
          data={data}
        />
      </Modal>
      <Modal open={approve} onSetOpen={setApprove} size="lg">
        <ModalApproval onCancel={approveClicked} onConfirm={approveConfirm} />
      </Modal>
    </div>
  );
}
