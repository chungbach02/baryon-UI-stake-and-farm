import { Skeleton } from '@ne/uikit-dex';
import CountUp from 'react-countup';
import { twMerge } from 'tailwind-merge';

interface StatisticProps {
  value: number;
  title: string;
  wrapperClassName?: string;
  className?: string;
  titleClassName?: string;
  size?: 'base' | 'sm' | 'xs' | 'xxs';
  countAnimation?: boolean;
  decimals?: number;
  loading?: boolean;
  formattingFn?: (value: number) => string;
}

const Statistic = ({
  value,
  title,
  countAnimation = true,
  size = 'base',
  className,
  decimals = 2,
  formattingFn,
  titleClassName,
  wrapperClassName,
  loading,
}: StatisticProps) => {
  const sizes = {
    base: 'text-4xl phone:text-2xl',
    sm: 'text-3xl',
    xs: 'text-xl',
    xxs: 'text-lg',
  };

  return (
    <div className={twMerge('flex flex-col items-center', wrapperClassName)}>
      {loading ? (
        <Skeleton height={28} width={70} className="mb-2" />
      ) : (
        <CountUp
          start={countAnimation ? 0 : value}
          end={value}
          duration={countAnimation ? 2.75 : 0}
          className={twMerge(sizes[size], className)}
          decimals={decimals}
          formattingFn={formattingFn}
        />
      )}
      <div
        className={twMerge(
          'text-txt-secondary text-xs text-center',
          titleClassName,
        )}
      >
        {title}
      </div>
    </div>
  );
};

export default Statistic;
