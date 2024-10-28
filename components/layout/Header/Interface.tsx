'use client';

import { Icon, Tooltip } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Interface = () => {
  const t = useTranslations();
  const { setTheme, resolvedTheme } = useTheme();
  const [isLight, setIsLight] = useState(false);

  const handleChange = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };
  useEffect(() => {
    setIsLight(resolvedTheme === 'light');
  }, [resolvedTheme]);

  return (
    <Tooltip
      direction="bottom"
      id="interface"
      trigger={
        <div className="text-txt-primary">
          {t(!isLight ? 'common_light' : 'common_dark')}
        </div>
      }
    >
      <Icon
        onClick={handleChange}
        className="cursor-pointer text-txt-secondary"
        size="xl"
        isHover
        iconName={isLight ? 'sun' : 'moon'}
      />
    </Tooltip>
  );
};

export default Interface;
