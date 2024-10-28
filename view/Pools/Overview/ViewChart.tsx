'use client';

import ChartBox from '@/components/ui/ChartBox';
import { DEFAULT_CHART_FILTER } from '@/constants';
import { ENDPOINTS } from '@/constants/endpoints';
import { QUERY_KEYS } from '@/constants/keys';
import { useBaryonServices } from '@/providers/BaryonServicesProvider';
import { useGlobalStore } from '@/stores/global.store';
import { IBaseResponse } from '@/types/base.model';
import { IChartModel } from '@/types/chart.model';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import moment from 'moment';
import { useTranslations } from 'next-intl';

const ViewChart = () => {
  const t = useTranslations();
  const { activeChain } = useGlobalStore();
  const { baryonApiService } = useBaryonServices();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POOL_TOP, activeChain],
    queryFn: () =>
      baryonApiService.base.post<IBaseResponse<IChartModel[]>>(
        ENDPOINTS.POOL_TOTAL,
        { chain: activeChain, from: DEFAULT_CHART_FILTER.FROM },
      ),
  });

  return (
    <div className="grid grid-cols-2 gap-8 ipad:gap-4 ipad:grid-cols-1">
      <ChartBox
        title={t('common_liquidity')}
        data={get(data, 'data', []).map((d) => ({
          label: String(moment(d.from).unix()),
          value: d.totalLiquidity,
        }))}
      />
      <ChartBox
        title={t('common_volume')}
        data={get(data, 'data', []).map((d) => ({
          label: String(moment(d.from).unix()),
          value: d.volume,
        }))}
      />
    </div>
  );
};

export default ViewChart;
