'use client';

import { LOCALE_DATA } from '@/constants/i18n';
import { useRouter } from '@/i18n/routing';
import { COMMON_IMAGES, SVG_EXTENSION } from '@/public';
import { Icon, Option, SelectDropdown, TokenImg } from '@ne/uikit-dex';
import { useLocale } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const Language = ({ className }: { className?: string }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const switchLanguage = (locale: string) => {
    const queryParams = searchParams.toString();
    router.push(queryParams ? `${pathname}?${queryParams}` : `${pathname}`, {
      locale: locale as 'en' | 'vi',
    });
  };

  const localeList = LOCALE_DATA.map((locale) => ({
    value: locale.name,
    title: locale.key,
  }));

  const dropdownItem = ({
    itemData,
    selected,
  }: {
    itemData: Option;
    selected: boolean;
  }) => {
    return (
      <div className="flex-between gap-2">
        <div className="flex items-center gap-2">
          <TokenImg
            src={`${COMMON_IMAGES.FLAG_PATH}/${itemData.title}${SVG_EXTENSION}`}
          />
          <span className="uppercase">{itemData.title}</span>
          <span className="text-txt-secondary whitespace-nowrap">
            {itemData.value}
          </span>
        </div>

        {selected && (
          <Icon
            size="sm"
            className="text-brand-primary"
            iconName={'tick_circle_check'}
          />
        )}
      </div>
    );
  };

  return (
    <SelectDropdown
      selected={localeList.find((l) => l.title === locale)}
      options={localeList}
      dropdownItem={dropdownItem}
      onSelected={(locale) => switchLanguage(String(locale.title))}
      menuListClassName="min-w-[15rem]"
      buttonClassName="min-w-full gap-2 bg-transparent uppercase px-0"
      className={twMerge('w-auto', className)}
    />
  );
};

export default Language;
