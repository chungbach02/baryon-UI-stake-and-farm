export const mapTransactionType = (type: string) => {
  switch (type) {
    case 'addLiquidity': {
      return 'common_add';
    }
    case 'swap': {
      return 'common_swap';
    }
    case 'removeLiquidity': {
      return 'common_remove';
    }
    case 'createPool': {
      return 'common_create';
    }
  }
};
