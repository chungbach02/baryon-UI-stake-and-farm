import CurrencyValue from '@/components/common/CurrencyValue';
import Tag from '@/components/ui/Tag';
import { formatReadableNumber } from '@/utils/format';
import { Icon } from '@ne/uikit-dex';

interface Props {
  background?: string;
  icon?: string;
  title?: string;
  value?: number;
  percent?: number;
  isCurrency?: boolean;
}
const BoxItemPool = ({
  background,
  icon,
  isCurrency = true,
  percent,
  title,
  value,
}: Props) => {
  return (
    <div
      className="rounded-lg p-4 h-full flex flex-col justify-between gap-6 phone:gap-4 font-semibold"
      style={{ background: background }}
    >
      <Icon
        className="text-4xl text-black phone:text-3xl"
        iconName={icon ?? ''}
      />
      <div>
        <span className="text-[#777777]">{title}</span>
        <div className="text-2xl text-black">
          {isCurrency ? (
            <CurrencyValue value={value ?? 0} />
          ) : (
            Number(value ?? 0)
          )}
        </div>
        {percent && (
          <Tag
            type={Number(percent) > 0 ? 'success' : 'error'}
            className="bg-transparent p-0"
            postfix="%"
            prefix={Number(percent) > 0 ? '+' : '-'}
          >
            {formatReadableNumber(percent)}
          </Tag>
        )}
      </div>
    </div>
  );
};

export default BoxItemPool;
