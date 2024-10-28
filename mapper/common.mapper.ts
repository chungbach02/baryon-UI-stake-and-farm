export const mapSocialIconName = (socialName: string) => {
  switch (socialName) {
    case 'link':
    case 'website': {
      return 'link_filled';
    }

    case 'twitter': {
      return 'x';
    }
    case 'telegram': {
      return `${socialName}_filled`;
    }
    case 'discord': {
      return `${socialName}-full`;
    }
    case 'link': {
      return socialName;
    }
    default: {
      return socialName;
    }
  }
};
