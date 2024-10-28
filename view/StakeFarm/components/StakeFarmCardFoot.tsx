import CurrencyValue from '@/components/common/CurrencyValue';
import BoxSecondary from '@/components/ui/BoxSecondary';
import ModalConfirm from '@/components/ui/Modal/ModalConfirm';
import ModalHarvest from '@/view/StakeFarm/components/ModalHarvest';
import ModalStaked from '@/view/StakeFarm/components/ModalStaked';

import { Button, Icon, Modal, SliderBrand } from '@ne/uikit-dex';
import { set } from 'lodash';
import React, { useState } from 'react';

const dataStaker = {
  address: '',
  timeStake: '',
  unClaimed: 99.0,
  totalClaim: '',
  valueStake: '',
};

export default function StakeFarmCardFoot({ data }: any) {
  const [modalToggle, setModalToggle] = useState(false);
  const [addStaked, setAddStaked] = useState(false);
  const [subStaked, setSubStaked] = useState(false);
  const [modalMoreStake, setModalMoreStaked] = useState(false);
  const [modalUnStake, setModalUnStaked] = useState(false);
  const harvestClicked = () => {
    setModalToggle(!modalToggle);
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
  return (
    <div className="py-6 px-4">
      <div className="flex justify-between relative">
        <div>
          <div className="text-txt-secondary mb-5">Unclaimed Rewards</div>
          <div className="text-txt-primary text-2xl mb-1">
            <CurrencyValue value={data.value} />
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
          {data.staked ? (
            <div>
              <div className=" flex justify-between text-base items-center">
                <div>
                  <div className="">{data.staked}</div>
                  <div className="font-thin text-sm">
                    <CurrencyValue value={data.staked * data.price} />
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
        </div>
      </div>
      <Modal
        children={
          <ModalHarvest
            onCancel={harvestClicked}
            onConfirm={harvestClicked}
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
    </div>
  );
}
