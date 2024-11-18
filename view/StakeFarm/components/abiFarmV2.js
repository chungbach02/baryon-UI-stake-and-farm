export default [
  {
    inputs: [
      {
        internalType: 'contract IERC20[]',
        name: '_rewardTokens',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: '_rewardMultipliers',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256',
        name: '_rewardsStartTime',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_rewardsExpiration',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_rewardPerSeconds',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_lpToken',
        type: 'address'
      }
    ],
    name: 'addPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      }
    ],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      }
    ],
    name: 'Deposit',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      }
    ],
    name: 'EmergencyWithdraw',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      }
    ],
    name: 'harvest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'Harvest',
    type: 'event'
  },
  {
    inputs: [],
    name: 'massUpdateAllPools',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'pids',
        type: 'uint256[]'
      }
    ],
    name: 'massUpdatePools',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOperator',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOperator',
        type: 'address'
      }
    ],
    name: 'OperatorTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardsStartTime',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardsExpiration',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardPerSecond',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: 'lpToken',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'rewarder',
        type: 'address'
      }
    ],
    name: 'PoolAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardsStartTime',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardsExpiration',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardPerSecond',
        type: 'uint256'
      }
    ],
    name: 'PoolSet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lastRewardTime',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'lpSupply',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'accRewardPerShare',
        type: 'uint256'
      }
    ],
    name: 'PoolUpdate',
    type: 'event'
  },
  {
    inputs: [],
    name: 'renounceOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_pid',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_rewardsStartTime',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_rewardsExpiration',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_rewardPerSeconds',
        type: 'uint256'
      }
    ],
    name: 'setPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOperator',
        type: 'address'
      }
    ],
    name: 'transferOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '_functionSign',
        type: 'bytes4'
      }
    ],
    name: 'unlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes4',
        name: '_functionSign',
        type: 'bytes4'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_timeUnlock',
        type: 'uint256'
      }
    ],
    name: 'Unlock',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      }
    ],
    name: 'updatePool',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'rewardsStartTime',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'accRewardPerShare',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'rewardsExpiration',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'lastRewardTime',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'rewardPerSeconds',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'oldReserveBalance',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'claimedAmount',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct SmartBaryFactory.PoolInfo',
        name: 'pool',
        type: 'tuple'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      }
    ],
    name: 'Withdraw',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'withdrawAndHarvest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'tokens',
        type: 'address[]'
      }
    ],
    name: 'withdrawMultiple',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address[]',
        name: 'tokens',
        type: 'address[]'
      }
    ],
    name: 'WithdrawMultiple',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'pid',
        type: 'uint256[]'
      }
    ],
    name: 'withdrawMultiplePool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256[]',
        name: 'pid',
        type: 'uint256[]'
      }
    ],
    name: 'WithdrawMultiplePool',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      },
      {
        internalType: 'address[]',
        name: 'tokens',
        type: 'address[]'
      }
    ],
    name: 'withdrawPoolTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address[]',
        name: 'tokens',
        type: 'address[]'
      }
    ],
    name: 'WithdrawPoolTokens',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pid',
        type: 'uint256'
      }
    ],
    name: 'getPoolInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'rewardsStartTime',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'accRewardPerShare',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'rewardsExpiration',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'lastRewardTime',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'rewardPerSeconds',
            type: 'uint256'
          },
          {
            internalType: 'uint256[]',
            name: 'oldReserveBalance',
            type: 'uint256[]'
          },
          {
            internalType: 'uint256[]',
            name: 'claimedAmount',
            type: 'uint256[]'
          }
        ],
        internalType: 'struct SmartBaryFactory.PoolInfo',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: '_functionSign',
        type: 'bytes4'
      }
    ],
    name: 'isUnlock',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'listAddedLPs',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'lpToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'lpTokens',
    outputs: [
      {
        internalType: 'contract IERC20[]',
        name: '',
        type: 'address[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'operator',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_pid',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_user',
        type: 'address'
      }
    ],
    name: 'pendingReward',
    outputs: [
      {
        internalType: 'uint256',
        name: 'pending',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'poolLength',
    outputs: [
      {
        internalType: 'uint256',
        name: 'pools',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'rewarder',
    outputs: [
      {
        internalType: 'contract SmartBaryFactoryRewarder',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'userInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'rewardDebt',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]
