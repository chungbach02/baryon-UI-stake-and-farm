import { DATE_FORMATS } from '@/constants/dateFormats';
import { useGlobalStore } from '@/stores/global.store';
import { ChartType } from '@/types/chart.model';
import { formatDate, formatReadableNumber } from '@/utils/format';
import {
  AreaChart,
  BarChart,
  BaseChartProps,
  ChartDataItem,
  TabButton,
} from '@ne/uikit-dex';
import { get } from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import CurrencyValue from '../common/CurrencyValue';
import BoxSecondary from './BoxSecondary';

interface ChartBoxProps {
  title?: string;
  className?: string;
  classNameChart?: string;
  data: ChartDataItem[];
  tabs?: Array<{
    name: string;
    value: string;
  }>;
  chartType?: ChartType;
  onChange?: (tab: { name: string; value: string }) => void;
  customHeader?: (
    currentValue?: ChartDataItem,
    tabContainer?: ReactNode,
  ) => ReactNode;
  tickCount?: number;
}

const ChartBox = ({
  title,
  className,
  data = [],
  tabs,
  chartType = 'area',
  classNameChart,
  onChange,
  customHeader,
  ...chartProps
}: ChartBoxProps) => {
  const { currency, priceRate } = useGlobalStore();
  const dataLength = get(data, 'length', 0);
  const defaultValue = dataLength ? data?.[dataLength - 1] : undefined;
  const [current, setCurrent] = useState<ChartDataItem | undefined>(
    defaultValue,
  );
  const [active, setActive] = useState(tabs?.[0]);

  useEffect(() => {
    if (defaultValue) {
      setCurrent(defaultValue);
    }
  }, [data]);

  useEffect(() => {
    if (active) {
      onChange?.(active);
    }
  }, [active]);

  const renderTab = () => (
    <div className="flex gap-2">
      {tabs?.map((it) => {
        return (
          <TabButton
            isSelected={active?.value === it.value}
            key={it.value}
            className="text-sm"
            variant="blur"
            onClick={() => setActive(it)}
          >
            {it?.name}
          </TabButton>
        );
      })}
    </div>
  );

  return (
    <BoxSecondary className={twMerge('p-6 ipad:p-4', className)}>
      {!customHeader && (
        <div className="flex justify-between">
          <div>
            {title && <h6 className="mb-2">{title}</h6>}
            <div className="text-brand-primary text-2xl">
              <CurrencyValue value={current?.value} />
            </div>
            <div className="text-txt-placeholder">
              {current && formatDate(Number(current.label))}
            </div>
          </div>
          {renderTab()}
        </div>
      )}
      {customHeader && customHeader(current, renderTab())}
      <div className={twMerge('mt-6 h-[300px] phone:h-[40vh]', classNameChart)}>
        {chartType === 'area' && (
          <AreaChart
            data={data}
            onMouseMove={(value) =>
              value !== undefined ? setCurrent(value) : setCurrent(defaultValue)
            }
            onMouseLeave={() => setCurrent(defaultValue)}
            yAxisTickFormatter={(value: string) =>
              formatReadableNumber(Number(value) * priceRate, {
                isCompact: true,
                currency,
              })
            }
            xAxisTickFormatter={(value: string) =>
              formatDate(Number(value), DATE_FORMATS.MONTH_DAY)
            }
            {...chartProps}
          />
        )}
        {chartType === 'bar' && (
          <BarChart
            data={data}
            onMouseMove={(value) =>
              value !== undefined ? setCurrent(value) : setCurrent(defaultValue)
            }
            onMouseLeave={() => setCurrent(defaultValue)}
            yAxisTickFormatter={(value: string) =>
              formatReadableNumber(Number(value) * priceRate, {
                isCompact: true,
                currency,
              })
            }
            xAxisTickFormatter={(value: string) =>
              formatDate(Number(value), DATE_FORMATS.MONTH_DAY)
            }
            {...chartProps}
          />
        )}
      </div>
    </BoxSecondary>
  );
};

export default ChartBox;
