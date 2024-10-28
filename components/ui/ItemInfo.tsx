import { Icon, Tooltip } from '@ne/uikit-dex';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

export const ItemInfo = ({
  title,
  info,
  children,
}: {
  title: string;
  info?: ReactNode;
  children: React.ReactNode;
}) => {
  const t = useTranslations();
  return (
    <div className="flex-between gap-2">
      <div className="text-txt-secondary flex items-center gap-1">
        <span className="text-base">{t(title)}</span>
        {info && (
          <Tooltip trigger={info} id="title">
            <Icon className="cursor-pointer" iconName="info" />
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  );
};
