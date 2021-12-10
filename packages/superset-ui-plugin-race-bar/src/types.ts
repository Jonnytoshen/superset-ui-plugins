import {
  QueryFormData,
  ChartDataResponseResult,
  ChartProps,
  DataRecord
} from '@superset-ui/core';
import { EChartsCoreOption, ECharts } from 'echarts';

export type RaceBarFormData 
  = QueryFormData 
  & {
    colorScheme?: string;
    y_axis: string,
    x_axis: string,
    update_by: string
  };

export interface RaceBarChartProps extends ChartProps {
  formData: RaceBarFormData;
  queriesData: ChartDataResponseResult[];
}

export interface RaceBarTransformedProps {
  formData: RaceBarFormData,
  width: number,
  height: number,
  data: DataRecord[]
}

export type EchartsStylesProps = {
  height: number;
  width: number;
};

export interface EchartsProps {
  height: number;
  width: number;
  echartOptions: EChartsCoreOption;
  eventHandlers?: EventHandlers;
  zrEventHandlers?: EventHandlers;
  selectedValues?: Record<number, string>;
  forceClear?: boolean;
}

export interface EchartsHandler {
  getEchartInstance: () => ECharts | undefined;
}

export type EventHandlers = Record<string, { (props: any): void }>;