export type ChartType = 'bar' | 'area';

export interface IChartModel {
  from?: string;
  to?: string;
  date?: string;
  totalLiquidity: number;
  volume: number;
  cumulatedVolume: number;
  cumulatedLiquidity: number;
}

export interface ISwapChartRequest {
  day: number;
  id: string;
  interval: number;
}

export interface ISwapChartModal {
  prices: SwapChartItem[];
  market_caps: SwapChartItem[];
  total_volumes: SwapChartItem[];
}

export type SwapChartItem = [string, number, number];

export interface IChartTokenModel {
  id: string;
  date: number;
  data: number[];
}
