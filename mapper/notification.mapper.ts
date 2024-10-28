export const mapNotificationType = (notificationType: string) => {
  switch (notificationType) {
    case 'addLiquidity': {
      return 'notification_add_liquidity';
    }
    case 'removeLiquidity': {
      return 'notification_remove_liquidity';
    }
    case 'unStake': {
      return 'notification_un_stake';
    }
    case 'stakeFarm': {
      return 'notification_stake_farm';
    }
    case 'unStakeFarm': {
      return 'notification_un_stake_farm';
    }
    case 'harvestFarm': {
      return 'notification_harvest_farm';
    }
    case 'joinSnapshot': {
      return 'notification_join_snapshot';
    }
    default: {
      return `notification_${notificationType}`;
    }
  }
};
